import { useEffect, useState } from "react";
import "./headercursos.css";
import { categories } from "../../utils/httpRequests";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../state";
import { Link } from "react-router-dom";

const HeaderCursos = ({ cursos, setCursos }) => {
  const [categoriesAll, setCategoriesAll] = useState([]);
  const [filterId, setFilterId] = useState("");
  const [optionUserSelect, setOptionUserSelect] = useState("");

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(setLogout());
  };

  const optionsUser = [
    {
      name: "crear nueva ruta",
      functionOnclick: function () {
        alert("La funcion no esta implementada");
      },
    },
    {
      name: "ver mis cursos",
      functionOnclick: function () {
        return alert("La funcion no esta implementada");
      },
    },
    {
      name: "ver favoritos",
      functionOnclick: function () {
        alert("La funcion no esta implementada");
      },
    },
    {
      name: "cerrar sesion",
      functionOnclick: logout,
    },
  ];

  const getCategories = async () => {
    const response = await categories();
    setCategoriesAll(response);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <nav className={"container"}>
      {/* option filter */}
      <article className="container__filters">
        <Link to={"/"} style={{ color: "yellow" }}>
          Home
        </Link>
        <span>Filtros:</span>
        <select
          value={filterId}
          onChange={(e) => {
            setFilterId(e.target.value);
            // console.log(e.target.value);
            // let cursosFilter =
            setCursos(
              e.target.value === ""
                ? cursos
                : cursos.filter(
                    (course) => course.categoria_id._id === e.target.value
                  )
            );
          }}
        >
          <option value="" defaultValue={true}>
            Todos
          </option>
          {categoriesAll &&
            categoriesAll.map((category) => (
              <option
                key={category._id}
                title={category.description}
                value={category._id}
              >
                {category.name}
              </option>
            ))}
        </select>
      </article>

      {/* opciones */}
      <ul className={"options"}>
        {/* {optionMenu.length > 0 &&
          optionMenu.map((option) => (
            <Link to={option.url} key={option.name}>
              <li>{option.name}</li>
            </Link>
          ))} */}
      </ul>

      {/* user account */}
      {user && (
        <section className={"button__container"}>
          <span>
            {user.name} {user.lastName}
          </span>
          <select
            value={optionUserSelect}
            onChange={(e) => {
              setOptionUserSelect(e.target.value);
              optionsUser.map((option, index) => {
                if (option.name === e.target.value) {
                  option.functionOnclick();
                }
                return null;
              });
            }}
          >
            {optionsUser.map((option, index) => (
              <option key={index} onClick={() => option.functionOnclick()}>
                {option.name}
              </option>
            ))}
          </select>
        </section>
      )}
    </nav>
  );
};
export default HeaderCursos;
