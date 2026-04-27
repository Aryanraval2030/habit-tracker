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
      const isCompleted = historyDay && historyDay.completed > 0;
      
      if (isCompleted) {
        current_iterating_streak++;
        if (current_iterating_streak > best) best = current_iterating_streak;
      } else {
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
      
      let colorClass = "bg-white/10"; 
      if (historyDay && historyDay.total > 0) {
        const ratio = historyDay.completed / historyDay.total;
        if (ratio > 0.66) colorClass = "bg-blue-500 shadow-[0_0_5px_rgba(59,130,246,0.5)]";
        else if (ratio > 0.33) colorClass = "bg-blue-800 shadow-[0_0_5px_rgba(30,64,175,0.5)]";
        else if (ratio > 0) colorClass = "bg-blue-950";
      }
      
      days.push({ id: i, dateStr, colorClass });
    }
    return days;
  };

  const activityDays = getActivityHeatmap();

  return (
    <div className="bg-black text-white min-h-screen flex flex-col lg:grid lg:grid-cols-[1fr_2fr_1fr] gap-4 p-4 lg:h-screen lg:overflow-hidden font-serif">
      {/* LEFT */}
      <div className="flex flex-col gap-4 lg:h-full overflow-hidden">
        <div className="shadow-[0_0_15px_rgba(168,85,247,0.2)] bg-black/40 border border-purple-500/20 backdrop-blur-md rounded-2xl p-5 flex-1 transition-transform hover:scale-[1.01]">
          {/* Analytics */}
          <h2 className="text-2xl mb-4 text-purple-400 font-bold">📊 Today Analytics</h2>
          <div className="space-y-3 text-lg">
            <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl">
              <span>Total Habits</span>
              <span className="font-bold text-xl">{totalHabitsCount}</span>
            </div>
            <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl">
              <span>Completed Today</span>
              <span className="font-bold text-xl text-green-400">{completedCount}</span>
            </div>
            <div className="flex justify-between items-center bg-white/5 p-3 rounded-xl">
              <span>Success Rate</span>
              <span className="font-bold text-xl text-blue-400">{successRate}%</span>
            </div>
          </div>
          <p className="mt-5 text-purple-400 font-medium italic text-center animate-pulse">
            🔥 Keep going! You’re doing great
          </p>
        </div>
        
        <div className="shadow-[0_0_15px_rgba(168,85,247,0.2)] bg-black/40 border border-purple-500/20 backdrop-blur-md rounded-2xl p-5 flex-1 lg:max-h-[50%] flex flex-col transition-transform hover:scale-[1.01]">
          {/* History */}
          <p className="text-2xl mb-4 text-purple-400 font-bold">📅 Weekly History</p>
          <div className="flex flex-col gap-2 overflow-y-auto pr-2 custom-scrollbar flex-1">
            {weekDates.map((date, i) => {
              const dateStr = date.toDateString();
              const formattedDate = date.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
              const historyData = habitHistory[dateStr] || { total: 0, completed: 0 };
              
              let emoji = "➖";
              if (historyData.total > 0) {
                const perc = historyData.completed / historyData.total;
                if (perc === 1) emoji = "✨";
                else if (perc >= 0.5) emoji = "👍";
                else emoji = "😐";
              }

              return (
                <div key={i} className="flex justify-between items-center bg-white/5 hover:bg-white/10 transition-colors px-3 py-2 rounded-lg">
                  <span className="font-medium">{formattedDate}</span>
                  <span className="text-gray-300 font-medium bg-black/50 px-3 py-1 rounded-full text-sm">
                    {historyData.completed} / {historyData.total} <span className="ml-2 w-5 inline-block text-center">{emoji}</span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CENTER */}
      <div className="flex flex-col gap-4 lg:h-full overflow-hidden order-first lg:order-none">
        <div className="shadow-[0_0_15px_rgba(59,130,246,0.2)] bg-black/40 border border-blue-500/20 backdrop-blur-md rounded-2xl p-5 flex-none transition-transform hover:scale-[1.01]">
          <div className="flex justify-end gap-3 mb-2 items-center text-xs text-gray-400">
            <p>less</p>
            <div className="w-4 h-4 rounded-sm bg-white/10"></div>
            <div className="w-4 h-4 rounded-sm bg-blue-950"></div>
            <div className="w-4 h-4 rounded-sm bg-blue-800"></div>
            <div className="w-4 h-4 rounded-sm bg-blue-500"></div>
            <p>more</p>
          </div>
          
          <div className="flex flex-col items-center mb-6">
            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mb-2 shadow-[0_0_15px_rgba(59,130,246,0.5)]">
              <span className="text-3xl">🔥</span>
            </div>
            <h1 className="text-2xl font-bold tracking-wider text-blue-100">ACTIVITY</h1>
          </div>
          
          <div className="flex gap-2.5 justify-center flex-wrap max-w-lg mx-auto">
            {activityDays.map(day => (
              <div 
                key={day.id} 
                title={day.dateStr} 
                className={`${day.colorClass} rounded-md h-[40px] w-[40px] sm:h-[45px] sm:w-[45px] transition-all cursor-pointer hover:scale-110 hover:-translate-y-1`}
              ></div>
            ))}
          </div>
        </div>
        
        <div className="shadow-[0_0_15px_rgba(34,197,94,0.2)] bg-black/40 border border-green-500/20 backdrop-blur-md rounded-2xl flex-1 overflow-y-auto p-5 transition-transform hover:scale-[1.01]">
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
      <div className="flex flex-col gap-4 lg:h-full overflow-hidden">
        <div className="shadow-[0_0_15px_rgba(234,179,8,0.2)] bg-black/40 border border-yellow-500/20 backdrop-blur-md rounded-2xl p-5 flex-1 transition-transform hover:scale-[1.01]">
          <p className="text-2xl mb-5 text-yellow-400 font-bold">🏆 Streak</p>

          <div className="space-y-4">
            <div className="bg-gradient-to-r from-orange-500/20 to-transparent p-4 rounded-xl border-l-4 border-orange-500">
              <p className="text-gray-300 text-sm uppercase tracking-wider mb-1">Current Streak</p>
              <p className="text-3xl font-bold flex items-center gap-2">
                🔥 {currentStreak} <span className="text-lg font-normal text-gray-400">{currentStreak === 1 ? 'day' : 'days'}</span>
              </p>
            </div>
            
            <div className="bg-gradient-to-r from-yellow-500/20 to-transparent p-4 rounded-xl border-l-4 border-yellow-500">
              <p className="text-gray-300 text-sm uppercase tracking-wider mb-1">Best Streak</p>
              <p className="text-3xl font-bold flex items-center gap-2">
                ⭐ {bestStreak} <span className="text-lg font-normal text-gray-400">{bestStreak === 1 ? 'day' : 'days'}</span>
              </p>
            </div>
          </div>
        </div>
        
        <div className="shadow-[0_0_15px_rgba(168,85,247,0.2)] bg-black/40 border border-purple-500/20 backdrop-blur-md rounded-2xl p-5 flex-1 lg:max-h-[50%] flex flex-col transition-transform hover:scale-[1.01]">
          <p className="text-2xl mb-4 text-purple-400 font-bold">🎯 Weekly Progress</p>

          <div className="space-y-2 flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {weekDates.map((date, i) => {
              const dateStr = date.toDateString();
              const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
              
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              
              const isFuture = date.getTime() > today.getTime();
              const isToday = date.getTime() === today.getTime();
              
              let icon = <span className="text-gray-500 animate-pulse">⏳</span>;
              let bgClass = "bg-white/5";
              
              if (!isFuture) {
                const historyDay = habitHistory[dateStr];
                const isCompleted = historyDay && historyDay.completed > 0;
                
                if (isCompleted) {
                  icon = <span>✅</span>;
                  bgClass = "bg-green-500/10 border border-green-500/30";
                } else if (isToday) {
                  icon = <span className="text-blue-400 animate-bounce block">👇</span>;
                  bgClass = "bg-blue-500/10 border border-blue-500/30";
                } else {
                  icon = <span>❌</span>;
                  bgClass = "bg-red-500/10 border border-red-500/30";
                }
              }

              return (
                <div key={i} className={`flex justify-between items-center px-4 py-3 rounded-xl transition-all ${bgClass}`}>
                  <span className={`font-medium ${isToday ? 'text-blue-400 font-bold' : ''}`}>{dayName}</span>
                  <div className="text-xl bg-black/40 w-10 h-10 rounded-full flex items-center justify-center shadow-inner">
                    {icon}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;