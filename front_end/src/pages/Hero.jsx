import React from "react";
import Routine from "./Routine";

function Hero({ selectedHabits = { selected: [], custom: [] }, setSelectedHabits }) {
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
  return (
    <div className="border-2 border-black bg-black text-white h-screen grid grid-cols-[1fr_2fr_1fr] gap-3 p-3 overflow-hidden">
      {/* LEFT */}
      <div className="flex h-[96vh] flex-col gap-3">
        <div className="shadow-[0_0_10px_rgba(168,85,247,0.3)] rounded-2xl p-3 flex-1">
          {/* Analytics */}
          <h2 className="text-2xl mb-3 text-purple-400">📊 Today Analytics</h2>
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
            <div className="bg-white rounded-md h-[36px] w-[36px]"></div>
            <div className="bg-white rounded-md h-[36px] w-[36px]"></div>
            <div className="bg-white rounded-md h-[36px] w-[36px]"></div>
            <div className="bg-white rounded-md h-[36px] w-[36px]"></div>
            <div className="bg-white rounded-md h-[36px] w-[36px]"></div>
            <div className="bg-white rounded-md h-[36px] w-[36px]"></div>
            <div className="bg-white rounded-md h-[36px] w-[36px]"></div>
            <div className="bg-white rounded-md h-[36px] w-[36px]"></div>
            <div className="bg-white rounded-md h-[36px] w-[36px]"></div>
            <div className="bg-white rounded-md h-[36px] w-[36px]"></div>
            <div className="bg-white rounded-md h-[36px] w-[36px]"></div>
            <div className="bg-white rounded-md h-[36px] w-[36px]"></div>
            <div className="bg-white rounded-md h-[36px] w-[36px]"></div>
            <div className="bg-white rounded-md h-[36px] w-[36px]"></div>
            <div className="bg-white rounded-md h-[36px] w-[36px]"></div>
            <div className="bg-white rounded-md h-[36px] w-[36px]"></div>
            <div className="bg-white rounded-md h-[36px] w-[36px]"></div>
            <div className="bg-white rounded-md h-[36px] w-[36px]"></div>
            <div className="bg-white rounded-md h-[36px] w-[36px]"></div>
            <div className="bg-white rounded-md h-[36px] w-[36px]"></div>
            <div className="bg-white rounded-md h-[36px] w-[36px]"></div>
            <div className="bg-white rounded-md h-[36px] w-[36px]"></div>
            <div className="bg-white rounded-md h-[36px] w-[36px]"></div>
            <div className="bg-white rounded-md h-[36px] w-[36px]"></div>
            <div className="bg-white rounded-md h-[36px] w-[36px]"></div>
            <div className="bg-white rounded-md h-[36px] w-[36px]"></div>
            <div className="bg-white rounded-md h-[36px] w-[36px]"></div>
            <div className="bg-white rounded-md h-[36px] w-[36px]"></div>
            <div className="bg-white rounded-md h-[36px] w-[36px]"></div>
            <div className="bg-white rounded-md h-[36px] w-[36px]"></div>
          </div>
        </div>
        <div className="shadow-[0_0_10px_rgba(168,85,247,0.3)] rounded-2xl flex-1 overflow-y-auto min-h-0 pt-1 pb-1">
          <Routine selectedHabits={selectedHabits} setSelectedHabits={setSelectedHabits} />
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex flex-col h-[96vh] gap-3">
        <div className="shadow-[0_0_10px_rgba(168,85,247,0.3)] rounded-2xl p-3 flex-1">
          <p className="text-2xl mb-3 text-purple-400">Streak</p>

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