const jwt = require('jsonwebtoken');
const path = require('path');

const dotenv = require('dotenv');

dotenv.config({path: path.join(__dirname, 'config', '.env')});

const verify = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers["x-access-token"];   //get token

    if(!token){ //if it doesn't exists then throw error
        return res.status(403).send("A token is required for authentication.");
    }

    try{    //if it does exists
        const decoded = jwt.verify(token, process.env.SECRET_KEY);  //verify the token
        req.user = decoded; //add token to req to access it in next middleware
    }
    catch(err){ //handle error
        return res.status(401).send("Invalid Token");
    }
    
    return next();
};

module.exports = verify;