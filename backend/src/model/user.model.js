import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"; // Use to hash password

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            minLength: 2,
            maxLength: 40
        },

        password: {
            type: String,
            required: true,
            minLength: 8,
            maxLength: 16
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
    },

    {
        timestamps: true
    }
)

// Before saving password, we need to hash the password
userSchema.pre('save', async function(next) {
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)

    next();
})

// Compare password
userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password)
}

export const User = mongoose.model("User", userSchema)