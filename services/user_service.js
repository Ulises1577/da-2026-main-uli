class UserService {
    
    constructor(userModel) {
        this.userModel = userModel; 
    }

    async getAllUsers() {
        // En lugar de usar usersMockup directamente, usamos lo que nos inyectaron
        return await this.userModel.find(); 
    }

    async getUserByUsername(username) {
        return await this.userModel.findOne({ username: username });
    }

    async createUser(userData) {
        //Validacion en nombre de usuario
        if (!userData.username || userData.username.trim() === '') {
            throw new Error('El nombre de usuario es obligatorio. ');
        }

        if (!userData.email || userData.email.trim() === '') {
            throw new Error('El correo electrónico es obligatorio. ');
        }

        const existingUser = await this.userModel.findOne({ username: userData.username });
        if (existingUser) {
            throw new Error('El nombre de usuario ya existe. ');
        }
        const newUser = new this.userModel(userData);
        return await newUser.save();
    }

    async updateUser(username, updatedData) {
        return await this.userModel.findOneAndUpdate(
            { username: username },
            updatedData,
            { new: true } // Esto hace que retorne el documento actualizado
        );
    }

    async deleteUser(username) {
        return await this.userModel.findOneAndDelete({ username: username });
    }
}

export default UserService;