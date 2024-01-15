const jwt = require('jsonwebtoken');
const User = require('../model/userModel')

exports.verifyToken = async (req, res, next) => {
    const token = req.header('Authorization');
    const JWToken = token ? token.split(' ')[1] : null;
  
    if (!token || !JWToken) {
      return res.status(401).json({ message: "Unauthorized HTTP Token not provided" });
    }
  
    // console.log('Token from auth middleware -->', JWToken);
  
    try {
      const isVerified = jwt.verify(JWToken, process.env.JWT_KEY)

      const userDate = await User.findOne({email: isVerified.email})

      req.user = userDate;
      req.token = token;
      req.userId = userDate._id

      // console.log(userDate);
      
      next();
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized. Invalid Token" });
    }
  }