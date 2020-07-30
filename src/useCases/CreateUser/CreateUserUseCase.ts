import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";
import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";

export class CreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private emailProvider: IMailProvider
  ) {}

  async execute(data: ICreateUserRequestDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(
      data.email
    );
    if (userAlreadyExists) {
      throw new Error("Usuário já existe.");
    }
    const user = new User(data);
    await this.usersRepository.save(user);

    await this.emailProvider.sendMail({
      to: {
        name: data.name,
        email: data.email,
      },
      from: {
        name: "Equipe do aplicativo",
        email: "noreply@equipe.com",
      },
      subject: "Seja bem vindo a plataforma",
      body: "<p>Agora você já pode fazer login</p>",
    });
  }
}
