import React, { useState } from "react";
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

function AddHabits() {
  const [selected, setSelected] = useState([]); // store selected habit ids

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

  // toggle habit selection
  const handleClick = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  };

  return (
    <div className="flex justify-center pt-9 bg-black h-screen text-white">
      <div className="h-[70vh] gap-4 grid grid-cols-3 w-fit pt-[2%] pb-[2%] pl-[2%] pr-[2%]">
        {habits.map((habit) => {
          const isSelected = selected.includes(habit.id);
          return (
            <div
              key={habit.id}
              onClick={() => handleClick(habit.id)}
              className={`flex flex-col items-center justify-center shadow-[0_0_10px_rgba(59,130,246,0.5)] h-[80px] w-[140px] rounded-2xl cursor-pointer transition-all duration-200
                ${isSelected ? "border-2 border-blue-95000" : "bg-black"}`}
            >
              {habit.icon}
              <span>{habit.name}</span>
            </div>
          );
        })}
        <div className="col-span-3 flex gap-10 justify-center mt-4">
          <button className="text-xl shadow-[0_0_10px_rgba(168,85,247,0.5)] px-8 py-4 rounded-xl">
            cancel
          </button>
          <button className="text-xl shadow-[0_0_10px_rgba(168,85,247,0.5)] px-8 py-4 rounded-xl">
            add habits
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddHabits;
