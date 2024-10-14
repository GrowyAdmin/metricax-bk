import bcrypt from 'bcryptjs';

export default {
  async encryptPassword(password) {
    const salt = await bcrypt.genSalt(10);
    const finalPassword = await bcrypt.hash(password, salt);
    return finalPassword;
  },

  async matchPassword(password, savedPassword) {
    try {
      return await bcrypt.compare(password, savedPassword);
    } catch (error) {
      console.log('error encrypt pass', error);
      throw error;
    }
  },

  async matchPasswordServiceNet(password, passwordServiceNet) {
    try {
      return password === passwordServiceNet;
    } catch (error) {
      console.log('error encrypt pass', error);
      throw error;
    }
  },
};
