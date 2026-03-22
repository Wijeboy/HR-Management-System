require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const attendanceRoutes = require('./routes/attendanceRoutes');
const leaveRoutes = require('./routes/leaveRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const { requireAuth } = require('./middleware/authMiddleware');
const { seedDefaultUsers } = require('./services/userSeedService');

const app = express();

// ─── Middleware ───────────────────────────────────────────────────────────────
const corsOrigins = (process.env.CORS_ORIGIN || 'http://localhost:3000,http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(cors({ origin: corsOrigins, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files statically
app.use('/uploads', express.static('uploads'));

// ─── Routes ──────────────────────────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/users', requireAuth, userRoutes);
app.use('/api/attendance', requireAuth, attendanceRoutes);
app.use('/api/leave', requireAuth, leaveRoutes);
app.use('/api/notifications', requireAuth, notificationRoutes);

// ─── DB Connection ────────────────────────────────────────────────────────────
const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error('❌ MONGO_URI is required. Set your MongoDB Atlas URI in Backend/.env');
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(async () => {
    console.log('✅ MongoDB connected');
    await seedDefaultUsers();
    console.log('✅ Default DB users verified');
  })
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// ─── Start Server ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`🚀 HRMS Backend running on http://localhost:${PORT}`);
});