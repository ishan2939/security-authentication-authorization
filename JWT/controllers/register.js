const User = require('../model/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const path = require('path');

const dotenv = require('dotenv');

dotenv.config({path: path.join(__dirname, 'config', '.env')});

exports.register = async (req, res) => {

    try{
        const {name, email, password, role} = req.body; //get user details

        if(!(name && email && password && role)){   //apply validation
            return res.status(400).send("Not sufficient data provided.");
        }
        
        const ifUserExists = await User.findOne({ email : email.toLowerCase() });   //get user with entered email

        if(ifUserExists){   //if user does exists
            return res.status(409).send("User already exists.");    //show error
        }

        //if user doesn't exists
        encryptedPassword = await bcrypt.hash(password,10); //encrypt password

        const user = await User.create({    //create user
            fullName: name,
            email:  email.toLowerCase(),
            password: encryptedPassword,
            role: role
        });

        const token = jwt.sign( //generate token
            {user_id : user._id, email},
            process.env.SECRET_KEY,
            {
                expiresIn: "2h"
            }
        )

        user.token = token; //add token to user

        res.status(201).json({
            "status": "Registered successfully",    
            "user" : user   //pass user along with token as response
        });
    }
    catch(err){ //handle error
        console.log(err);
        return res.status(400).send(err.message);
    }
}   