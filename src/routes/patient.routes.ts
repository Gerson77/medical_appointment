import { Request, Response, Router, request } from "express";
import { createPatientController } from "../modules/patients/useCases/create-patient";
import uploadConfig from "../config/upload.config";

import multer from "multer";

const upload = multer(uploadConfig);

const patientRouter = Router();

patientRouter.post(
  "/patients",
  upload.single("avatar"),
  async (request, response) => {
    await createPatientController.handle(request, response);
  }
);

export { patientRouter };
