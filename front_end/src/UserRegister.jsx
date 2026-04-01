function UserRegister({ show, setShow }) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="shadow-[0_0_8px_rgba(255,255,255,0.6)] bg-[rgba(255,255,255,0.6)]  w-full max-w-md p-6 rounded-2xl">
        <h2 className="text-2xl text-black font-bold text-center mb-2">
          Welcome 👋
        </h2>

        <p className="text-center text-gray-500 mb-5">Create your account</p>

        <form action="" className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            className="shadow-[0_0_10px_rgba(168,85,247,0.3)] border-none text-white w-full border p-3 rounded-lg mb-3 bg-black"
          />

          <input
            type="email"
            placeholder="Email"
            className="shadow-[0_0_10px_rgba(168,85,247,0.3)] border-none text-white w-full border p-3 rounded-lg mb-3 bg-black"
          />

          <input
            type="password"
            placeholder="Password"
            className="shadow-[0_0_10px_rgba(168,85,247,0.3)] border-none text-white w-full border p-3 rounded-lg mb-3 bg-black"
          />

          <button
            className="w-full bg-blue-950 text-white font-bold  py-3 rounded-lg"
            onClick={() => setShow(false)}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserRegister;
