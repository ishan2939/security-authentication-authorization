const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const path = require('path');

const dotenv = require('dotenv');

dotenv.config({path: path.join(__dirname, 'config', '.env')});

const User = require('../model/user');

exports.login = async (req, res) => {

    try {
        const { email, password } = req.body;   //get email password

        if (!(email && password)) { //if they don't exist
            return res.status(400).send("Not sufficient data provided");    //throw error
        }

        const userExists = await User.findOne({ email: email.toLowerCase() });  //get user with entered email

        if (userExists) {   //if user exists

            const isPasswordCorrect = await bcrypt.compare(password, userExists.password);  //compare passwords

            if(isPasswordCorrect){  //if they match

                const token = jwt.sign( //generate token
                    { user_id: userExists._id, email },
                    process.env.SECRET_KEY,
                    { expiresIn: "2d" }
                )
    
                userExists.token = token;   //add it to user
    
                return res.status(200).json({
                    "status": "Logged in successfully",
                    "user": userExists  //pass user along with token as response
                });
            }
            return res.status(400).send("Invalid credentials"); //if password is incorrect then show error
        }
        return res.status(404).send("No such user exists.");    //if user doesn't exists then show error
    }
    catch(err){ //handle error
        console.log(err);
        return res.status(400).send(err.message);
    }
}