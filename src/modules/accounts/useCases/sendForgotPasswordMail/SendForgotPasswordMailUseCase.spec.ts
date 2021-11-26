import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe("Send Forgot Mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    mailProvider = new MailProviderInMemory();

    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dayjsDateProvider,
      mailProvider
    );
  });

  it("should be able to send a forgot mail to user", async () => {
    const sendMail = spyOn(mailProvider, "sendMail");
    const email = "12345@email.com";

    await usersRepositoryInMemory.create({
      email,
      name: "test mail",
      password: "123",
    });

    await sendForgotPasswordMailUseCase.execute(email);

    expect(sendMail).toHaveBeenCalled();
  });

  it("should not be able to send an email if user does not exsits", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("email@email.com")
    ).rejects.toEqual(new AppError("User does not exists!"));
  });

  it("should be able to create an users token", async () => {
    const generateTokenMail = spyOn(usersTokensRepositoryInMemory, "create");
    const email = "email_test@email.com";

    await usersRepositoryInMemory.create({
      email,
      name: "test mail",
      password: "123",
    });

    await sendForgotPasswordMailUseCase.execute(email);

    expect(generateTokenMail).toBeCalled();
  });
});
