import userMockup from '../mockups/user_mockups.js';

class UserService { 
    getAllUsers() {
        return userMockup;  
    }
    
    getUserById(id) {
        return userMockup.find(user => user.id === id);
    }

    createUser(userData) {
        const newUser = {
            id: String(userMockup.length + 1),
            ...userData 
        };
        userMockup.push(newUser);
        return newUser;  
    }

    deleteUser(id) {
        const index = userMockup.findIndex(user => user.id === id);
        if (index !== -1) {
            const deletedUser = userMockup.splice(index, 1);
            return deletedUser[0];  
        }
        return null; 
    }
}

export default new UserService;