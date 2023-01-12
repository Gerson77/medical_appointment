import { Router } from "express"
import { userRouter } from "./user.routes"
import { specialityRouter } from "./speciality.routes"
import { doctorRouter } from "./doctor.routes"
import { doctorInfoRouter } from "./doctor-info.routes"
import { patientRouter } from "./patient.routes"

const router = Router()

router.use(userRouter)
router.use(specialityRouter)
router.use(doctorRouter)
router.use(doctorInfoRouter)
router.use(patientRouter)

export { router }