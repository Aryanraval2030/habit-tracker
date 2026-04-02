import { useEffect, useState } from "react";
import "./App.css";
import UserRegister from "./UserRegister";
import Hero from "./pages/Hero";
import AddHabits from "./pages/AddHabits";

function App() {
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn) {
      setPage("hero"); // direct hero section
    }
  }, []);

  const [page, setPage] = useState("register");
  return (
    <div className="font-serif  min-h-screen">
      {/* <UserRegister show={showPopup} setShow={setShowPopup} /> */}
      {/* <Hero/> */}
      {page === "register" && <UserRegister setPage={setPage} />}
      {page === "addHabits" && <AddHabits setPage={setPage} />}
      {page === "hero" && <Hero />}
      {/* <AddHabits /> */}
    </div>
  );
}

export default App;
