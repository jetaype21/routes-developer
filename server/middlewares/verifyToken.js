import jwt from "jsonwebtoken";
import { codeErrorInternal } from "../utils/httpCodes";

const verifyToken = async (req, res, next) => {
  try {
    let token = req.headers["authorization"];

    if (!token) {
      return res.status(codeError401).json({
        message: "Acceso denegado",
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
