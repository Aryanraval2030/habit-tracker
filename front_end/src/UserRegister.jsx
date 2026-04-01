function UserRegister({ show, setShow }) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-center mb-2">Welcome 👋</h2>

        <p className="text-center text-gray-500 mb-5">Create your account</p>

        <input
          type="text"
          placeholder="Name"
          className="w-full border p-3 rounded-lg mb-3"
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded-lg mb-3"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-lg mb-4"
        />

        <button
          className="w-full bg-blue-500 text-white py-3 rounded-lg"
          onClick={() => setShow(false)}
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default UserRegister;
