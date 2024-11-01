"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import logo from "././../img/logo.png"
import Image from "next/image";
import Link from "next/link";
function Home() {
  const [language, setLanguage] = useState("nl");
  const handleLanguageChange = () => {
    setLanguage(language === "nl" ? "en" : "nl");
  };
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch('http://127.0.0.1:8000/auth/token/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem('token', data.auth_token);
      router.push('/default');  // Redirect user after login
    } else {
      alert('Invalid credentials');
    }
  };
  return (
    <div className="backgroundHomeImage">
      <div className="p-4">
        <div className="min-h-screen flex flex-col items-center justify-center">
          {/* Logo Section */}
          <div
            style={{ marginBottom: "2em" }}
            className="h-1/4 flex items-center justify-center"
          >
            <Image src={logo} width={256} height={84} alt="logo" />
          </div>
          <form onSubmit={handleLogin}>
            {/* Form Section */}
            <div
              style={{ maxWidth: "19rem", maxHeight: "18em" }}
              className="border border-gray-300 p-8 w-full shadow-lg"
            >
              {/* Username */}
              <div className="mb-4">
                <label htmlFor="username" className="block text-white-700 mb-2">
                  {language === "nl"
                    ? "Gebruikersnaam of e-mailadres"
                    : "Username or Email Address"}
                </label>
                <input
                  type="text"
                  id="username"
                  className="w-full px-3 text-black py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              {/* Password */}
              <div className="mb-4">
                <label htmlFor="password" className="block text-black-700 mb-2">
                  {language === "nl" ? "Wachtwoord" : "Password"}
                </label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  id="password"
                  className="w-full px-3 text-black py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <label className="inline-flex items-center">
                    <input type="checkbox" className="form-checkbox" />
                    <span className="ml-2">
                      {language === "nl" ? "Onthoud mij" : "Remember me"}
                    </span>
                  </label>
                </div>

                {/* Login Button */}

                <button type="submit"

                  className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
                >
                  {language === "nl" ? "Inloggen" : "Login"}
                </button>

              </div>
            </div>
          </form>
          <div className="text-sm mt-3 text-white-600 flex justify-between">
            <a
              href="#"
              style={{ marginRight: "0.5em" }}
              className="hover:underline"
            >
              {language === "nl" ? "Registreren" : "Register"}
            </a>
            |
            <a
              href="#"
              style={{ marginLeft: "0.5em" }}
              className="hover:underline"
            >
              {language === "nl" ? "Wachtwoord vergeten" : "Forgot password"}
            </a>
          </div>
          {/* Back link */}
          <div className="mt-4 text-sm ">
            <a href="#" className="text-white-600 hover:underline">
              {language === "nl"
                ? "← Ga naar Marina Tides"
                : "← Go to Marina Tides"}
            </a>
          </div>

          {/* Language switch */}
          <div className="mt-4">
            <button
              onClick={handleLanguageChange}
              className="text-sm text-blue-600 hover:underline"
            >
              {language === "nl" ? "Switch to English" : "Naar Nederlands"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
