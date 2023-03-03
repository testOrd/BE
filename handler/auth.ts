import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../schemas/user';

const saltRounds = 10;

class AuthAdapter {
  static async login(username: string, password: string) {
    try {
      const user = await User.findOne({ username }).exec();
      if (!user) {
        throw new Error('Invalid username or password');
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Invalid username or password');
      }
      const accessToken = jwt.sign({ userId: user._id.toString() }, 'secret',{ expiresIn: '24h' });
      return { accessToken };
    } catch (error) {
      console.error(error);
      throw new Error('Server error');
    }
  }

  static async register(username: string, password: string) {
    try {
      const existingUser = await User.findOne({ username }).exec();
      if (existingUser) {
        throw new Error('Username already exists');
      }
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const user = new User({ username, password: hashedPassword });
      await user.save();
      const accessToken = jwt.sign({ userId: user._id.toString() }, 'secret',{ expiresIn: '24h' });
      return { accessToken };
    } catch (error) {
      console.error(error);
      throw new Error('Server error');
    }
  }
}

export default AuthAdapter;
