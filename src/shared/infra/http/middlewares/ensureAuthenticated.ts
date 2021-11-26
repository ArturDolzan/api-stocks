import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import auth from "@config/auth";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import { AppError } from "@shared/errors/AppError";

interface IPayLoad {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = request.headers.authorization;
  const userTokensRepository = new UsersTokensRepository();

  if (!authHeader) {
    throw new AppError("Token missing!", 401);
  }

  // Bearer 1234987965-asd56487
  // [0] = Bearer
  // [1] = 1234987965-asd56487
  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, auth.secret_token) as IPayLoad;

    const user = await userTokensRepository.findByUserIdAndRefreshToken(
      user_id,
      token
    );

    //console.log(JSON.stringify(user));

    if (!user) {
      throw new AppError("User does not exists!", 401);
    }

    //console.log(JSON.stringify(user));

    request.user = {
      id: user_id,
    };

    next();
  } catch {
    throw new AppError("Invalid token!", 401);
  }
}
