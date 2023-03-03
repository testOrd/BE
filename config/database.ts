import mongoose from 'mongoose';
import { constants } from '../constants';

// Connect to MongoDB database
mongoose.connect(constants.db_connection, {});

export default mongoose;
