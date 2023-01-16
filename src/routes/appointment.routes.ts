import { Router } from "express";
import { freeScheduleController } from '../modules/appointments/useCases/free-schedules'
import { createAppointmentController } from "../modules/appointments/useCases/create-appointment";
import { ensureAuthenticate } from "../infra/http/middleware/ensure-authenticate.middleware";
const appointmentRouter = Router()

appointmentRouter.get('/appointments/free', async(request, response) => {
    await freeScheduleController.handle(request, response)
})

appointmentRouter.post('/appointments', ensureAuthenticate,async(request, response) => {
    await createAppointmentController.handle(request, response)
})

export { appointmentRouter }