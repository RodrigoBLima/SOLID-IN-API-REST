import { MailTrapMailProvider } from "../../providers/implementations/MailTrapMailProvider"
import { PostgressUserRepository } from "../../repositories/implementations/PostgressUserRepository"
import { CreateUserUseCase } from "./CreateUserUseCase"
import { CreateUserController } from "./CreateUserController"

const mailtrapMailProvider = new MailTrapMailProvider()

const postgresUsersRepository = new PostgressUserRepository()

const createUserUseCase = new CreateUserUseCase(
    postgresUsersRepository,
    mailtrapMailProvider
)


const createUserController = new CreateUserController(
    createUserUseCase
)

export {createUserUseCase, createUserController}