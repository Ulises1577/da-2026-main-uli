class UserService {
    // 💉 Recibimos la base de datos (o repositorio) desde el exterior
    constructor(userRepository) {
        this.repo = userRepository; // Dependemos de la abstracción
    }

    getAllUsers() {
        // En lugar de usar usersMockup directamente, usamos lo que nos inyectaron
        return this.repo; 
    }

    getUserById(id) {
        return this.repo.find(user => user.id === id);
    }

    createUser(userData) {
        const newUser = {
            id: String(this.repo.length + 1),
            ...userData
        };
        this.repo.push(newUser);
        return newUser;
    }

    deleteUser(id) {
        const index = this.repo.findIndex(user => user.id === id);
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
