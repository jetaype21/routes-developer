import axiosConfig from "./axiosConfig";

export const CODE_SUCCCES_RESPONSE = 201;
export const CODE_ERROR_INTERNAL_RESPONSE = 500;

export const registerUser = async (user) => {
  try {
    const response = await axiosConfig.post("/user/register", user);
    const userResponse = response.data.data;

    return {
      message: `Usuario ${userResponse.name} ${userResponse.lastName} creado correctamente`,
      status: CODE_SUCCCES_RESPONSE,
    };
  } catch (error) {
    return {
      message: error.response.data.message,
      status: error.response.status || CODE_ERROR_INTERNAL_RESPONSE,
    };
  }
};

export const loginUser = async (user, dispatch, functionSetState) => {
  try {
    const userLogin = await axiosConfig.post("/user/login", user);
    const { user: userResponse, token } = userLogin.data.data;

    dispatch(
      functionSetState({
        user: userResponse,
        token: token,
      })
    );
    return {
      message: `Usuario ${userResponse.name} ${userResponse.lastName} logueado correctamente`,
      status: CODE_SUCCCES_RESPONSE,
    };
  } catch (error) {
    return {
      message: error.response.data.message,
      status: error.response.status || CODE_ERROR_INTERNAL_RESPONSE,
    };
  }
};

export const categories = async () => {
  try {
    const response = await axiosConfig.get("/categories");
    // console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const getCourses = async () => {
  try {
    const response = await axiosConfig.get("/course");
    return response.data.data;
  } catch (error) {
    console.log(error);
  }
};

export const sendLikeCourse = async (id_course, user_id, token) => {
  try {
    const response = await axiosConfig.post(
      `/course/${id_course}`,
      { user_id },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const courseResponse = response.data.data;
    return {
      message: `Cursos ${courseResponse.name} agregado a favoritos`,
      status: CODE_SUCCCES_RESPONSE,
    };
  } catch (error) {
    console.log(error);
    return {
      message: error.response.data.message,
      status: error.response.status || CODE_ERROR_INTERNAL_RESPONSE,
    };
  }
};
