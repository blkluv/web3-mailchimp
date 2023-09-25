import { ConnectWallet } from "@thirdweb-dev/react";
import Email from "./pages/Email";
import Home from "./pages/Home";
import "./styles/Home.css";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

const About = () => <h2>About</h2>;

export default function App() {
  return (
    <Router>
      <main className="main">
        {/* navbar */}
        <div className="flex-direction-row navbar-top">
          <a href="/email">
            <div className="card-text">
              <h2 className="gradient-text-1">Email ➜</h2>
            </div>
          </a>

          <a href="/">
            <div className="card-text">
              <h2 className="gradient-text-2">Home</h2>
            </div>
          </a>

          <a href="/about">
            <div className="card-text">
              <h2 className="gradient-text-3">About</h2>
            </div>
          </a>
        </div>
        {/* navbar end*/}
        <div className="connect">
          <ConnectWallet
            dropdownPosition={{
              side: "bottom",
              align: "center",
            }}
          />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/email" element={<Email />} />
        </Routes>
      </main>
    </Router>
  );
}
