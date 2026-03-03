const jwt = require('jsonwebtoken')
const User = require('../Models/userModel')

const requireAuth = (req, res, next) => {
    //  const token = req.cookies.jwt

    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "Unauthorized" });

    const token = authHeader.split(" ")[1];

    //Check json web token exists & its verified
    if (token) {
        jwt.verify(token, 'vibhas_natekar', (err, decodedToken) => {
            if (err) {
                console.log(err)
                // res.redirect('/login')
               return res.status(401).json({ message: "Unauthorized" })
            } else {
                // console.log(decodedToken);
                // next();

                req.user = decodedToken;
                next();

            }
        })
    }
    else {
        // res.redirect('/login')
      return  res.status(401).json({ message: "Unauthorized" })
    }
    console.log("middle");



}





module.exports = { requireAuth }