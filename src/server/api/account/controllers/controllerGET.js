import ResponseDTO from '../../../helpers/responseDTO.js'
import model from '../model.js';
import messageData from '../utils/lang/message.js';

/**
     * @author Juan David Alcala
     * @description This method creates a new business
     * @param req Express functionality of the request event
     * @param res Express functionality of the response event
     * @returns data of business created
*/

export default {
    async getUserByEmail(req, res) {
        const responseDTO = new ResponseDTO(res);
        const { EMAIL: email } = req.params;
        try {

            const user = await model.getUserByEmail({email});
            if (!user) {
                return responseDTO.errorServerResponse({
                    message: messageData.error.dont_exist_user,
                    nameError: 'dont_exist_user'
                })
            }

            return responseDTO.successResponse({
                message: messageData.success.foundedSuccess,
                data: { user },
            });
        } catch (error) {
            console.log('Error in createBusiness:', error);
            return await responseDTO.errorServerResponse();
        }
    },
}
