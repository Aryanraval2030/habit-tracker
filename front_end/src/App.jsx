import { useState } from "react";
import "./App.css";
import UserRegister from "./UserRegister";

function App() {
  const [showPopup, setShowPopup] = useState(true);
  return (
    <>
      <UserRegister show={showPopup} setShow={setShowPopup} />
    </>
  );
}

export default App;
