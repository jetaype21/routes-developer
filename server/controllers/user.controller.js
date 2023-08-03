import { createUserOrm, loginUserOrm } from "../orm/user.orm.js";
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

  return { createUser, loginUser };
};

export default userController;
