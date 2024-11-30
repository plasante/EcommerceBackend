const adminModel = require('../models/adminModel');
const {responseReturn} = require("../utilities/response");

class authController {
    admin_login = async (req, res) => {
        const { email, password } = req.body;

        try {
            const admin = await adminModel.findOne({email}).select('-password');
            //console.log(admin);
            if (admin) {

            } else {
                responseReturn(res, 404,{error: 'Email not found'});
            }
        } catch (error) {
            responseReturn(res, 500,{error: error.message});
        }
    }
}

module.exports =  new authController();