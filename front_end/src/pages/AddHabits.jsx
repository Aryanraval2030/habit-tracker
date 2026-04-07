import { useState } from "react";
import { FaDumbbell, FaBook, FaPenFancy, FaRunning, FaLeaf, FaUtensils, FaWalking, FaPaintBrush, FaLaptopCode, FaBroom, FaSeedling, FaGraduationCap, FaSwimmer, FaMusic, FaChild,
} from "react-icons/fa";

function AddHabits({ setPage, setSelectedHabits }) {
  const [selected, setSelected] = useState([]);
  const habits = [
    { id: 1, name: "Exercise", icon: <FaDumbbell size={30} color="#F43F5E" /> },
    { id: 2, name: "Meditation", icon: <FaChild size={30} color="#10B981" /> },
    { id: 3, name: "Reading", icon: <FaBook size={30} color="#3B82F6" /> },
    { id: 4, name: "Writing", icon: <FaPenFancy size={30} color="#8B5CF6" /> },
    { id: 5, name: "Yoga", icon: <FaLeaf size={30} color="#14B8A6" /> },
    { id: 6, name: "Cooking", icon: <FaUtensils size={30} color="#F97316" /> },
    { id: 7, name: "Walking", icon: <FaWalking size={30} color="#6366F1" /> },
    { id: 8, name: "Drawing", icon: <FaPaintBrush size={30} color="#EC4899" />,},
    { id: 9, name: "Coding", icon: <FaLaptopCode size={30} color="#0EA5E9" /> },
    { id: 10, name: "Cleaning", icon: <FaBroom size={30} color="#F59E0B" /> },
    { id: 11, name: "Gardening", icon: <FaSeedling size={30} color="#22C55E" />,},
    { id: 12, name: "Learning", icon: <FaGraduationCap size={30} color="#2563EB" />,},
    { id: 13, name: "Swimming", icon: <FaSwimmer size={30} color="#06B6D4" /> },
    { id: 14, name: "Music", icon: <FaMusic size={30} color="#A78BFA" /> },
    { id: 15, name: "Stretching", icon: <FaRunning size={30} color="#EF4444" />,},
  ];

  const handleClick = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };
 
  const [customHabits, setCustomHabits] = useState([{ title: "", time: "" }]);
  const addNewHabit = () => {
    setCustomHabits([...customHabits, { title: "", time: "" }]);
  };
  const handleChange = (index, field, value) => {
    const updated = [...customHabits];
    updated[index][field] = value;
    setCustomHabits(updated);
  };

  return (
    <div className="flex bg-black justify-center pt-9 min-h-screen border-white text-white">
      <div className="gap-4 grid grid-cols-3 w-fit pt-[2%] pb-[2%] pl-[2%] pr-[2%]">
        {habits.map((habit) => {
          const isSelected = selected.includes(habit.id);
          return (
            <div
              key={habit.id}
              onClick={() => handleClick(habit.id)}
              className={`flex flex-col items-center justify-center shadow-[0_0_10px_rgba(59,130,246,0.5)] h-[80px] w-[140px] rounded-2xl cursor-pointer transition-all duration-0
                ${isSelected ? "border-2 border-blue-95000" : "bg-black"}`}
            >
              {habit.icon}
              <span>{habit.name}</span>
            </div>
          );
        })}

        <div className="col-span-3 space-y-3">
          {customHabits.map((habit, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                placeholder="Habit (e.g. Wake up)"
                value={habit.title}
                onChange={(e) => handleChange(index, "title", e.target.value)}
                className="w-1/2 bg-black text-white shadow-[0_0_10px_rgba(59,130,246,0.5)] px-2 py-2 rounded-md"
              />

              <input
                type="time"
                value={habit.time}
                onChange={(e) => handleChange(index, "time", e.target.value)}
                className="w-1/2 bg-black text-white shadow-[0_0_10px_rgba(59,130,246,0.5)] px-2 py-2 rounded-md"
              />
            </div>
          ))}

          <button onClick={addNewHabit} className="text-blue-400 mt-2">
            + Add Custom Habit
          </button>
        </div>

        <div className="col-span-3 flex gap-10 justify-center mt-4">
          <button className="text-xl shadow-[0_0_10px_rgba(168,85,247,0.5)] px-8 py-4 rounded-xl">
            cancel
          </button>
          <button
            onClick={() => {
              const data = {
                selected,
                custom: customHabits.filter((h) => h.title !== ""),
              };
              localStorage.setItem("habits", JSON.stringify(data));
              setSelectedHabits(data);
              setPage("hero");
            }}
            className="text-xl shadow-[0_0_10px_rgba(100,100,200,0.5)] px-8 py-4 rounded-xl"
          >
            add habits
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddHabits;
