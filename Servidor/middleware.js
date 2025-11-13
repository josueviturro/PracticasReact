import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
    const auth = req.headers.authorization || "";

    const token = auth.startsWith("Bearer ") ? auth.slice(7) : null

    if (!token) return res.status(401).json({message: "Token requerido"})

        try{
            const decode = jwt.verify(token,process.env.JWT_ACCESS_SECRET);
            req.user = decode;
            next();
        }catch {
            return res.status(401).json({message: "Token invalido o expirado"})
        }

}

export default authenticate;