import { useSelector } from "react-redux";
import "./coursecard.css";
import { sendLikeCourse } from "../../../utils/httpRequests";

const CourseCard = ({ course }) => {
  if (!course.status) return null;

  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const sendLike = async () => {
    alert("La funcion no esta disponible");
    // try {
    //   const res = await sendLikeCourse(course._id, user._id, token);
    //   console.log(res);
    //   alert(res.message);
    // } catch (error) {
    //   console.log(error);
    //   alert(error.message);
    // }
  };

  return (
    <section className="cardCourse">
      <h3>{course.name}</h3>
      <p>{course.description}</p>

      {/* user section */}
      <section className="section__container">
        <span className="section__title">Informacion usuario</span>
        <p className="ruta__info">
          Nombres:{" "}
          <span>
            {course.user_id.name} {course.user_id.lastName}
          </span>
        </p>
        <p className="ruta__info">
          Email: <span>{course.user_id.email}</span>
        </p>
      </section>
      {/* courses informaction */}
      <section className="section__container">
        <span className="section__title">Informacion RUTA</span>
        <section className="section__container--cursos">
          {course.cursos &&
            course.cursos.map((courseItem) => (
              <section>
                <p className="ruta__info">
                  Nombre: <span>{courseItem.nombre_curso}</span>
                </p>
                <p className="ruta__info">
                  canal / plataforma:<span> {courseItem.canal}</span>
                </p>
                <p className="ruta__info">
                  link cursos: <a href={courseItem.link}>Ingresar al curso</a>
                </p>
                <hr />
              </section>
            ))}
        </section>
      </section>

      <p className="ruta__info ranking_info">
        Ranking: <span>{course.ranking.length}</span>
      </p>
      <p onClick={sendLike} className="ruta__info">
        agregar a favoritos
      </p>
    </section>
  );
};
export default CourseCard;
