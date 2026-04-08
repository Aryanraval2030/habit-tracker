import React from "react";

function Routine({ selectedHabits = { selected: [], custom: [] }, setSelectedHabits, setPage, completedHabits, setCompletedHabits }) {
  const toggleDefaultHabit = (id) => {
    setCompletedHabits(prev => {
      const defaultCompletions = prev.default || [];
      const isCompleted = defaultCompletions.includes(id);
      return {
        ...prev,
        default: isCompleted 
          ? defaultCompletions.filter(habitId => habitId !== id)
          : [...defaultCompletions, id]
      };
    });
  };

  const toggleCustomHabit = (index) => {
    setCompletedHabits(prev => {
      const customCompletions = prev.custom || [];
      const isCompleted = customCompletions.includes(index);
      return {
        ...prev,
        custom: isCompleted 
          ? customCompletions.filter(idx => idx !== index)
          : [...customCompletions, index]
      };
    });
  };

  const handleDeleteDefault = (id) => {
    const updatedSelected = selectedHabits.selected.filter(
      (habitId) => habitId !== id
    );
    const newHabits = { ...selectedHabits, selected: updatedSelected };
    setSelectedHabits(newHabits);
    localStorage.setItem("habits", JSON.stringify(newHabits));
  };

  const handleDeleteCustom = (indexToDelete) => {
    const updatedCustom = selectedHabits.custom.filter(
      (_, index) => index !== indexToDelete
    );
    const newHabits = { ...selectedHabits, custom: updatedCustom };
    setSelectedHabits(newHabits);
    localStorage.setItem("habits", JSON.stringify(newHabits));
  };
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
        <div className="flex flex-col items-center mt-10">
          <p className="text-white mb-4 text-lg">No habits selected</p>
          <button 
            onClick={() => setPage("addHabits")} 
            className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
          >
            + Add Habits
          </button>
        </div>
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
                className="w-5 h-5 accent-green-500 cursor-pointer mt-[2px]"
                onChange={() => toggleDefaultHabit(habit.id)}
                checked={completedHabits?.default?.includes(habit.id) || false}
              />
              <button onClick={() => handleDeleteDefault(habit.id)} className="absolute right-3 text-[13px]">🚫</button>
            </div>
          ))}

          {/* CUSTOM HABITS */}
          {customList.map((habit, index) => (
            <div key={index} className="relative flex gap-[10px] pl-2 pt-1 text-[20px]">
              <p>
                {habit.title} {habit.time && `(${habit.time})`}
              </p>
              <input
                type="checkbox"
                className="w-5 h-5 accent-green-500 cursor-pointer mt-[2px]"
                onChange={() => toggleCustomHabit(index)}
                checked={completedHabits?.custom?.includes(index) || false}
              />
              <button onClick={() => handleDeleteCustom(index)} className="absolute right-3 text-[13px]">🚫</button>
            </div>
          ))}
          
          <div className="flex justify-center mt-6 mb-4">
            <button 
              onClick={() => setPage("addHabits")} 
              className="text-purple-400 hover:text-purple-300 border border-purple-500 hover:bg-purple-900/30 px-4 py-1.5 rounded-lg transition-colors text-sm"
            >
              + Add More Habits
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Routine;
