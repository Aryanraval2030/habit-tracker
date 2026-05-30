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
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="shadow-[0_0_8px_rgba(255,255,255,0.6)] bg-[rgba(255,255,255,0.6)] w-full max-w-md p-6 rounded-2xl">
        <h2 className="text-2xl text-black font-bold text-center mb-2">
          Welcome to habit-tracker
        </h2>

        <p className="text-center text-gray-800 mb-5 font-medium">
          {isLogin ? "Login to your account" : "Create your account"}
        </p>

        <form
          autoComplete="off"
          onSubmit={handleChange}
          className="flex flex-col gap-4"
        >
          {!isLogin && (
            <input
              type="text"
              placeholder="Name"
              onChange={inputData}
              name="name"
              autoComplete="off"
              value={userForm.name}
              className="shadow-[0_0_10px_rgba(168,85,247,0.3)] border-none text-white w-full border p-3 rounded-lg mb-3 bg-black"
            />
          )}

          <input
            type="password"
            placeholder="Password"
            onChange={inputData}
            autoComplete="new-password"
            name="password"
            value={userForm.password}
            className="shadow-[0_0_10px_rgba(168,85,247,0.3)] border-none text-white w-full border p-3 rounded-lg mb-3 bg-black"
          />

          <button
            className="w-full bg-blue-950 text-white font-bold py-3 rounded-lg hover:bg-blue-900 transition-colors"
            type="submit"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p className="text-center text-black mt-4 font-medium">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-900 font-bold hover:underline"
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default UserRegister;
