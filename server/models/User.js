import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
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
    required: true
  },
  avatar: {
    type: String,
    default: function() {
      return `https://api.dicebear.com/7.x/avataaars/svg?seed=${this.name}`;
    }
  },
  role: {
    type: String,
    default: 'Learner'
  },
  bio: {
    type: String,
    default: ''
  },
  github: {
    type: String,
    default: ''
  },
  linkedin: {
    type: String,
    default: ''
  },
  streak: {
    type: Number,
    default: 0
  },
  tasksDone: {
    type: Number,
    default: 0
  },
  badges: [{
    id: String,
    name: String,
    icon: String,
    earned: {
      type: Date,
      default: Date.now
    }
  }],
  currentPath: {
    id: String,
    title: String
  },
  roadmapSteps: {
    type: Array,
    default: []
  },
  globalNotes: [{
    id: String,
    content: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Hash password before saving
userSchema.pre('save', async function() {
  if (!this.isModified('password')) return;
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (err) {
    throw err;
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
