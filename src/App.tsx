import Home from "./pages/Home";
import "./styles/Home.css";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

const About = () => <h2>About</h2>;
const Email = () => <h2>Email</h2>;

export default function App() {
  return (
    <Router>
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/email" element={<Email />} />
        </Routes>
      </main>
    </Router>
  );
}
