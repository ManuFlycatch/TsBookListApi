import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

export interface IUser extends Document<any> {
  name: string;
  age: number;
  email: string;
  password: string;
  tokens: Array<object>;
  generateAuthToken() :string;
}

export interface IUserModel extends Model<IUser> {
  // declare any static methods here
  findByCredentials(email: string, password: string): Promise<IUser>;
}

const UserSchema = new Schema<IUser, IUserModel>({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tokens: [{
    token:{
      type: String, required: true
    }
  }]
 
});


UserSchema.methods.generateAuthToken = async function (){
  const user = this
  const token = jwt.sign({_id: user._id.toString()},'thisismysecret')

  user.tokens = user.tokens.concat({ token })
  await user.save()

  return token

}

UserSchema.statics.findByCredentials = async function (email: string,password: string): Promise<IUser | null> {
  const user = await User.findOne({ email }).exec();
  if (!user) {
    throw new Error("unable to login...");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("unable to login...");
  }
  return user;
};

UserSchema.pre<IUser>("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
});

const User = mongoose.model<IUser, IUserModel>("User", UserSchema);
export default User;
