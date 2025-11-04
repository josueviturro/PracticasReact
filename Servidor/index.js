import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import connectDB from "./database.js"; // <- .js, no .cjs

const app = express();
app.use(cors());
app.use(express.json());

await connectDB(); // Node 22 soporta top-level await en ESM

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

app.listen(3000, () => console.log("Servidor corriendo en puerto 3000"));
