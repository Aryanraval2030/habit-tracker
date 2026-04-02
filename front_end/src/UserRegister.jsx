import { useState } from "react";

function UserRegister({ setPage }) {
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
    if (
      userForm.name === "" ||
      userForm.email === "" ||
      userForm.password === ""
    ) {
      return alert("fill all details");
    }

    try {
      const res = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(userForm),
      });
      const data = await res.text();
      if (res.status === 400) {
        alert("user already exists");
        setPage("addHabits");
      } else {
        console.log("register successfully");
        localStorage.setItem("isLoggedIn", "true");
        setPage("addHabits");
      }
      console.log(data);
    } catch (error) {
      console.log("error:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="shadow-[0_0_8px_rgba(255,255,255,0.6)] bg-[rgba(255,255,255,0.6)]  w-full max-w-md p-6 rounded-2xl">
        <h2 className="text-2xl text-black font-bold text-center mb-2">
          Welcome to habit-tracker
        </h2>

        <p className="text-center text-gray-500 mb-5">Create your account</p>

        <form
          autoComplete="off"
          onSubmit={handleChange}
          className="flex flex-col gap-4"
        >
          <input
            type="text"
            placeholder="Name"
            onChange={inputData}
            name="name"
            autoComplete="off"
            value={userForm.name}
            className="shadow-[0_0_10px_rgba(168,85,247,0.3)] border-none text-white w-full border p-3 rounded-lg mb-3 bg-black"
          />

          <input
            type="email"
            placeholder="Email"
            onChange={inputData}
            name="email"
            autoComplete="off"
            value={userForm.email}
            className="shadow-[0_0_10px_rgba(168,85,247,0.3)] border-none text-white w-full border p-3 rounded-lg mb-3 bg-black"
          />

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
            className="w-full bg-blue-950 text-white font-bold  py-3 rounded-lg"
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserRegister;
