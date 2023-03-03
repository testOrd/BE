import mongoose from '../config/database';

interface User {
  _id: mongoose.Types.ObjectId;
  username: string;
  password: string;
}

const userSchema = new mongoose.Schema<User>({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model<User>('User', userSchema);

export default User;
