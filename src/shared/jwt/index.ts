import jwt, {
  Secret,
  SignOptions,
} from "jsonwebtoken";

import {
  JWT_EXPIRES_IN,
  JWT_REFRESH_EXPIRES_IN,
  JWT_REFRESH_SECRET,
  JWT_SECRET,
} from "../../config";

const accessSecret: Secret =
  JWT_SECRET as string;

const refreshSecret: Secret =
  JWT_REFRESH_SECRET as string;

export interface JwtPayload {
  id: string;
  email: string;
  role: string;
}

export const generateAccessToken = (
  payload: JwtPayload
): string => {
  const options: SignOptions = {
    expiresIn:
      JWT_EXPIRES_IN as SignOptions["expiresIn"],
  };

  return jwt.sign(
    payload,
    accessSecret,
    options
  );
};

export const generateRefreshToken = (
  payload: JwtPayload
): string => {
  const options: SignOptions = {
    expiresIn:
      JWT_REFRESH_EXPIRES_IN as SignOptions["expiresIn"],
  };

  return jwt.sign(
    payload,
    refreshSecret,
    options
  );
};

export const verifyAccessToken = (
  token: string
): JwtPayload => {
  return jwt.verify(
    token,
    accessSecret
  ) as JwtPayload;
};

export const verifyRefreshToken = (
  token: string
): JwtPayload => {
  return jwt.verify(
    token,
    refreshSecret
  ) as JwtPayload;
};