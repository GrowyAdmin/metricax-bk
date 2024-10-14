import {AccountModel} from '../../db/Sequelize/index.js'

export default {
    async getUserByEmail({email}) {
        return await AccountModel.findOne({
            where: { email },
            raw: true,
            nest: true,
          });
    },
    async createUser({email, password, country}) {
        return await AccountModel.create({email, password, country});
    },
}
