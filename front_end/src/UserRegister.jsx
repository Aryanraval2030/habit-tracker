import { useState } from "react";
import { API_URL } from "./App";

function UserRegister({
  setPage,
  setSelectedHabits,
  setCompletedHabits,
  setHabitHistory,
}) {
  const [isLogin, setIsLogin] = useState(false);
  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const inputData = (e) => {
    const { name, value } = e.target;
    setUserForm((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  const handleChange = async (e) => {
    e.preventDefault();
    if (!isLogin && userForm.name === "") {
      return alert("Enter name");
    }

    if (userForm.password === "") {
      return alert("Enter password");
    }

    if (userForm.password.length < 8) {
      return alert("Password must be at least 8 characters");
    }

    try {
      const endpoint = isLogin ? "/login" : "/register";
      const res = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(userForm),
      });

      if (!res.ok) {
        const errorText = await res.text();
        return alert(errorText || "Authentication failed");
      }

      const responseData = await res.json();
      if (responseData.token) {
        localStorage.setItem("token", responseData.token);
      }

      console.log(isLogin ? "login successfully" : "register successfully");

      const meRes = await fetch(`${API_URL}/me`, {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (meRes.ok) {
        const userData = await meRes.json();
        if (setSelectedHabits)
          setSelectedHabits(
            userData.selectedHabits || { selected: [], custom: [] },
          );
        if (setCompletedHabits)
          setCompletedHabits(
            userData.completedHabits || {
              date: new Date().toDateString(),
              default: [],
              custom: [],
            },
          );
        if (setHabitHistory) setHabitHistory(userData.habitHistory || {});

        if (
          userData.selectedHabits &&
          (userData.selectedHabits.selected?.length > 0 ||
            userData.selectedHabits.custom?.length > 0)
        ) {
          setPage("hero");
        } else {
          setPage("addHabits");
        }
      } else {
        setPage("addHabits");
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 relative overflow-hidden">
      {/* background glow */}
      <div className="absolute top-[-120px] left-[-120px] w-[300px] h-[300px] bg-blue-600/20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-[-120px] right-[-120px] w-[300px] h-[300px] bg-purple-600/20 blur-3xl rounded-full"></div>

      {/* card */}
      <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_0_40px_rgba(59,130,246,0.15)] p-8">
        {/* top badge */}
        <div className="flex justify-center mb-5">
          <div className="px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium">
            Habit Tracker
          </div>
        </div>

        {/* heading */}
        <h1 className="text-4xl font-bold text-center text-white mb-2">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h1>

        <p className="text-center text-gray-400 mb-8">
          {isLogin
            ? "Login and continue your habit journey"
            : "Start building better habits today"}
        </p>

        {/* form */}
        <form autoComplete="off" onSubmit={handleChange} className="space-y-5">
          {!isLogin && (
            <div>
              <label className="text-sm text-gray-300 mb-2 block">
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter your name"
                onChange={inputData}
                name="name"
                value={userForm.name}
                className="w-full bg-[#111827] border border-[#1f2937] focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300 text-white rounded-xl px-4 py-3"
              />
            </div>
          )}

          <div>
            <label className="text-sm text-gray-300 mb-2 block">Password</label>

            <input
              type="password"
              placeholder="Enter password"
              onChange={inputData}
              name="password"
              value={userForm.password}
              className="w-full bg-[#111827] border border-[#1f2937] focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all duration-300 text-white rounded-xl px-4 py-3"
            />

            <p className="text-xs text-gray-500 mt-2">Minimum 8 characters</p>
          </div>

          {/* button */}
          <button
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(59,130,246,0.4)] transition-all duration-300 text-white font-semibold py-3 rounded-xl"
            type="submit"
          >
            {isLogin ? "Login" : "Create Account"}
          </button>
        </form>

        {/* footer */}
        <div className="mt-7 text-center">
          <p className="text-gray-400">
            {isLogin ? "Don't have an account?" : "Already have an account?"}

            <button
              onClick={() => setIsLogin(!isLogin)}
              className="ml-2 text-blue-400 hover:text-blue-300 font-semibold transition-colors"
            >
              {isLogin ? "Register" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default UserRegister;
