import express from 'express';
import authRoutes from './routes/auth';
import userRoutes from './routes/user';

const app = express();
const port = process.env.PORT || 3000;;

// Middleware for parsing JSON data in requests
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

// Start the server
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
