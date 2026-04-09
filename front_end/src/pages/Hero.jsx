import React, { useEffect } from "react";
import Routine from "./Routine";

function Hero({ selectedHabits = { selected: [], custom: [] }, setSelectedHabits, setPage, completedHabits, setCompletedHabits, habitHistory = {}, setHabitHistory }) {
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

const habits = allHabits.filter((h) =>
  selectedHabits.selected.includes(h.id)
);

  const totalHabitsCount = selectedHabits.selected.length + selectedHabits.custom.length;
  const validCompletedDefault = completedHabits?.default?.filter(id => selectedHabits.selected.includes(id)).length || 0;
  // Just validating custom against array bounds since they don't have unique IDs
  const validCompletedCustom = completedHabits?.custom?.filter(idx => idx < selectedHabits.custom.length).length || 0;
  const completedCount = validCompletedDefault + validCompletedCustom;
  const successRate = totalHabitsCount > 0 ? Math.round((completedCount / totalHabitsCount) * 100) : 0;

  useEffect(() => {
    if (!setHabitHistory) return;
    const today = new Date().toDateString();
    setHabitHistory(prev => {
      const current = prev[today] || { total: 0, completed: 0 };
      if (current.total === totalHabitsCount && current.completed === completedCount) {
        return prev;
      }
      return {
        ...prev,
        [today]: { total: totalHabitsCount, completed: completedCount }
      };
    });
  }, [totalHabitsCount, completedCount, setHabitHistory]);

  const getWeekDates = () => {
    const curr = new Date();
    const day = curr.getDay(); // 0 = Sun, 1 = Mon, etc.
    const diffToMonday = day === 0 ? -6 : 1 - day;
    
    const monday = new Date(curr);
    monday.setDate(curr.getDate() + diffToMonday);
    
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const nextDate = new Date(monday);
      nextDate.setDate(monday.getDate() + i);
      dates.push(nextDate);
    }
    return dates;
  };

  const weekDates = getWeekDates();

  const calculateStreaks = () => {
    if (!habitHistory || Object.keys(habitHistory).length === 0) return { current: 0, best: 0 };
    
    // Sort all available dates in history
    const dates = Object.keys(habitHistory)
      .map(d => new Date(d))
      .sort((a, b) => a - b);
      
    if (dates.length === 0) return { current: 0, best: 0 };
    
    const firstDate = dates[0];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let best = 0;
    let current_iterating_streak = 0;
    let current = 0;
    
    let tempDate = new Date(firstDate);
    tempDate.setHours(0, 0, 0, 0);
    
    while (tempDate <= today) {
      const dateStr = tempDate.toDateString();
      const historyDay = habitHistory[dateStr];
      // Define a day as 'completed' if at least 1 habit was completed
      const isCompleted = historyDay && historyDay.completed > 0;
      
      if (isCompleted) {
        current_iterating_streak++;
        if (current_iterating_streak > best) best = current_iterating_streak;
      } else {
        // If it's today and not completed yet, we don't break the streak from yesterday.
        // We just haven't added to it yet.
        const isToday = tempDate.getTime() === today.getTime();
        if (!isToday) {
          current_iterating_streak = 0;
        }
      }
      
      if (tempDate.getTime() === today.getTime()) {
        current = current_iterating_streak;
      }
      
      tempDate.setDate(tempDate.getDate() + 1);
    }
    
    return { current, best };
  };

  const { current: currentStreak, best: bestStreak } = calculateStreaks();

  const getActivityHeatmap = () => {
    const days = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 29; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const dateStr = d.toDateString();
      const historyDay = habitHistory[dateStr];
      
      let colorClass = "bg-white"; 
      if (historyDay && historyDay.total > 0) {
        const ratio = historyDay.completed / historyDay.total;
        if (ratio > 0.66) colorClass = "bg-blue-500";
        else if (ratio > 0.33) colorClass = "bg-blue-800";
        else if (ratio > 0) colorClass = "bg-blue-950";
      }
      
      days.push({ id: i, dateStr, colorClass });
    }
    return days;
  };

  const activityDays = getActivityHeatmap();

  return (
    <div className="border-2 border-black bg-black text-white h-screen grid grid-cols-[1fr_2fr_1fr] gap-3 p-3 overflow-hidden">
      {/* LEFT */}
      <div className="flex h-[96vh] flex-col gap-3">
        <div className="shadow-[0_0_10px_rgba(168,85,247,0.3)] rounded-2xl p-3 flex-1">
          {/* Analytics */}
          <h2 className="text-2xl mb-3 text-purple-400">📊 Today Analytics</h2>
          <p>Total Habits : {totalHabitsCount}</p>
          <p>Completed Today Habits : {completedCount}</p>
          <p>Success Rate: {successRate}%</p>
          <p className="mt-3 text-purple-400">
            🔥 Keep going! You’re doing great
          </p>{" "}
        </div>
        <div className="shadow-[0_0_10px_rgba(168,85,247,0.3)] rounded-2xl p-3 flex-1">
          {/* History */}
          <p className="text-2xl mb-2 text-purple-400">Weekly History</p>
          <div className="flex flex-col gap-1.5 overflow-y-auto max-h-[85%] pr-2">
            {weekDates.map((date, i) => {
              const dateStr = date.toDateString();
              const formattedDate = date.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
              const historyData = habitHistory[dateStr] || { total: 0, completed: 0 };
              
              let emoji = "";
              if (historyData.total > 0) {
                const perc = historyData.completed / historyData.total;
                if (perc === 1) emoji = "✨";
                else if (perc >= 0.5) emoji = "👍";
                else emoji = "😐";
              }

              return (
                <div key={i} className="flex justify-between items-center bg-[#111] px-2 py-1.5 rounded-md">
                  <span>{formattedDate}</span>
                  <span className="text-gray-300">
                    {historyData.completed} / {historyData.total} <span className="ml-1 w-5 inline-block text-center">{emoji}</span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
       
      </div>

      {/* CENTER */}
      <div className="flex flex-col h-[96vh] gap-3 ">
        <div className="flex-1 shadow-[0_0_10px_rgba(168,85,247,0.3)] rounded-2xl ">
          <div className="items-end pr-7 h-[12%] flex justify-end gap-3">
            <p className="text-[16px] text-[#757575]">less</p>
            <div className="w-[17px] h-[17px] rounded-sm bg-blue-950"></div>
            <div className="w-[17px] h-[17px] rounded-sm bg-blue-800"></div>
            <div className="w-[17px] h-[17px] rounded-sm bg-blue-500"></div>
            <p className="text-[16px] text-[#757575]">more</p>
          </div>
          <div className="h-[30%] flex flex-col  items-center">
            <p className="text-5xl mt-5">🔥</p>
            <h1 className="text-xl mt-3">activity</h1>
          </div>
          <div className="h-[55%]  px-2 flex gap-2 justify-center flex-wrap pt-7">
            {activityDays.map(day => (
              <div 
                key={day.id} 
                title={day.dateStr} 
                className={`${day.colorClass} rounded-md h-[36px] w-[36px] transition-colors cursor-pointer hover:scale-105`}
              ></div>
            ))}
          </div>
        </div>
        <div className="shadow-[0_0_10px_rgba(168,85,247,0.3)] rounded-2xl flex-1 overflow-y-auto min-h-0 pt-1 pb-1">
          <Routine 
            selectedHabits={selectedHabits} 
            setSelectedHabits={setSelectedHabits} 
            setPage={setPage} 
            completedHabits={completedHabits}
            setCompletedHabits={setCompletedHabits}
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex flex-col h-[96vh] gap-3">
        <div className="shadow-[0_0_10px_rgba(168,85,247,0.3)] rounded-2xl p-3 flex-1">
          <p className="text-2xl mb-3 text-purple-400">Streak</p>

          <p>🔥 Current Streak: {currentStreak} {currentStreak === 1 ? 'day' : 'days'}</p>
          <p>🏆 Best Streak: {bestStreak} {bestStreak === 1 ? 'day' : 'days'}</p>
        </div>
        <div className="shadow-[0_0_10px_rgba(168,85,247,0.3)] rounded-2xl p-3 flex-1">
          {/* Analytics */}
          <p className="text-2xl mb-3 text-purple-400">📅 Weekly Progress</p>

          <div className="space-y-2">
            {weekDates.map((date, i) => {
              const dateStr = date.toDateString();
              const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
              
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              
              const isFuture = date.getTime() > today.getTime();
              const isToday = date.getTime() === today.getTime();
              
              let icon = "⏳";
              
              if (!isFuture) {
                const historyDay = habitHistory[dateStr];
                const isCompleted = historyDay && historyDay.completed > 0;
                
                if (isCompleted) {
                  icon = "✅";
                } else if (isToday) {
                  icon = "⏳";
                } else {
                  icon = "❌";
                }
              }

              return (
                <div key={i} className="flex justify-between bg-white/5 px-2 py-1 rounded-md">
                  <span>{dayName}</span>
                  <span>{icon}</span>
                </div>
              );
            })}
          </div>
        </div>
        {/* <div className="shadow-[0_0_10px_rgba(168,85,247,0.3)] rounded-2xl p-3 flex-1">
          <p className="text-2xl mb-3 text-purple-400">Frequency</p>
          <p>Daily: 15 habits </p>
          <p>Weekly: 3 habits </p>
          <p>Custom: 1 habit</p>
        </div> */}
      </div>
    </div>
  );
}

export default Hero;