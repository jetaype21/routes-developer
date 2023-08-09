import { Link } from "react-router-dom";
import styles from "./navbar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../state";

const NavBar = ({ handleOpenModal }) => {
  const optionMenu = [
    {
      name: "Home",
      url: "/",
    },
    {
      name: "Cursos",
      url: "/cursos",
    },
    {
      name: "Acerca",
      url: "/about",
    },
  ];

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(setLogout());
  };

  return (
    <nav className={styles.container}>
      {/* logo */}
      <Link to={"/"}>
        <h1 className={styles.logo}>Dev Map</h1>
      </Link>
      {/* opciones */}
      <ul className={styles.options}>
        {optionMenu.length > 0 &&
          optionMenu.map((option) => (
            <Link to={option.url} key={option.name}>
              <li>{option.name}</li>
            </Link>
          ))}
      </ul>
      {/* user account */}
      {user ? (
        <section className={styles.button__container}>
          <span>
            {user.name} {user.lastName}
          </span>
          <button onClick={logout}>Cerrar Sesion</button>
        </section>
      ) : (
        <section className={styles.button__container}>
          <button onClick={handleOpenModal}>
            Iniciar Sesion / Registrarse
          </button>
        </section>
      )}
    </nav>
  );
};
export default NavBar;
