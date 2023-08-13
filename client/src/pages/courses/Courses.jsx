import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import HeaderCursos from "../../components/headerCursos/HeaderCursos";
import "./courses.css";
import { useSelector } from "react-redux";
import { getCourses } from "../../utils/httpRequests";
import { setCourses } from "../../state";
import CourseCard from "../../components/widgets/CourseCard/CourseCard";

const Courses = () => {
  const cursosState = useSelector((state) => state.courses);
  const [cursos, setCursos] = useState([]);

  const dispatch = useDispatch();

  const getCursosLocal = async () => {
    const response = await getCourses();
    // console.log(response);
    dispatch(
      setCourses({
        courses: response,
      })
    );
    setCursos(cursosState);
  };

  useEffect(() => {
    getCursosLocal();
  }, []);

  return (
    <main>
      <HeaderCursos cursos={cursosState} setCursos={setCursos} />
      {/* cursos */}

      <section
        className={`${cursos.length > 0 && "card__flex"} card__container`}
      >
        {cursos ? (
          cursos.map((curso) => <CourseCard course={curso} />)
        ) : (
          <p>Cargando cursos</p>
        )}
      </section>
      {/* {console.log(cursos)} */}
    </main>
  );
};
export default Courses;
