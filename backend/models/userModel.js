import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
    },
    surname: {
      type: String,
      required: [true, 'El apellido es obligatorio'],
    },
    age: {
      type: Number, min: 18, max: 95,
      required: [true, 'La edad es obligatoria, entre 18 y 95 años'],
    },
    email: {
      type: String,
      required: [true, 'El email es obligatorio'],
      unique: true,
    },
    ci: {
      type: Number,
      required: [true, 'La cédula de identidad es oblogatios. 8 carácteres númericos'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'La contraseña es obligatoria'],
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
})

const User = mongoose.model('User', userSchema);

export default User;
