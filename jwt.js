const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req , res , next) => {
    //Check if the authorization header is present
    if(!req.headers.authorization){
        return res.status(401).json({error: 'Token not found'});
    }
    //Extract the jwt token fron the authorization header
    const token = req.headers.authorization.split(" ")[1];
    if(!token) return res.status(401).json({error: 'Unauthorized'});

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; //Attach user info to request object
        next();

    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Invalid Token'});
    }
}

//Function to generate JWT token
const generateToken = (userData) => {
    //Genereate a new token using the user data and secret key
    return jwt.sign(userData, process.env.JWT_SECRET);
}
module.exports = { jwtAuthMiddleware, generateToken };