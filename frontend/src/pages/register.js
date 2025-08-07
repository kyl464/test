import { getSession, signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    getSession().then((session) => {
      if (session) window.location.href = "/home";
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ambil langsung dari state (bukan dari e.target[0])
    try {
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, confirmPassword }),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.error || "Registrasi gagal");
      } else {
        alert("Registrasi berhasil!");
        window.location.href = "/login";
      }
    } catch (err) {
      alert("Terjadi kesalahan jaringan");
      console.error(err);
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-[#F8F3D9] rounded-tl-[70px] rounded-r-lg"
      style={{
        background:
          "linear-gradient(to right, #514D3E 0%, #514D3E 30%, #F8F3D9 80%, #F8F3D9 100%)",
      }}
    >
      {/* Header */}
      <header className="bg-[#514D3E] py-12 p-6  text-indigo-50 rounded-br-[90px]">
        <div className="max-w-screen-xl mx-auto flex justify-between items-center">
          <div className="bg-white px-4 py-6 rounded font-bold">
            LOGO WEBSITE
          </div>
          <h1 className="text-4xl mt-14 font-bold">Sign Up</h1>
        </div>
        <h1 className="max-w-screen-xl pt-10 mx-auto mt-2 text-2xl">
          Find your perfect stay — join us now!
        </h1>
      </header>

      {/* Form */}
      <main className="flex-grow flex bg-[#F8F3D9] rounded-tl-[90px] items-center justify-center px-4">
        <div className="p-10 rounded-lg w-full max-w-xl ">
          {/* Google Sign In */}
          <button
            onClick={() => signIn("google")}
            className="w-full flex items-center justify-center space-x-2 border border-gray-400 rounded-full py-2 mb-6 hover:bg-gray-100 transition"
          >
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google"
              className="h-5"
            />
            <span className="text-gray-700 font-medium">
              Continue with Google
            </span>
          </button>

          {/* Divider */}
          <div className="flex items-center mb-6">
            <hr className="flex-grow border-gray-400" />
            <span className="px-2 text-gray-500">OR</span>
            <hr className="flex-grow border-gray-400" />
          </div>

          {/* Email/Password */}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              className="w-full px-4 py-2 mb-4 bg-[#EBE5C2] border border-gray-400 rounded-full focus:outline-none text-gray-700 placeholder-gray-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="text"
              placeholder="Email"
              className="w-full px-4 py-2 mb-4 bg-[#EBE5C2] border border-gray-400 rounded-full focus:outline-none text-gray-700 placeholder-gray-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full px-4 py-2 bg-[#EBE5C2] border border-gray-400 rounded-full focus:outline-none text-gray-700 placeholder-gray-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                <div
                  className={`transition-transform duration-300 ${
                    showPassword ? "rotate-180" : ""
                  }`}
                >
                  {showPassword ? (
                    // Eye Off SVG
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        d="M2 2L22 22"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6.71277 6.7226C3.66479 8.79527 2 12 2 12C2 12 5.63636 19 12 19C14.0503 19 15.8174 18.2734 17.2711 17.2884M11 5.05822C11.3254 5.02013 11.6588 5 12 5C18.3636 5 22 12 22 12C22 12 21.3082 13.3317 20 14.8335"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M14 14.2362C13.4692 14.7112 12.7684 15.0001 12 15.0001C10.3431 15.0001 9 13.657 9 12.0001C9 11.1764 9.33193 10.4303 9.86932 9.88818"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    // Eye Open SVG
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </div>
              </button>
            </div>
            <div className="relative mb-6">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="w-full px-4 py-2 bg-[#EBE5C2] border border-gray-400 rounded-full focus:outline-none text-gray-700 placeholder-gray-500"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                <div
                  className={`transition-transform duration-300 ${
                    showConfirmPassword ? "rotate-180" : ""
                  }`}
                >
                  {showConfirmPassword ? (
                    // Eye Off SVG
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        d="M2 2L22 22"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6.71277 6.7226C3.66479 8.79527 2 12 2 12C2 12 5.63636 19 12 19C14.0503 19 15.8174 18.2734 17.2711 17.2884M11 5.05822C11.3254 5.02013 11.6588 5 12 5C18.3636 5 22 12 22 12C22 12 21.3082 13.3317 20 14.8335"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M14 14.2362C13.4692 14.7112 12.7684 15.0001 12 15.0001C10.3431 15.0001 9 13.657 9 12.0001C9 11.1764 9.33193 10.4303 9.86932 9.88818"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    // Eye Open SVG
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </div>
              </button>
            </div>

            <button
              type="submit"
              className="w-full bg-[#514D3E] text-white py-2 rounded-full font-semibold hover:opacity-90 transition"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-4 text-center text-gray-500 text-sm">
            Don&apos;t have an account?{" "}
            <Link
              href="/login"
              className="text-[#514D3E] font-semibold hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
