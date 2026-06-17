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
        const existingUser = await this.userModel.findOne({ username: userData.username });
        if (existingUser) {
            throw new Error('El nombre de usuario ya existe. ');
        }

        return await this.userModel.create(userData);
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