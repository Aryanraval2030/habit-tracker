import React from "react";

function Routine({ selectedHabits = { selected: [], custom: [] } }) {
  const allHabits = [
    { id: 1, title: "Exercise" },
    { id: 2, title: "Meditation" },
    { id: 3, title: "Reading" },
    { id: 4, title: "Writing" },
    { id: 5, title: "Yoga" },
    { id: 6, title: "Cooking" },
    { id: 7, title: "Walking" },
    { id: 8, title: "Drawing" },
    { id: 9, title: "Coding" },
    { id: 10, title: "Cleaning" },
    { id: 11, title: "Gardening" },
    { id: 12, title: "Learning" },
    { id: 13, title: "Swimming" },
    { id: 14, title: "Music" },
    { id: 15, title: "Stretching" },
  ];

  const selectedList = allHabits.filter((h) =>
    selectedHabits.selected.includes(h.id),
  );

  const customList = selectedHabits.custom;

  return (
    <div>
      <p className="mt-3 mb-3 text-purple-400 text-2xl pl-2">
        Daily Habit Tracking
      </p>

      {[...selectedList, ...customList].length === 0 ? (
        <p className="text-white pl-2">No habits selected</p>
      ) : (
        <>
          {/* DEFAULT HABITS */}
          {selectedList.map((habit) => (
            <div
              key={habit.id}
              className="relative flex gap-[10px] pl-2 pt-1 text-[20px]"
            >
              <p>{habit.title}</p>
              <input
                type="checkbox"
                className="w-5 h-5 accent-green-500 cursor-pointer"
              />
              <button className="absolute right-3 text-[13px]">🚫</button>
            </div>
          ))}

          {/* CUSTOM HABITS */}
          {customList.map((habit, index) => (
            <div key={index} className="pl-2 text-[20px]">
              <p>
                {habit.title} {habit.time && `(${habit.time})`}
              </p>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default Routine;
