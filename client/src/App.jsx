import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import RegisterForm from "./components/widgets/RegisterForm";
import Courses from "./pages/courses/Courses";

function App() {
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <main className={"App"}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rutas-cursos" element={<Courses />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
