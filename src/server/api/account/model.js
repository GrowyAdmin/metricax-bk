import dao from "./dao.js"

export default {
    async getUserByEmail({email}) {
        try {
            return dao.getUserByEmail({email});
        } catch (error) {
            throw error;
        }
    },
    async createUser({email, password, country}) {
        try {
            return dao.createUser({email, password, country});
        } catch (error) {
            throw error;
        }
    },
}
