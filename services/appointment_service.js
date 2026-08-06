export class AppointmentService {
    constructor(appointmentModel) {
        this.appointmentModel = appointmentModel;
    }

    async  scheduleAppointment(data) {
        const appointmentDate = new Date(data.date);
        if (appointmentDate < new Date()) {
            throw new Error('No se puede programar una cita a una fecha pasada.');
        }

        const appointment = new this.appointmentModel(data);
        return await appointment.save();
    }

    async getAllAppointments() {
        return await this.appointmentModel.find().sort({ date: 1 }) ;
    }

    async deleteAppointment(id) {
        return await this.appointmentModel.findByIdAndDelete(id);
        
    }

    async changeStatus(id, status) {
        const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];
        if (!validStatuses.includes(status)) {
            throw new Error('El estado "${status}" no es valido');
        }

        return await this.appointmentModel.findByIdAndUpdate(
            id,
            { status },
            { returnDocument: 'after' } //Pa que devuelv el turno modificado
        );
    }
}