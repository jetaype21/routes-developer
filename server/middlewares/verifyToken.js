import jwt from "jsonwebtoken";
import { codeError401, codeErrorInternal } from "../utils/httpCodes.js";

const verifyToken = async (req, res, next) => {
  try {
    let token = req.headers["authorization"];

    if (!token) {
      return res.status(codeError401).json({
        message: "Acceso denegado, proveer un token válido",
      });
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;

    next();
  } catch (error) {
    res.status(codeErrorInternal).json({
      message: error.message || "Error interno",
    });
  }
};

export default verifyToken;
