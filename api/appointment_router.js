import express from 'express';
import { AppointmentModel } from '../mongo_models/appointment_mongo.js';
import { AppointmentService } from '../services/appointment_service.js';

const router = express.Router();
const appointmentService = new AppointmentService(AppointmentModel);

// Rutas para CRUD de citas

//POST
const createAppointment = async (req, res) => {
    try {
        const newAppointment = await appointmentService.scheduleAppointment(req.body);
        res.status(201).json(newAppointment);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//GET (para ver todos los turnos)
const getAppointments = async (req,res) => {
    try {
        const appointments = await appointmentService.getAllAppointments();
        res.json(appointments);
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
        res.json(updatedAppointment);
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
        res.json({ message: 'Turno eliminado correctamente', deletedAppointment });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

router.post('/', createAppointment);
router.get('/', getAppointments);
router.patch('/:id/status', updateAppointmentStatus);
router.delete('/:id', deleteAppointment);
export default router;