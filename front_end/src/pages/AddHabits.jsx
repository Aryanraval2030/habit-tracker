import React from "react";

function AddHabits() {
  const habits = [];
  for (let i = 1; i <= 15; i++) {
    habits.push({ d: i });
  }
  return (
    <div className="flex justify-center pt-9 bg-black h-screen text-white">
      <div className="h-[70vh] gap-4 grid grid-cols-3 w-fit pt-[2%] pb-[2%] pl-[2%] pr-[2%]">
        {habits.map((habit) => (
          <div
            key={habit.id}
            className="shadow-[0_0_10px_rgba(59,130,246,0.5)] h-[80px] w-[140px] rounded-2xl"
          ></div>
        ))}
        <div className="col-span-3 flex gap-10 justify-center">
          <button className="text-xl shadow-[0_0_10px_rgba(168,85,247,0.5)] px-8 py-4 rounded-xl">
            cancel
          </button>
          <button className="text-xl shadow-[0_0_10px_rgba(168,85,247,0.5)] px-8 py-4 rounded-xl">
            add habits
          </button>
        </div>
        {/* <div className="col-span-3 flex justify-center"></div> */}
      </div>
    </div>
  );
}

export default AddHabits;
