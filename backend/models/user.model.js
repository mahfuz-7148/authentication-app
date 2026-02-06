import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  }
}, {
  timestamps: true,
  versionKey: false
})

// With proper error handling
userSchema.pre('save', async function () {
  try {
    if (!this.isModified('password')) {
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;

  } catch (error) {
    console.error('Password hashing error:', error);
    throw new Error(`Password hashing failed: ${error.message}`);
  }
});

userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

export const User = mongoose.model('User', userSchema)