import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
  sub: string;
  email: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokenRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dayjsDateProvider: IDateProvider
  ) {}

  async execute(token: string): Promise<string> {
    const { email, sub } = verify(token, auth.secret_refresh_token) as IPayload;
    const {
      secret_refresh_token,
      expires_in_refresh_token,
      expires_refresh_token_days,
    } = auth;

    const user_id = sub;

    const userToken =
      await this.usersTokenRepository.findByUserIdAndRefreshToken(
        user_id,
        token
      );

    if (!userToken) {
      throw new AppError("Refresh Token does not exists!");
    }

    await this.usersTokenRepository.deleteById(userToken.id);

    const refreshTokenExpiresDate = this.dayjsDateProvider.addDays(
      expires_refresh_token_days
    );

    const refreshToken = sign({ email }, secret_refresh_token, {
      subject: sub,
      expiresIn: expires_in_refresh_token,
    });

    await this.usersTokenRepository.create({
      expires_date: refreshTokenExpiresDate,
      refresh_token: refreshToken,
      user_id,
    });

    return refreshToken;
  }
}

export { RefreshTokenUseCase };
