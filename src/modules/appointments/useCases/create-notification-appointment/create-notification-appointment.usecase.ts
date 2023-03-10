import { queueAppointmentNotification } from "../../../../infra/queue/notification-appointment/notification-appointment.queue";
import { IAppointmentRepository } from "../../repositories/appointment.repository";

export class CreateNotificationAppointmentUseCase {
  constructor(
    private appointmentRepository: IAppointmentRepository,
  ) {}

  async execute() {
    const appointments = await this.appointmentRepository.findAllTodayIncludePatients();

    appointments.forEach(async (appointment) => {
      const emailPacient = appointment.patient.email;
      const date = appointment.date;

      await queueAppointmentNotification.push({
        email: emailPacient,
        date: date
      })
    });

    return appointments;
  }
}
