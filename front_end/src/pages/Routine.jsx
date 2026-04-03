import React from "react";

function Routine() {
  const habits = [
    // {
    //   id: 1,
    //   title: "Take a bus and go to the institute",
    //   time: "9:00 AM",
    //   done: false,
    // },
    // { id: 2, title: "Attend the lecture", time: "10:00 AM", done: false },
    // { id: 3, title: "Leave the lecture", time: "11:00 AM", done: false },
    // {
    //   id: 4,
    //   title: "Open the system for coding practice",
    //   time: "11:20 AM",
    //   done: false,
    // },
    // { id: 5, title: "Start Node.js practice", time: "11:21 AM", done: false },
    // { id: 6, title: "Take a bus and go home", time: "2:00 PM", done: false },
    // { id: 7, title: "Come home", time: "3:00 PM", done: false },
    // { id: 8, title: "Lunch time", time: "3:30 PM", done: false },
    // { id: 9, title: "Listen to music", time: "3:45 PM", done: false },
    // { id: 10, title: "Start React.js practice", time: "4:00 PM", done: false },
    // {
    //   id: 11,
    //   title: "Start Core JavaScript practice",
    //   time: "5:00 PM",
    //   done: false,
    // },
    // { id: 12, title: "Read a book", time: "6:00 PM", done: false },
    // { id: 13, title: "Sit without phone", time: "7:00 PM", done: false },
    // {
    //   id: 14,
    //   title: "Write and learn 30 new English words",
    //   time: "7:10 PM",
    //   done: false,
    // },
    // {
    //   id: 15,
    //   title: "Listen to a podcast for learning English",
    //   time: "8:00 PM",
    //   done: false,
    // },
    // { id: 16, title: "Dinner time", time: "8:30 PM", done: false },
    // {
    //   id: 17,
    //   title: "Revision of today's coding topics",
    //   time: "9:00 PM",
    //   done: false,
    // },
    // { id: 18, title: "Turn off my phone", time: "9:30 PM", done: false },
    // { id: 19, title: "Go to bed", time: "10:00 PM", done: false },
    { id: "1", title: "Exercise" },
    { id: "2", title: "Meditation" },
    { id: "3", title: "Reading" },
    { id: "4", title: "Writing" },
    { id: "5", title: "Yoga" },
    { id: "6", title: "Cooking" },
    { id: "7", title: "Walking" },
  ];
  return (
    <div>
      <p className="mt-3 mb-3 text-purple-400 text-2xl pl-2">
        Daily Habit Tracking
      </p>

      {habits.map((habit) => (
        <div
          key={habit.id}
          className="relative flex gap-[10px] pl-2 pt-1 text-[20px]"
        >
          <p>{habit.title}</p>
          {/* <p>{habit.time}</p> */}
          <input
            type="checkbox"
            className="w-5 h-5 accent-green-500 cursor-pointer"
          />
          <button className="absolute right-3 text-[13px]">🚫</button>
        </div>
      ))}
    </div>
  );
}

export default Routine;
