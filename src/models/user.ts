import mongoose, { Schema,Document } from 'mongoose';

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

UserSchema.post<IUser>('save', function (){
    console.log('user saving data');
})

export default mongoose.model<IUser>('User', UserSchema)



