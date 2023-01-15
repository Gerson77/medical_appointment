import { Router } from "express";
import { ensureAuthenticate } from "../infra/http/middleware/ensure-authenticate.middleware";
import { createDoctorScheduleController } from "../modules/doctor/useCases/create-doctor-schedule";

const doctorScheduleRoutes = Router()

doctorScheduleRoutes.post('/doctor-schedule', ensureAuthenticate, async (request, response) => {
    await createDoctorScheduleController.handle(request, response)
})

export { doctorScheduleRoutes }