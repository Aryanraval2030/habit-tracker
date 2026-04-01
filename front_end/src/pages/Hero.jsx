import React from "react";

function Hero() {
  const habits = [
    {
      id: 1,
      title: "Take a bus and go to the institute",
      time: "9:00 AM",
      done: false,
    },
    { id: 2, title: "Attend the lecture", time: "10:00 AM", done: false },
    { id: 3, title: "Leave the lecture", time: "11:00 AM", done: false },
    {
      id: 4,
      title: "Open the system for coding practice",
      time: "11:20 AM",
      done: false,
    },
    { id: 5, title: "Start Node.js practice", time: "11:21 AM", done: false },
    { id: 6, title: "Take a bus and go home", time: "2:00 PM", done: false },
    { id: 7, title: "Come home", time: "3:00 PM", done: false },
    { id: 8, title: "Lunch time", time: "3:30 PM", done: false },
    { id: 9, title: "Listen to music", time: "3:45 PM", done: false },
    { id: 10, title: "Start React.js practice", time: "4:00 PM", done: false },
    {
      id: 11,
      title: "Start Core JavaScript practice",
      time: "5:00 PM",
      done: false,
    },
    { id: 12, title: "Read a book", time: "6:00 PM", done: false },
    { id: 13, title: "Sit without phone", time: "7:00 PM", done: false },
    {
      id: 14,
      title: "Write and learn 30 new English words",
      time: "7:10 PM",
      done: false,
    },
    {
      id: 15,
      title: "Listen to a podcast for learning English",
      time: "8:00 PM",
      done: false,
    },
    { id: 16, title: "Dinner time", time: "8:30 PM", done: false },
    {
      id: 17,
      title: "Revision of today's coding topics",
      time: "9:00 PM",
      done: false,
    },
    { id: 18, title: "Turn off my phone", time: "9:30 PM", done: false },
    { id: 19, title: "Go to bed", time: "10:00 PM", done: false },
  ];
  return (
    <div className="border-2 border-black bg-black text-white h-screen grid grid-cols-[1fr_2fr_1fr] gap-3 p-3 overflow-hidden">
      {/* LEFT */}
      <div className="flex h-[96vh] flex-col gap-3">
        <div className="shadow-[0_0_10px_rgba(168,85,247,0.3)] rounded-2xl p-3 flex-1">
          {/* Analytics */}
          <h2 className="text-2xl mb-3 text-purple-400">📊 Analytics</h2>
          <p>Total Habits : 10</p>
          <p>Completed Today Habits : 8</p>
          <p>Success Rate: 42%</p>
          <p className="mt-3 text-purple-400">
            🔥 Keep going! You’re doing great
          </p>{" "}
        </div>
        <div className="shadow-[0_0_10px_rgba(168,85,247,0.3)] rounded-2xl p-3 flex-1">
          {/* History */}
          <p className="text-2xl mb-2 text-purple-400">weekly History</p>
          <div className="flex justify-between">
            <span>30 Mar</span>
            <span>12 / 19 </span>
          </div>
          <div className="flex justify-between">
            <span>29 Mar</span>
            <span>12 / 19 😐</span>
          </div>
          <div className="flex justify-between">
            <span>28 Mar</span>
            <span>12 / 19 </span>
          </div>
          <div className="flex justify-between">
            <span>27 Mar</span>
            <span>12 / 19 😐</span>
          </div>
          <div className="flex justify-between">
            <span>26 Mar</span>
            <span>12 / 19 </span>
          </div>
          <div className="flex justify-between">
            <span>25 Mar</span>
            <span>12 / 19 😐</span>
          </div>{" "}
        </div>
        <div className="shadow-[0_0_10px_rgba(168,85,247,0.3)] rounded-2xl p-3 flex-1">
          {/* Extra */}
          <p className="text-2xl mb-3 text-purple-400">💡 Tip of the day:</p>
          <p> Stay consistent, not perfect</p>
        </div>
      </div>

      {/* CENTER */}
      <div className="flex flex-col h-[96vh] gap-3 ">
        <div className="flex-1 shadow-[0_0_10px_rgba(168,85,247,0.3)] rounded-2xl ">
          <div className="h-[40%] flex flex-col  items-center">
            <p className="text-5xl mt-5">🔥</p>
            <h1 className="text-xl mt-4">activity</h1>
          </div>
          <div className="h-[60%] pl-[25px] pr-[5px] flex gap-2 justify-start flex-wrap pt-8">
            <div className="bg-white rounded-md h-[39px] w-[39px]"></div>
            <div className="bg-white rounded-md h-[39px] w-[39px]"></div>
            <div className="bg-white rounded-md h-[39px] w-[39px]"></div>
            <div className="bg-white rounded-md h-[39px] w-[39px]"></div>
            <div className="bg-white rounded-md h-[39px] w-[39px]"></div>
            <div className="bg-white rounded-md h-[39px] w-[39px]"></div>
            <div className="bg-white rounded-md h-[39px] w-[39px]"></div>
            <div className="bg-white rounded-md h-[39px] w-[39px]"></div>
            <div className="bg-white rounded-md h-[39px] w-[39px]"></div>
            <div className="bg-white rounded-md h-[39px] w-[39px]"></div>
            <div className="bg-white rounded-md h-[39px] w-[39px]"></div>
            <div className="bg-white rounded-md h-[39px] w-[39px]"></div>
            <div className="bg-white rounded-md h-[39px] w-[39px]"></div>
            <div className="bg-white rounded-md h-[39px] w-[39px]"></div>
            <div className="bg-white rounded-md h-[39px] w-[39px]"></div>
            <div className="bg-white rounded-md h-[39px] w-[39px]"></div>
            <div className="bg-white rounded-md h-[39px] w-[39px]"></div>
            <div className="bg-white rounded-md h-[39px] w-[39px]"></div>
            <div className="bg-white rounded-md h-[39px] w-[39px]"></div>
            <div className="bg-white rounded-md h-[39px] w-[39px]"></div>
            <div className="bg-white rounded-md h-[39px] w-[39px]"></div>
            <div className="bg-white rounded-md h-[39px] w-[39px]"></div>
            <div className="bg-white rounded-md h-[39px] w-[39px]"></div>
            <div className="bg-white rounded-md h-[39px] w-[39px]"></div>
            <div className="bg-white rounded-md h-[39px] w-[39px]"></div>
            <div className="bg-white rounded-md h-[39px] w-[39px]"></div>
            <div className="bg-white rounded-md h-[39px] w-[39px]"></div>
            <div className="bg-white rounded-md h-[39px] w-[39px]"></div>
            <div className="bg-white rounded-md h-[39px] w-[39px]"></div>
            <div className="bg-white rounded-md h-[39px] w-[39px]"></div>
          </div>
        </div>
        <div className="shadow-[0_0_10px_rgba(168,85,247,0.3)] rounded-2xl flex-1 overflow-y-auto min-h-0 pt-1 pb-1">
          <p className="mt-3 mb-3 text-purple-400 text-2xl pl-2">
            Daily Habit Tracking
          </p>

          {habits.map((habit) => (
            <div
              key={habit.id}
              className="flex gap-[10px] pl-2 pt-1 text-[20px]"
            >
              <p>{habit.title}</p>
              <p>{habit.time}</p>
              <input
                type="checkbox"
                className="w-5 h-5 accent-green-500 cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex flex-col h-[96vh] gap-3">
        <div className="shadow-[0_0_10px_rgba(168,85,247,0.3)] rounded-2xl p-3 flex-1">
          <p className="text-2xl mb-3 text-purple-400">
            Monthly Streak deatails
          </p>

          <p>🔥 Current Streak: 2 days</p>
          <p>🏆 Best Streak: 6 days</p>
        </div>
        <div className="shadow-[0_0_10px_rgba(168,85,247,0.3)] rounded-2xl p-3 flex-1">
          {/* Analytics */}
            <p className="text-2xl mb-3 text-purple-400">📅 Weekly Progress</p>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Mon</span>
                <span>✅</span>
              </div>

              <div className="flex justify-between">
                <span>Tue</span>
                <span>❌</span>
              </div>

              <div className="flex justify-between">
                <span>Wed</span>
                <span>✅</span>
              </div>

              <div className="flex justify-between">
                <span>Thu</span>
                <span>✅</span>
              </div>

              <div className="flex justify-between">
                <span>Fri</span>
                <span>❌</span>
              </div>

              <div className="flex justify-between">
                <span>Sat</span>
                <span>⏳</span>
              </div>

              <div className="flex justify-between">
                <span>Sun</span>
                <span>⏳</span>
              </div>
            </div>
        </div>
        <div className="shadow-[0_0_10px_rgba(168,85,247,0.3)] rounded-2xl p-3 flex-1">
          <p className="text-2xl mb-3 text-purple-400">Frequency</p>
          <p>Daily: 15 habits </p>
          <p>Weekly: 3 habits </p>
          <p>Custom: 1 habit</p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
