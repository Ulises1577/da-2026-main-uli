import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true},
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true }
} , {
    versionKey: false //Esto evita que Mongo agregue el campo automatico __v
});

//Creamos el modelo que se conectara a la coleccion 'users'
const UserModel = mongoose.model('User', userSchema, 'users');
export default UserModel;