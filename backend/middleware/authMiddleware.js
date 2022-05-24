const jwt = require('jsonwebtoken')
const user = require('../models/user')

const verifyToken = async (req, res, next) => {
    const  {token}  = req.cookies;
    if (token) {
        // const decodedUserData = jwt.verify(token, process.env.JWT_SECRET)
        // req.user = await user.findById(decodedUserData.id);
        // next();
        try {
             const decodedUserData = jwt.verify(token, process.env.JWT_SECRET)
             req.user = await user.findById(decodedUserData.id);
             next();
          } catch (err) {
            return res.status(403).json({message: "Token Expired"})
          }
    } else {
        return res.status(503).send({message: "Bad credentials" });
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

// const jwt = require('jsonwebtoken')
// const user = require('../models/user')

// const verifyToken = async (req, res, next) => {
//     tokenError = false
//     const  {token}  = req.cookies;
//     if (token) {
//        const decodedUserData = jwt.verify(token, process.env.JWT_SECRET, (err, result) => { 
//            if (err) {
//                tokenError = true
//                return res.status(403).json({message: "Bad request"})
//            }})
//         if (!tokenError){
//         req.user = await user.findById(decodedUserData.id);
//         next();  
//         } 

//     } else {
//         return res.status(503).send({message: "Bad credentials" });
//     }  
// };

// const isAuthenticatedAdmin = (req, res,next) => {
//     verifyToken(req, res, () =>  {
//         try{
//            if (req.user.role === 'admin'){
//             next()
//         } else {
//             return res.status(403).json('Forbidden action')
//         } 
//         } catch (err){
//             return res.status(400).json({message: err.message})
//         }
        
//     })
// }

// module.exports = {
//     isAuthenticatedAdmin,
//     verifyToken
// }