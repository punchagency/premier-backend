import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

interface User {
  name: string;
  email: string;
  password?: string;
  googleId?: string;
  emailVerified?: Date;
  preferences: {
    newsUpdates: boolean;
    emailNotifications: boolean;
    propertyAlerts: boolean;
  };
  role: string;
  phone: string;
  image: string;
}


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true
  },
  password: {
    type: String,
    required: function(this: User) {
      return !this.googleId; // Password is required only if googleId is not present
    }
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  phone: {
    type: String,
  },
  image: {
    type: String,
  },
  googleId: {
    type: String,
  },
  
emailVerified: {
  type: Date,
},

  preferences: {
    type: Object,
    default: {
      newsUpdates: false,
      emailNotifications: false,
      propertyAlerts: false,
    }
  }

}, { timestamps: true }); 

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  if (typeof this.password === 'string') {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;