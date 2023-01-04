import { Router } from "express"
import { createUserController } from "../modules/users/useCases/create-user";
import { authenticateUserController } from "../modules/users/useCases/authenticate-user";

const userRouter = Router();


userRouter.post("/users", async (request, response) => {
    await createUserController.handle(request, response)
})

userRouter.post("/login", async (request, response) => {
    await authenticateUserController.handle(request, response)
})

export { userRouter }