import express from "express"; // Setup express

const app = express(); // Create an express app

app.use(express.json());

// Route import
import userRouter from './routes/user.route.js';

// Route declaration
app.use('/api/v1/users', userRouter);

// Example route: http://localhost:4000/api/v1/users/register

export default app; // Declare global use