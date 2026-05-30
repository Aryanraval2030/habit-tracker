import { useEffect, useState, useRef } from "react";
import "./App.css";
import UserRegister from "./UserRegister";
import Hero from "./pages/Hero";
import AddHabits from "./pages/AddHabits";
import HeroSkeleton from "./components/HeroSkeleton";

export const API_URL = "https://habit-tracker-cmun.onrender.com/api";

function App() {
  const [page, setPage] = useState("loading");

  const [selectedHabits, setSelectedHabits] = useState({
    selected: [],
    custom: [],
  });
  const [completedHabits, setCompletedHabits] = useState({
    date: new Date().toDateString(),
    default: [],
    custom: [],
  });
  const [habitHistory, setHabitHistory] = useState({});

  const isFirstRender = useRef(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${API_URL}/me`, {
          // credentials: "include",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (res.ok) {
          const user = await res.json();
          setSelectedHabits(
            user.selectedHabits || { selected: [], custom: [] },
          );
          setCompletedHabits(
            user.completedHabits || {
              date: new Date().toDateString(),
              default: [],
              custom: [],
            },
          );
          setHabitHistory(user.habitHistory || {});

          if (
            user.selectedHabits &&
            (user.selectedHabits.selected?.length > 0 ||
              user.selectedHabits.custom?.length > 0)
          ) {
            setPage("hero");
          } else {
            setPage("addHabits");
          }
        } else {
          setPage("register");
        }
      } catch (err) {
        console.error("Failed to check auth status", err);
        setPage("register");
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (page !== "loading" && page !== "register") {
      const saveToBackend = async () => {
        try {
          await fetch(`${API_URL}/update-habits`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            // credentials: "include",
            body: JSON.stringify({
              selectedHabits,
              completedHabits,
              habitHistory,
            }),
          });
        } catch (err) {
          console.error("Failed to save habit status", err);
        }
      };

      const timeoutId = setTimeout(() => saveToBackend(), 500);
      return () => clearTimeout(timeoutId);
    }
  }, [selectedHabits, completedHabits, habitHistory, page]);

  return (
    <div className="font-serif min-h-screen">
     {page === "loading" && <HeroSkeleton />}
      {page === "register" && (
        <UserRegister
          setPage={setPage}
          setSelectedHabits={setSelectedHabits}
          setCompletedHabits={setCompletedHabits}
          setHabitHistory={setHabitHistory}
        />
      )}
      {page === "addHabits" && (
        <AddHabits
          setPage={setPage}
          setSelectedHabits={setSelectedHabits}
          selectedHabits={selectedHabits}
        />
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
      <p>develop by Aryan Raval</p>
    </div>

  );
}

export default App;
