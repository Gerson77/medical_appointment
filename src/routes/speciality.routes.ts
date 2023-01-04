import { Router } from "express"
import { createSpecialityController } from "../modules/speciality/useCases/create-speciality";
import { ensureAuthenticate } from "../infra/http/middleware/ensure-authenticate.middleware";
import { ensureAdmin } from "../infra/http/middleware/ensure-admin.middleware";

const specialityRouter = Router();

specialityRouter.post("/specialities", ensureAuthenticate, ensureAdmin, async(request, response) => {
    await createSpecialityController.handle(request, response)
})

export { specialityRouter }