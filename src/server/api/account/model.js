import dao from "./dao.js"

export default {
    async getUserByEmail({email}) {
        try {
            return dao.getUserByEmail({email});
        } catch (error) {
            throw error;
        }
    },
}
