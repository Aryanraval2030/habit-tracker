import { useEffect, useState } from "react";
import "./App.css";
import UserRegister from "./UserRegister";
import Hero from "./pages/Hero";
import AddHabits from "./pages/AddHabits";

function App() {
  const [page, setPage] = useState("register");

  const [selectedHabits, setSelectedHabits] = useState(() => {
    const saved = localStorage.getItem("habits");
    return saved ? JSON.parse(saved) : { selected: [], custom: [] };
  });

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const savedHabits = localStorage.getItem("habits");
    if (isLoggedIn && savedHabits) {
      setPage("hero");
    } else if (isLoggedIn) {
      setPage("addHabits");
    }
  }, []);

  return (
    <div className="font-serif  min-h-screen">
      {page === "register" && <UserRegister setPage={setPage} />}
      {page === "addHabits" && (
        <AddHabits setPage={setPage} setSelectedHabits={setSelectedHabits} />
      )}
      {page === "hero" && (
        <Hero
          selectedHabits={selectedHabits}
          setSelectedHabits={setSelectedHabits}
        />
      )}
    </div>
  );
}

export default App;
