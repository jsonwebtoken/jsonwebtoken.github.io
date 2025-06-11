import { JWTHeaderParameters, JWTPayload } from "jose";

export interface DecodedJwtHeaderModel extends Partial<JWTHeaderParameters> {
  alg: string;
}
export interface DecodedJwtPayloadModel extends JWTPayload {}

export interface DecodedTokenModel {
  header: DecodedJwtHeaderModel;
  payload: DecodedJwtPayloadModel | string;
  errors: boolean;
  warnings: string[];
}
