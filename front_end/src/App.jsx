import { useState } from "react";
import "./App.css";
import UserRegister from "./UserRegister";
import Hero from "./pages/Hero";

function App() {
  const [showPopup, setShowPopup] = useState(true);
  return (
    <div className="font-serif">
      <UserRegister show={showPopup} setShow={setShowPopup} />
      <Hero/>
    </div>
  );
}

export default App;
