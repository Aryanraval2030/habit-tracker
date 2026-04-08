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

  const [completedHabits, setCompletedHabits] = useState(() => {
    const saved = localStorage.getItem("completedHabits");
    const today = new Date().toDateString();
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.date === today) {
        return parsed;
      }
    }
    return { date: today, default: [], custom: [] };
  });

  const [habitHistory, setHabitHistory] = useState(() => {
    const saved = localStorage.getItem("habitHistory");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem("completedHabits", JSON.stringify(completedHabits));
  }, [completedHabits]);

  useEffect(() => {
    localStorage.setItem("habitHistory", JSON.stringify(habitHistory));
  }, [habitHistory]);

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
          setPage={setPage}
          completedHabits={completedHabits}
          setCompletedHabits={setCompletedHabits}
          habitHistory={habitHistory}
          setHabitHistory={setHabitHistory}
        />
      )}
    </div>
  );
}

export default App;
