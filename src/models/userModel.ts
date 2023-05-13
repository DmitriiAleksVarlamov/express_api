import { model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export type User = {
  email: string;
  password: string;
};

const UserSchema = new Schema<User>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.pre('save', async function (next) {
  // const user = this;
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//
// UserSchema.methods.isValidPassword = async function (password) {
//   const user = this;
//
//   return await bcrypt.compare(password, user.password);
// };

const UserModel = model('user', UserSchema);

export { UserModel };
