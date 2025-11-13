import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import connectDB from "./database.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import authenticate from "./middleware.js";
import "dotenv/config";  
const app = express();

app.use(cors());
app.use(express.json());

await connectDB();

const usuarioSchema = new mongoose.Schema({
  nombre: String,
  password: String,
});
const Usuario = mongoose.model("Usuario", usuarioSchema);

app.post("/usuariosdb", async (req, res) => {
  try {

    const {nombre , password} = req.body

    const nuevo = new Usuario({
      nombre: nombre.trim().toLowerCase(),
      password: await bcrypt.hash(password.trim(), 10)
    })
    await nuevo.save();
    res.json({ ok: true, usuario: nuevo });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { nombre, password } = req.body;
    
    if (!nombre || !password) {
      return res.status(400).json({ ok: false, error: "Faltan datos" });
    }
    
    const usuario = await Usuario.findOne({ nombre: nombre.trim().toLowerCase() });
    if (!usuario) {
      return res.status(401).json({ ok: false, error: "Credenciales inválidas" });
    }

    const esValido = await bcrypt.compare(password, usuario.password)
    if (!esValido){
      return res.status(401).json({ok: false, error: "Contraseña incorrecta"})
    }

    const payload = {sub: usuario._id.toString(), nombre: usuario.nombre, role: "user"}
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: "1m"})

    res.json({status: true,accessToken, usuario: {id: usuario._id, nombre: usuario.nombre, role: "user"} });
  }
  catch{
    res.status(500).json({ ok: false, error: "Error del servidor" });
  }
})



app.listen(3000, () => console.log("Servidor corriendo en puerto 3000"));
