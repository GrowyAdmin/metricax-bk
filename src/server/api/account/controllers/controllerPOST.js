import ResponseDTO from '../../../helpers/responseDTO.js';
import message from '../utils/lang/message.js';
import passport from 'passport';
import jwt from 'jsonwebtoken';
/**
     * @author Juan David Alcala
     * @description This method creates a new business
     * @param req Express functionality of the request event
     * @param res Express functionality of the response event
     * @returns data of business created
*/

export default {
    async signIn(
        req,
        res,
        next,
    ) {
        const responseDTO = new ResponseDTO(res);
        passport.authenticate('local.signin', async (err, user, info) => {
            try {
                if (err || !user) {
                    return responseDTO.errorServerResponse({
                        code: 500,
                        nameError: 'ERROR_LOGIC_SIGN_IN',
                        message: info.message,
                    });
                }

                req.login(user, { session: false }, async (err) => {
                    if (err) return next(err);
                    const bodyData = { ...user };
                    const token = jwt.sign({ user: bodyData }, 'TOP_SECRET', {
                        expiresIn: '24h',
                    });
                    console.log('bodyData', bodyData);
                    console.log('token in post', token);

                    res.cookie("user", JSON.stringify({ bodyData}));
                    res.cookie("jwt", token);
                    return responseDTO.successResponse({
                        data: {...bodyData, token}
                    });
                    
                });
            } catch (error) {
                console.log('error', error);
                return responseDTO.errorServerResponse();
            }
        })(req, res, next);
    },
    async signUp(req, res) {
        const responseDTO = new ResponseDTO(res);
        try {
            return responseDTO.successResponse({
                message: message.Success.SIGNUP_SUCCESS,
                data: { userId: req.user.idUser },
            });

        } catch (error) {
            console.log('error', error);
            return responseDTO.errorServerResponse();
        }
    },
    async logout(req, res) {
        const responseDTO = new ResponseDTO(res);
        try {
           // Clear JWT token cookie
            res.clearCookie("jwt");
            res.clearCookie("user");
            res.redirect("/login");

        } catch (error) {
            console.log('error', error);
            return responseDTO.errorServerResponse();
        }
    },
}
