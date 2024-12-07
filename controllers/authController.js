const adminModel = require('../models/adminModel');
const {responseReturn} = require("../utilities/response");
const bcrpty = require('bcrypt');
const { createToken } = require('../utilities/tokenCreate');

class authController {
    admin_login = async (req, res) => {
        const { email, password } = req.body;

        try {
            const admin = await adminModel.findOne({email}).select('+password');
            //console.log(admin);
            if (admin) {
                const passwordMatch = await bcrpty.compare(password, admin.password);
                //console.log(passwordIsGood);
                if (passwordMatch) {
                    const token = await createToken({
                        id: admin.id,
                        role: admin.role
                    })
                    res.cookie('accessToken', token, {
                        expires: new Date(Date.now() + 7*24*60*60*1000)
                    })
                    responseReturn(res, 200,{token, message: 'Login Success'});
                } else {
                    responseReturn(res, 404,{error: 'Invalid Password'});
                }
            } else {
                responseReturn(res, 404,{error: 'Invalid Email'});
            }
        } catch (error) {
            responseReturn(res, 500,{error: error.message});
        }
    }
}

module.exports =  new authController();