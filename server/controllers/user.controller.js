import { createUserOrm, loginUserOrm, updateUserOrm } from "../orm/user.orm.js";
import { codeError404 } from "../utils/httpCodes.js";

const userController = () => {
  const createUser = async (user) => {
    if (!user.name || !user.lastName || !user.email || !user.password)
      return { status_code: codeError404, message: "no se cumplen parámetros" };

    return await createUserOrm(user);
  };

  const loginUser = async (user) => {
    if (!user.email || !user.password)
      return { status_code: codeError404, message: "no se cumplen parámetros" };

    return await loginUserOrm(user);
  };

  const updateUser = async (user) => {
    if (!user._id || !user.name || !user.lastName || !user.email)
      return { status_code: codeError404, message: "no se cumplen parámetros" };

    return await updateUserOrm(user);
  };

  return { createUser, loginUser, updateUser };
};

export default userController;
