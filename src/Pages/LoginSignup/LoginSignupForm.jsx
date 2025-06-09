import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = "Email or phone is required.";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validate()) return;

  try {
    const response = await fetch("https://cervino-ceramix-backend-production.up.railway.app/api/admin/sign-in", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();

      // Assuming your backend returns a token like { token: "..." }
      if (data.token) {
        localStorage.setItem("adminToken", data.token);
        alert("Login successful!");
        console.log("Logged in data:", data);
        navigate("/admin/dashboard");
      } else {
        alert("Login successful but token missing in response.");
      }
    } else {
      const errorData = await response.json();
      alert(errorData.message || "Login failed. Please check your credentials.");
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("Network error. Please try again later.");
  }
};


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-50 px-4 py-10">
      <section className="flex flex-col md:flex-col lg:flex-row items-center justify-center h-screen max-w-full w-full max-h-screen overflow-auto rounded-xl">
        {/* Text Section */}
        <div className="w-full px-6 pt-6 md:pt-0 md:pb-10 lg:w-1/2 text-center lg:text-left space-y-2 max-w-md mx-auto">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight tracking-tight">
            Welcome Back to{" "}
            <span className="text-[var(--var-red-col)]">Cervino Ceramix</span>
          </h1>
          <p className="text-justify sm:text-md text-gray-600 max-w-md mx-auto lg:mx-0">
            Please login to continue and explore our product dashboard, manage bids,
            check inventory, and track orders seamlessly.
          </p>
        </div>

        {/* Login Form */}
        <div className="relative w-full lg:w-1/2 flex items-center justify-center px-6 pb-6 md:pb-10">
          <div className="bg-white shadow-2xl rounded-3xl p-4 w-full max-w-md border border-gray-200 z-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-[var(--var-red-col)] mb-6">
              Login to Your Account
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium mb-2">
                  Email or Phone
                </label>
                <input
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Enter email or phone"
                  className={`w-full px-5 py-3 border rounded-lg focus:outline-none transition ${
                    errors.username
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-[var(--var-red-col)] focus:border-[var(--var-red-col)]"
                  }`}
                  autoComplete="username"
                />
                {errors.username && (
                  <p className="mt-1 text-sm text-red-500">{errors.username}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className={`w-full px-5 py-3 border rounded-lg focus:outline-none transition ${
                    errors.password
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-[var(--var-red-col)] focus:border-[var(--var-red-col)]"
                  }`}
                  autoComplete="current-password"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                )}
              </div>

              <div className="text-sm text-right">
                <button
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                  className="text-[var(--var-red-col)] hover:underline focus:outline-none"
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-[var(--var-red-col)] hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition"
              >
                Login
              </button>
            </form>

            <p className="text-sm text-center mt-8 text-gray-600">
              Don’t have an account?{" "}
              <button
                onClick={() => navigate("/signup")}
                className="text-[var(--var-red-col)] font-medium hover:underline focus:outline-none"
              >
                Sign Up
              </button>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}