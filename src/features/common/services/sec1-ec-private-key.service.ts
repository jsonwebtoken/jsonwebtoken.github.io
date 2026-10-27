import nodeForge from "node-forge";
import { err, fromThrowable, ok, Result } from "neverthrow";

const { asn1, pem } = nodeForge;

type Asn1Node = nodeForge.asn1.Asn1;

const SEC1_PEM_TYPE = "EC PRIVATE KEY";
const PKCS8_PEM_TYPE = "PRIVATE KEY";
const SEC1_PEM_HEADER = `-----BEGIN ${SEC1_PEM_TYPE}-----`;
const EC_PUBLIC_KEY_OID = "1.2.840.10045.2.1";
const PARAMETERS_TAG = 0;
const PUBLIC_KEY_TAG = 1;
const PKCS8_VERSION = 0;

const CONVERSION_ERROR = "Cannot convert the SEC1 EC private key to PKCS#8.";

const safeDecodePem = fromThrowable(pem.decode, () => CONVERSION_ERROR);
const safeFromDer = fromThrowable(
  (bytes: string) => asn1.fromDer(bytes),
  () => CONVERSION_ERROR,
);

const isContextTag =
  (tag: number) =>
  (node: Asn1Node): boolean =>
    node.tagClass === asn1.Class.CONTEXT_SPECIFIC && node.type === tag;

const createNode = (
  type: number,
  constructed: boolean,
  value: Asn1Node[] | string,
): Asn1Node => asn1.create(asn1.Class.UNIVERSAL, type, constructed, value);

const createSequence = (children: Asn1Node[]): Asn1Node =>
  createNode(asn1.Type.SEQUENCE, true, children);

const toDerBytes = (node: Asn1Node): string => asn1.toDer(node).getBytes();

type EcPrivateKeyParts = {
  version: Asn1Node;
  privateKey: Asn1Node;
  curveParameters: Asn1Node;
  publicKey: Asn1Node | undefined;
};

export const isSec1EcPrivateKey = (key: string): boolean =>
  key.includes(SEC1_PEM_HEADER);

const findSec1Block = (key: string): Result<nodeForge.pem.ObjectPEM, string> =>
  safeDecodePem(key).andThen((blocks) => {
    const block = blocks.find(({ type }) => type === SEC1_PEM_TYPE);

    return block ? ok(block) : err(CONVERSION_ERROR);
  });

const rejectEncrypted = (
  block: nodeForge.pem.ObjectPEM,
): Result<nodeForge.pem.ObjectPEM, string> =>
  block.procType?.type === "ENCRYPTED"
    ? err(
        "Encrypted EC private keys are not supported. Decrypt the key first, for example with `openssl ec -in key.pem -out decrypted.pem`.",
      )
    : ok(block);

const extractParts = (root: Asn1Node): Result<EcPrivateKeyParts, string> => {
  const children = Array.isArray(root.value) ? (root.value as Asn1Node[]) : [];
  const [version, privateKey, ...optional] = children;
  const parameters = optional.find(isContextTag(PARAMETERS_TAG));
  const curveParameters = Array.isArray(parameters?.value)
    ? (parameters.value[0] as Asn1Node | undefined)
    : undefined;

  if (!version || !privateKey || !curveParameters) {
    return err(
      "The SEC1 EC private key is malformed or does not specify its curve.",
    );
  }

  return ok({
    version,
    privateKey,
    curveParameters,
    publicKey: optional.find(isContextTag(PUBLIC_KEY_TAG)),
  });
};

const toPkcs8Der = ({
  version,
  privateKey,
  curveParameters,
  publicKey,
}: EcPrivateKeyParts): string => {
  const ecPrivateKey = createSequence(
    publicKey ? [version, privateKey, publicKey] : [version, privateKey],
  );

  const algorithmIdentifier = createSequence([
    createNode(
      asn1.Type.OID,
      false,
      asn1.oidToDer(EC_PUBLIC_KEY_OID).getBytes(),
    ),
    curveParameters,
  ]);

  return toDerBytes(
    createSequence([
      createNode(asn1.Type.INTEGER, false, String.fromCharCode(PKCS8_VERSION)),
      algorithmIdentifier,
      createNode(asn1.Type.OCTETSTRING, false, toDerBytes(ecPrivateKey)),
    ]),
  );
};

const toPem = (der: string): string =>
  pem.encode({ type: PKCS8_PEM_TYPE, body: der }).replace(/\r\n/g, "\n").trim();

export const convertSec1EcPrivateKeyToPkcs8 = (
  key: string,
): Result<string, string> =>
  findSec1Block(key)
    .andThen(rejectEncrypted)
    .andThen(({ body }) => safeFromDer(body))
    .andThen(extractParts)
    .map(toPkcs8Der)
    .map(toPem);
