import { useState } from "react";
import {
  FaDumbbell,
  FaBook,
  FaPenFancy,
  FaRunning,
  FaLeaf,
  FaUtensils,
  FaWalking,
  FaPaintBrush,
  FaLaptopCode,
  FaBroom,
  FaSeedling,
  FaGraduationCap,
  FaSwimmer,
  FaMusic,
  FaChild,
} from "react-icons/fa";

function AddHabits({ setPage, setSelectedHabits, selectedHabits }) {
  const fallbackSelected = selectedHabits?.selected || [];
  const [selected, setSelected] = useState(fallbackSelected);
  
  const habits = [
    { id: 1, name: "Exercise", icon: <FaDumbbell size={30} color="#F43F5E" /> },
    { id: 2, name: "Meditation", icon: <FaChild size={30} color="#10B981" /> },
    { id: 3, name: "Reading", icon: <FaBook size={30} color="#3B82F6" /> },
    { id: 4, name: "Writing", icon: <FaPenFancy size={30} color="#8B5CF6" /> },
    { id: 5, name: "Yoga", icon: <FaLeaf size={30} color="#14B8A6" /> },
    { id: 6, name: "Cooking", icon: <FaUtensils size={30} color="#F97316" /> },
    { id: 7, name: "Walking", icon: <FaWalking size={30} color="#6366F1" /> },
    {
      id: 8,
      name: "Drawing",
      icon: <FaPaintBrush size={30} color="#EC4899" />,
    },
    { id: 9, name: "Coding", icon: <FaLaptopCode size={30} color="#0EA5E9" /> },
    { id: 10, name: "Cleaning", icon: <FaBroom size={30} color="#F59E0B" /> },
    {
      id: 11,
      name: "Gardening",
      icon: <FaSeedling size={30} color="#22C55E" />,
    },
    {
      id: 12,
      name: "Learning",
      icon: <FaGraduationCap size={30} color="#2563EB" />,
    },
    { id: 13, name: "Swimming", icon: <FaSwimmer size={30} color="#06B6D4" /> },
    { id: 14, name: "Music", icon: <FaMusic size={30} color="#A78BFA" /> },
    {
      id: 15,
      name: "Stretching",
      icon: <FaRunning size={30} color="#EF4444" />,
    },
  ];

  const handleClick = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

  const fallbackCustom = selectedHabits?.custom?.length > 0 ? selectedHabits.custom : [{ title: "", time: "" }];
  const [customHabits, setCustomHabits] = useState(fallbackCustom);
  
  const addNewHabit = () => {
    setCustomHabits([...customHabits, { title: "", time: "" }]);
  };

  const handleChange = (index, field, value) => {
    const updated = [...customHabits];
    updated[index][field] = value;
    setCustomHabits(updated);
  };

  return (
    <div className="flex bg-black justify-center pt-10 min-h-screen text-white px-4 pb-10">
      <div className="flex flex-col gap-6 w-full max-w-4xl">
        
        <div className="text-center mb-4">
           <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
             Choose Your Habits
           </h1>
           <p className="text-gray-400 mt-2 text-lg">Select the habits you want to track daily.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {habits.map((habit) => {
            const isSelected = selected.includes(habit.id);
            return (
              <div
                key={habit.id}
                onClick={() => handleClick(habit.id)}
                className={`flex flex-col items-center justify-center p-4 rounded-2xl cursor-pointer transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]
                  ${isSelected ? "border border-blue-500 bg-blue-900/20 shadow-[0_0_15px_rgba(59,130,246,0.3)]" : "bg-white/5 border border-transparent"}`}
              >
                <div className={`mb-2 transition-transform duration-300 ${isSelected ? "scale-110" : ""}`}>
                  {habit.icon}
                </div>
                <span className={`font-medium ${isSelected ? "text-white" : "text-gray-300"}`}>{habit.name}</span>
              </div>
            );
          })}
        </div>

        <div className="mt-8 bg-white/5 p-6 rounded-2xl border border-white/10">
          <h2 className="text-2xl font-bold mb-4 text-purple-400">Custom Habits</h2>
          
          <div className="space-y-4">
            {customHabits.map((habit, index) => (
              <div key={index} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Habit Name (e.g. Wake up early)"
                  value={habit.title}
                  onChange={(e) => handleChange(index, "title", e.target.value)}
                  className="flex-1 bg-black text-white border border-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 px-4 py-3 rounded-xl transition-all"
                />
                <input
                  type="time"
                  value={habit.time}
                  onChange={(e) => handleChange(index, "time", e.target.value)}
                  className="sm:w-48 bg-black text-white border border-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 px-4 py-3 rounded-xl transition-all"
                />
              </div>
            ))}
          </div>

          <button 
            onClick={addNewHabit} 
            className="text-blue-400 hover:text-blue-300 mt-4 flex items-center gap-2 font-medium transition-colors"
          >
            <span>+</span> Add Another Custom Habit
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <button 
            onClick={() => setPage("hero")}
            className="text-lg text-gray-300 hover:text-white border border-gray-700 hover:border-gray-500 hover:bg-white/5 px-8 py-4 rounded-xl transition-all font-medium"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              const data = {
                selected,
                custom: customHabits.filter((h) => h.title.trim() !== ""),
              };
              setSelectedHabits(data);
              setPage("hero");
            }}
            className="text-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white shadow-[0_0_15px_rgba(100,100,200,0.4)] hover:shadow-[0_0_20px_rgba(100,100,200,0.6)] px-10 py-4 rounded-xl transition-all font-bold transform hover:-translate-y-0.5"
          >
            Save Habits & Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddHabits;
