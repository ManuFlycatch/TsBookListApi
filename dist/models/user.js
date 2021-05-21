import mongoose, { Schema } from 'mongoose';
const UserSchema = new Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
UserSchema.post('save', function () {
    console.log('user saving data');
});
export default mongoose.model('User', UserSchema);
