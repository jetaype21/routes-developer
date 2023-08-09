import { useEffect, useMemo, useState } from "react";
import NavBar from "../navbar/NavBar";
import RegisterForm from "../widgets/RegisterForm";
import "./header.css";
import { categories } from "../../utils/httpRequests";
import { Link } from "react-router-dom";

const Header = () => {
  const [openModal, setOpenModal] = useState(false);
  const [categoriesAll, setCategoriesAll] = useState([]);

  const categoriesImage = [
    "https://img.freepik.com/free-vector/mobile-app-development-background-with-digital-symbols-flat-vector-illustration_1284-77466.jpg?size=626&ext=jpg&ga=GA1.2.645654474.1690304318&semt=ais",
    "https://img.freepik.com/free-vector/computer-programming-camp-abstract-concept-illustration_335657-3921.jpg?size=626&ext=jpg&ga=GA1.2.645654474.1690304318&semt=ais",
    "https://img.freepik.com/free-vector/programming-concept-it-education-student-writing-software-coding-application-java-script-it-project-digital-technology-development-website-interface-vector-illustration_613284-1712.jpg?size=626&ext=jpg&ga=GA1.2.645654474.1690304318&semt=ais",
    "https://img.freepik.com/free-vector/hand-drawn-web-developers-working_23-2148819605.jpg?size=626&ext=jpg&ga=GA1.2.645654474.1690304318&semt=ais",
  ];

  let LocalOpenModal = useMemo(() => {
    return openModal;
  }, [openModal]);

  const handleOpenModal = () => {
    if (openModal) {
      setOpenModal(false);
    }

    if (!openModal) {
      setOpenModal(true);
    }
  };

  const getCategories = async () => {
    const response = await categories();
    setCategoriesAll(response);
  };

  const categoriesAllMemo = useMemo(() => {
    return categoriesAll;
  }, [categoriesAll]);

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <header className="header__container">
      <NavBar handleOpenModal={handleOpenModal} />
      {LocalOpenModal && <RegisterForm handleOpenModal={handleOpenModal} />}
      <section className="header__content">
        <article className="header__content--left">
          <h2>
            Aprende de otros desarrolladores, <br /> o que todos aprendan de{" "}
            <span>ti</span>.
          </h2>
          <p>
            DevMap es un sitio minimalista donde podras ver los cursos que
            tomaron otros desarrolladores y lo recomiendan. <br />
            <br />
            Tú también podrás recomendar y guiar a los nuevos{" "}
            <span>desarrolladores</span>.
          </p>
        </article>
        <article className="header__content--right">
          <img src="https://i.gifer.com/3BBS.gif" alt="DevMap intro" />
        </article>
      </section>

      <h2 className="title_categories">
        Descubre rutas de aprendizaje de otros desarrolladores
      </h2>
      <section className="cardContainer">
        {categoriesAllMemo &&
          categoriesAllMemo.map((category, index) => (
            <article className="card" key={category.id}>
              <img src={categoriesImage[index]} alt={category.name} />
              <h3>{category.name}</h3>
              <p>{category.description}</p>
              <Link to={""}>visitar</Link>
            </article>
          ))}
        <article className="card">
          <img
            src="https://img.freepik.com/free-vector/female-programmer-doing-her-job-office_23-2148274929.jpg?size=626&ext=jpg&ga=GA1.2.645654474.1690304318&semt=ais"
            alt="todas las categorias"
          />
          <h3>Todos los cursos</h3>
          <p>
            Visualiza todas las categorias y explora el mundo de la
            programación.
          </p>
          <Link to={""}>visitar</Link>
        </article>
      </section>
    </header>
  );
};
export default Header;
