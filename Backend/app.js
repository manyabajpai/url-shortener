import express from 'express';
import connectDB from './config/db.js';
const app = Express();

// Server Setup
const PORT = 3333;
app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});