import { describe, expect, test } from "vitest";
import libraries from "@/data/libraries-next.json";
import type { LibraryDictionaryModel } from "@/features/libraries/models/library-dictionary.model";
import {
  libraryAlgorithmDefinitions,
  librarySupportDefinitions,
} from "@/features/libraries/values/library-support.values";

const dictionary = libraries as LibraryDictionaryModel;

describe("library support definitions", () => {
  test("cover every support field in the library data", () => {
    const definedValues = [
      ...librarySupportDefinitions,
      ...libraryAlgorithmDefinitions,
    ].map(({ value }) => value);
    const dataValues = new Set(
      Object.values(dictionary).flatMap(({ libs }) =>
        libs.flatMap(({ support }) => Object.keys(support)),
      ),
    );

    expect(new Set(definedValues).size).toBe(definedValues.length);
    expect(Array.from(dataValues).sort()).toEqual([...definedValues].sort());
  });

  test("lists the ECDSA and EdDSA support added in aws-jwt-verify v5", () => {
    const awsJwtVerify = dictionary["node-js"]?.libs.find(
      ({ gitHubRepoPath }) => gitHubRepoPath === "awslabs/aws-jwt-verify",
    );

    expect(awsJwtVerify?.support).toMatchObject({
      es256: true,
      es384: true,
      es512: true,
      eddsa: true,
    });
  });
});
