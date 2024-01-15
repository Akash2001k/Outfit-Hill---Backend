const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        require:true,
        enum: ["male", "female"],
    },
    password: {
        type: String,
        required: true
    },
    cPassword: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
    hno: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    }
})

// Hashing Password
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12)
        this.cPassword = await bcrypt.hash(this.cPassword, 12)
    }
    next();
})

//JSON Web Token
userSchema.methods.generatToken = async function () {
    try {
        return jwt.sign({
                userId: this._id.toString(),
                email: this.email,
                role:this.role
            },
            process.env.JWT_KEY,
            {
                expiresIn:"1d"
            }
        )

    } catch (error) {
        console.log(error)
    }
}

module.exports = mongoose.model("users", userSchema)