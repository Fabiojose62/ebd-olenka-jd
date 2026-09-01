import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createPool } from 'pg';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const pool = createPool({
  connectionString: process.env.DATABASE_URL,
});

// Test database connection
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('✅ Database connected successfully');
  }
});

// Routes imports
import authRoutes from './routes/auth.js';
import alunosRoutes from './routes/alunos.js';
import profesoresRoutes from './routes/professores.js';
import presencaRoutes from './routes/presenca.js';
import tesourariaRoutes from './routes/tesouraria.js';
import relatoriosRoutes from './routes/relatorios.js';

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/alunos', alunosRoutes);
app.use('/api/professores', profesoresRoutes);
app.use('/api/presenca', presencaRoutes);
app.use('/api/tesouraria', tesourariaRoutes);
app.use('/api/relatorios', relatoriosRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'EBD Olenka API is running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

export { pool };
