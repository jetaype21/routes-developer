import User from "../models/User.js";
import jwt from "jsonwebtoken";

import {
  codeError401,
  codeErrorInternal,
  codeSuccess201,
} from "../utils/httpCodes.js";
import bcrypt from "bcrypt";

const UserModel = User;

export const createUserOrm = async (user) => {
  try {
    let userCreate;

    const { password, email } = user;

    await UserModel.findOne({ email: email.toLowerCase() })
      .then((userRes) => {
        if (userRes) {
          throw new Error(`El usuario con correo ${userRes.email} ya existe.`);
        }
      })
      .catch((err) => {
        throw new Error(err);
      });

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    await UserModel.create({ ...user, password: passwordHash })
      .then((userRes) => {
        userCreate = userRes;
      })
      .catch((err) => {
        throw new Error(err);
      });

    delete userCreate._doc.password;

    return {
      status_code: codeSuccess201,
      data: userCreate,
    };
  } catch (error) {
    return {
      status_code: codeErrorInternal,
      message: error.message || "Ocurrió un error interno.",
    };
  }
};

export const loginUserOrm = async (user) => {
  try {
    let userLogin;

    const { email, password } = user;

    await UserModel.findOne({ email: email.toLowerCase() })
      .then((userRes) => {
        if (!userRes) {
          throw new Error(`El usuario con correo ${email} no esta registrado.`);
        }
        userLogin = userRes;
      })
      .catch((err) => {
        throw new Error(err);
      });

    const isMatch = await bcrypt.compare(password, userLogin.password);
    if (!isMatch) {
      throw new Error("Contraseña incorrecta.");
    }

    // Create token for login
    const token = jwt.sign({ id: userLogin._id }, process.env.JWT_SECRET);

    delete userLogin._doc.password;

    return {
      status_code: codeSuccess201,
      data: {
        user: userLogin,
        token: token,
      },
    };
  } catch (error) {
    return {
      status_code: codeError401,
      message: error.message || "Ocurrión un error interno.",
    };
  }
};

export const updateUserOrm = async (user) => {
  try {
    const { _id, ...rest } = user;
    const { name, lastName, email } = rest;
    let userUpdate;

    await UserModel.findByIdAndUpdate(
      _id,
      { name, lastName, email },
      { new: true }
    )
      .then((categoryRes) => {
        if (!categoryRes) {
          throw new Error(`El usuario con id ${_id} no existe.`);
        }

        userUpdate = categoryRes;
      })
      .catch((err) => {
        throw new Error(err);
      });

    delete userUpdate._doc.password;

    return {
      status_code: codeSuccess201,
      data: userUpdate,
    };
  } catch (error) {
    return {
      status_code: codeErrorInternal,
      message: error.message || "Ocurrió un error interno.",
    };
  }
};
