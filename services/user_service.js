class UserService {
    // 💉 Recibimos la base de datos (o repositorio) desde el exterior
    constructor(userRepository) {
        this.repo = userRepository; // Dependemos de la abstracción
    }

    getAllUsers() {
        // En lugar de usar usersMockup directamente, usamos lo que nos inyectaron
        return this.repo; 
    }

    getUserByUsername(username) {
        return this.repo.find(user => user.username === username);
    }

    createUser(userData) {
        const existingUser = this.getUserByUsername(userData.username);
        if (existingUser) {
            return {error: "El nombre de usuario ya existe. "};
        }
        const newUser = {
            id: String(this.repo.length + 1),
            ...userData
        };
        this.repo.push(newUser);
        return newUser;
    }

    updateUser(username, updatedData) {
        const user = this.getUserByUsername(username);
        if (!user) return null;

        Object.assign(user, updatedData);
        return user;
    }

    deleteUser(username) {
        const index = this.repo.findIndex(user => user.username === username);
        if (index !== -1) {
            const deletedUser = this.repo.splice(index, 1);
            return deletedUser[0];
        }
        return null;
    }
}

// OJO: Ya no exportamos "new UserService()" directamente.
// Exportamos la clase limpia para poder instanciarla inyectándole cosas.
export default UserService;
