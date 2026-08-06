import express from 'express';
import { AppointmentModel } from '../mongo_models/appointment_mongo.js';
import { AppointmentService } from '../services/appointment_service.js';
import checkAuthorizationTokenMiddleware from '../middlewares/check_autorization_middleware.js';
import checkRoleMiddleware from '../middlewares/check_role_middleware.js';
    
const router = express.Router();
const appointmentService = new AppointmentService(AppointmentModel);

// Rutas para CRUD de citas

//POST
const createAppointment = async (req, res) => {
    try {
        const newAppointment = await appointmentService.scheduleAppointment(req.body);
        res.status(201).json({
            message: 'Turno creado exitosamente',
            turno_fecha: newAppointment.date,
            email: newAppointment.clientEmail,
            cliente_nombre: newAppointment.clientName,
            servicio_nombre: newAppointment.service,
            status: newAppointment.status
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//GET (para ver todos los turnos)
const getAppointments = async (req,res) => {
    try {
        const appointments = await appointmentService.getAllAppointments();
        res.json(appointments.map(appointment => ({
            id: appointment._id,
            clientName: appointment.clientName,
            clientEmail: appointment.clientEmail,
            date: appointment.date,
            service: appointment.service,
            status: appointment.status
        })));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//PATCH para cambiar los estados de confirmado, pendiente y cancelado. 
const updateAppointmentStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const updatedAppointment = await appointmentService.changeStatus(id, status);

        if (!updatedAppointment) {
            return res.status(404).json({ error: 'El turno no existe o no fue encontrado' });
        }
        res.status(200).json({
            message: 'Estado del turno actualizado correctamente',
            id: updatedAppointment._id,
            clientName: updatedAppointment.clientName,
            clientEmail: updatedAppointment.clientEmail,
            date: updatedAppointment.date,
            service: updatedAppointment.service,
            status: updatedAppointment.status
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedAppointment = await appointmentService.deleteAppointment(id);

        if (!deletedAppointment) {
            return res.status(404).json({ error: 'El turno no existe o no fue encontrado' });
        }
        res.status(200).json({ 
            message: 'Turno eliminado correctamente',
            id: deletedAppointment._id,
            clientName: deletedAppointment.clientName,
            clientEmail: deletedAppointment.clientEmail,
            date: deletedAppointment.date,
            service: deletedAppointment.service,
            status: deletedAppointment.status 
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

router.post('/', checkAuthorizationTokenMiddleware, checkRoleMiddleware(['admin']), createAppointment);
router.get('/', checkAuthorizationTokenMiddleware, checkRoleMiddleware(['admin']), getAppointments);
router.patch('/:id/status', checkAuthorizationTokenMiddleware, checkRoleMiddleware(['admin']), updateAppointmentStatus);
router.delete('/:id', checkAuthorizationTokenMiddleware, checkRoleMiddleware(['admin']), deleteAppointment);
export default router;