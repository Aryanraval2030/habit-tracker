import { useState } from "react";
import "./App.css";
import UserRegister from "./UserRegister";
import Hero from "./pages/Hero";
import AddHabits from "./pages/AddHabits";

function App() {
  const [showPopup, setShowPopup] = useState(true);
  return (
    <div className="font-serif bg-black">
      {/* <UserRegister show={showPopup} setShow={setShowPopup} /> */}
      {/* <Hero/> */}
      <AddHabits/>
    </div>
  );
}

export default App;
