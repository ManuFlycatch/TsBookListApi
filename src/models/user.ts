import mongoose, { Schema,Document } from 'mongoose';
import bcrypt from 'bcryptjs'

export interface IUser extends Document {
    name: string;
    age: number;
    email: string;
    password: string;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true},
  age: { type: Number, required: true},  
  email: { type: String, required: true, unique:true},  
  password: { type: String, required: true} 

})

UserSchema.pre<IUser>('save', async function (next)  {
  const user = this

  if (user.isModified('password'))
  {
      user.password = await bcrypt.hash(user.password, 8)
  }

})


const User = mongoose.model<IUser>('User', UserSchema)
export default User



