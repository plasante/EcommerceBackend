const adminModel = require('../models/adminModel');
const {responseReturn} = require("../utilities/response");

class authController {
    admin_login = async (req, res) => {
        const { email, password } = req.body;

        try {
            const admin = await adminModel.findOne({email}).select('-password');
            //console.log(admin);
            if (admin) {
                responseReturn(res, 200,{error: 'Successfully logged in'});
            } else {
                responseReturn(res, 404,{error: 'Invalid Email or password'});
            }
        } catch (error) {
            responseReturn(res, 500,{error: error.message});
        }
    }
}

module.exports =  new authController();