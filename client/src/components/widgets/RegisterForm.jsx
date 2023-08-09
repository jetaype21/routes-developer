import { useState } from "react";
import * as yup from "yup";
import { ErrorMessage, Field, Formik } from "formik";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./registerform.css";
import {
  CODE_ERROR_INTERNAL_RESPONSE,
  CODE_SUCCCES_RESPONSE,
  loginUser,
  registerUser,
} from "../../utils/httpRequests";
import { notifyInfo, notifySuccess } from "../../utils/notify";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state";

const RegisterForm = ({ handleOpenModal }) => {
  const LOGIN = "LOGIN";
  const REGISTER = "REGISTER";

  const [pageType, setPageType] = useState(LOGIN);
  const isLogin = pageType === LOGIN;
  const isRegister = pageType === REGISTER;
  const dispatch = useDispatch();

  const registerSchema = yup.object().shape({
    name: yup
      .string()
      .min(3, "Minimo 3 caracteres.")
      .max(50, "Maximo 50 caracteres.")
      .required("Este campo es requerido."),
    lastName: yup
      .string()
      .min(5, "Minimo 5 caracteres.")
      .max(50, "Maximo 50 caracteres.")
      .required("Este campo es requerido."),
    email: yup
      .string()
      .email("Ingresar email valido")
      .min(7, "Minimo 7 caracteres.")
      .required("Este campo es requerido."),
    password: yup
      .string()
      .min(5, "Minimo 5 caracteres.")
      .required("Este campo es requerido."),
  });

  const loginSchema = yup.object().shape({
    email: yup
      .string()
      .email("Ingresar email valido")
      .min(7, "Minimo 7 caracteres.")
      .required("Este campo es requerido."),
    password: yup
      .string()
      .min(5, "Minimo 5 caracteres.")
      .required("Este campo es requerido."),
  });

  const registerInitialValues = {
    name: "",
    lastName: "",
    email: "",
    password: "",
  };

  const loginInitialValues = {
    email: "",
    password: "",
  };

  const login = async (values, onSubmitProps) => {
    const response = await loginUser(values, dispatch, setLogin);
    if (response.status === CODE_SUCCCES_RESPONSE) {
      notifySuccess(response.message);
      onSubmitProps.setSubmitting(false);
      setTimeout(() => {
        handleOpenModal();
      }, 2000);
      return;
    }

    if (
      response.status === 500 ||
      response.status === CODE_ERROR_INTERNAL_RESPONSE
    ) {
      notifyInfo(response.message);
      onSubmitProps.setSubmitting(false);
      return;
    }
  };
  const register = async (values, onSubmitProps) => {
    const response = await registerUser(values);
    if (response.status === CODE_SUCCCES_RESPONSE) {
      notifySuccess(response.message);
      onSubmitProps.setSubmitting(false);
      return;
    }

    if (
      response.status === 500 ||
      response.status === CODE_ERROR_INTERNAL_RESPONSE
    ) {
      notifyInfo(response.message);
      onSubmitProps.setSubmitting(false);
      return;
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) return await login(values, onSubmitProps);

    if (isRegister) return await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? loginInitialValues : registerInitialValues}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({ values, handleChange, handleSubmit, resetForm, isSubmitting }) => (
        <section className="registerFormContainer">
          <form onSubmit={handleSubmit} className="registerForm">
            <p onClick={handleOpenModal} className="btnClose">
              close X
            </p>
            {/* INPUTS */}
            {isRegister && (
              <>
                {/* name and lastName */}
                <section>
                  <section>
                    <p>Nombres:</p>
                    <Field
                      type="text"
                      name="name"
                      onChange={handleChange}
                      value={values.name}
                      id="name"
                      placeholder="Ingresar nombre"
                    />
                  </section>
                  <ErrorMessage
                    name="name"
                    component={"span"}
                    className="textError"
                  />
                </section>
                <section>
                  <section>
                    <p>Apellidos:</p>
                    <Field
                      type="text"
                      name="lastName"
                      onChange={handleChange}
                      value={values.lastName}
                      id="lastName"
                      placeholder="Ingresar Apellido"
                    />
                  </section>
                  <ErrorMessage
                    name="lastName"
                    component={"span"}
                    className="textError"
                  />
                </section>
              </>
            )}

            {/* correo */}
            <section>
              <section>
                <p>Email:</p>
                <Field
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={values.email}
                  id="email"
                  placeholder="Ingresar correo"
                />
              </section>
              <ErrorMessage
                name="email"
                component={"span"}
                className="textError"
              />
            </section>
            {/* password */}
            <section>
              <section>
                <p>Password:</p>
                <Field
                  type="text"
                  name="password"
                  onChange={handleChange}
                  value={values.password}
                  id="password"
                  placeholder="Ingresar Contraseña"
                />
              </section>
              <ErrorMessage
                name="password"
                component={"span"}
                className="textError"
              />
            </section>

            {/* BOTONES */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="button__submit"
            >
              {isLogin ? "Iniciar sesión" : "Registrarse"}
            </button>

            <p
              onClick={() => {
                setPageType(isLogin ? REGISTER : LOGIN);
                resetForm();
              }}
              className="optionaccount"
            >
              {isLogin ? "Aún no tengo una cuenta" : "Ya tengo una cuenta"}
            </p>
          </form>
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover={true}
            theme="dark"
          />
        </section>
      )}
    </Formik>
  );
};
export default RegisterForm;
