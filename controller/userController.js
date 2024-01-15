const User = require("../model/userModel.js");
const cookieParser = require('cookie-parser');
const express = require('express');
const bcrypt = require('bcryptjs')

const app = express();

app.use(express.json());
app.use(cookieParser());


//============================== Register user =====================================
exports.registerUser = async (req, res) => {
   try {

      const { name, email, phone, password, cPassword, hno, city, district, state, pincode, gender } = req.body

      if (!name || !email || !phone || !password || !cPassword || !hno || !city || !district || !state || !pincode || !gender) {
         return res.json({ error: "Please fill all the fields" })
      }

      const userExist = await User.findOne({ email: email })
      if (userExist) {
         return res.status(422).json({ error: "User Already Exists" })
      }

      const user = new User({ name, email, phone, password, cPassword, hno, city, district, state, pincode, gender });

      const userRegister = await user.save()
      return res.status(201).json({
         message: "User Registered Successfully",
         Created_User: userRegister,
         token: await user.generatToken(),
         userId: user._id.toString()
      });
   }
   catch (err) {
      console.log(err)
   }

}

//================================= Login user ========================================

exports.loginUser = async (req, res) => {
   try {

      const { email, password } = req.body;

      if (!email || !password) {
         return res.status(422).json({ error: "Please fill all the fields" })
      }
      const userExist = await User.findOne({ email: email })

      if (userExist) {
         const passwordMatch = await bcrypt.compare(password, userExist.password)

         if (!passwordMatch) {
            return res.status(422).json({ Error: "Invalid password or Email" });
         } else {
            return res.status(200).json({
               message: "Login Successful",
               token: await userExist.generatToken(),
               userId: userExist._id.toString()
            });
         }
      }

      else {
         return res.status(422).json({ Error: "Invalid password or Email" });
      }


   } catch (err) {
      console.log(err)
   }
}

// ============================== User Authentication =================================
exports.authController = (req, res) => {
   try {

      userData = req.user
      return res.status(200).json({ userData })
      console.log(userData)

   } catch (error) {
      console.log("Error from Auth User" + error)
   }
}

// ---- Admin Route ----
// ================================= Users ==========================================

exports.getUsers = async (req, res) => {
   try {
      let users = await User.find()
      res.send(users)
   } catch (err) {
      res.send(err)
   }
}

// ================================= Get User by ID ==========================================

exports.getUserById = async (req, res) => {
   try {
      const userId = req.params.id;

      const userData = await User.findById(userId);

      res.status(200).json({ user_details: userData })
   } catch (error) {
      console.log(error)
   }
}