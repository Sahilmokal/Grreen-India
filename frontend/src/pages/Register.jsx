import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-green-100">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold mb-2 text-center">
          Join Green India 🌍
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Start your journey toward sustainability
        </p>

        <input className="w-full mb-3 p-3 border rounded-lg" placeholder="Name" />
        <input className="w-full mb-3 p-3 border rounded-lg" placeholder="Email" />
        <input className="w-full mb-6 p-3 border rounded-lg" placeholder="Password" />

        <button className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700">
          Create Account
        </button>

        <p className="text-sm text-center text-gray-500 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-primary-600 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
