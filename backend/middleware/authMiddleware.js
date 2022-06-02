const jwt = require('jsonwebtoken')
const user = require('../models/user')

const verifyToken = async (req, res, next) => {
    const  {token}  = req.cookies;
    if (token) {
        try {
             const decodedUserData = jwt.verify(token, process.env.JWT_SECRET)
             req.user = await user.findById(decodedUserData.id);
             next();
          } catch (err) {
            return res.status(403).json({message: "Token Expired"})
          }
    } else {
        return res.status(503).send({message: "Not authorized. Please log into the system" });
    }  
};

const isAuthenticatedAdmin = (req, res,next) => {
    verifyToken(req, res, () =>  {
        try{
           if (req.user.role === 'admin'){
            next()
        } else {
            return res.status(403).json('Forbidden action')
        } 
        } catch (err){
            res.status(400).json({message: err.message})
        }
        
    })
}

module.exports = {
    isAuthenticatedAdmin,
    verifyToken
}