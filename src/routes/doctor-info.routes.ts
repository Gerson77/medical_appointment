import { Router } from "express";
import { createDoctorInfoController } from "../modules/doctor/useCases/create-doctor-info";
import { ensureAuthenticate } from "../infra/http/middleware/ensure-authenticate.middleware";

const doctorInfoRouter = Router()

doctorInfoRouter.post("/doctor-info", ensureAuthenticate, async(request, response) => {
    await createDoctorInfoController.handle(request, response)
})

export { doctorInfoRouter }