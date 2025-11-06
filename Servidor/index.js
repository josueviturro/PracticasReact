import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import connectDB from "./database.js";
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
    const nuevo = new Usuario(req.body);
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
    const usuario = await Usuario.findOne({ nombre, password });
    if (!usuario) {
      return res.status(401).json({ ok: false, error: "Credenciales inválidas" });
    }

    res.json({status: true, usuario: {id: usuario._id, nombre: usuario.nombre} });
  }
  catch{
    res.status(500).json({ ok: false, error: "Error del servidor" });
  }
})

app.listen(3000, () => console.log("Servidor corriendo en puerto 3000"));
