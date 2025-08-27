import mongoose from "mongoose"
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  refreshToken: {
    type: String,
  },
  role: {
    type: String,
    enum: ['customer', 'admin', 'seller'],
  }, 
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
})

userSchema.pre('save', async function save(next) {
  if (!this.isModified('password')) return next();
  try {
    this.password = await bcrypt.hash(this.password, 10);
    return next();
  } catch (err) {
    return next(err);
  }
});


userSchema.methods.validatePassword = async function validatePassword(password) {
  return bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function generateAccessToken(){
  const token = jwt.sign(
        { username: this.username },
        process.env.JWT_SECRET,
        { expiresIn: '1h' })
  return token;
}

userSchema.methods.generateRefreshToken = async function generateRefreshToken(){
  const token = jwt.sign(
        { username: this.username },
        process.env.REFRESH_SECRET,
        { expiresIn: '10d' });
  this.refreshToken=token
  await this.save()
  return token;
}




export const User = new mongoose.model("User", userSchema);