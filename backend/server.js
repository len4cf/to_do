import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import session from "express-session"
import cors from 'cors'

import userRoutes from "./routes/userRoutes.js"
import taskRoutes from "./routes/taskRoutes.js"
import loginRoutes from './routes/loginRoutes.js'

dotenv.config()

const PORT = process.env.PORT || 3001;
const app = express()

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000', // Permite apenas esse domínio
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Especifica quais métodos são permitidos
  allowedHeaders: ['Content-Type'], // Permite o cabeçalho Content-Type
}));

app.use(
  session({
    secret: "suaChaveSecreta", // Substitua por uma chave secreta forte
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Use `secure: true` se estiver em HTTPS
  })
);


app.use("/users", userRoutes);
app.use("/tasks", taskRoutes);
app.use("/auth", loginRoutes);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
  });


