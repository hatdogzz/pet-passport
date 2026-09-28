"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSignup() {
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setError(error.message);
    else alert("Signed up! Now log in.");
  }

  async function handleLogin() {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    else router.push("/dashboard");
  }

  return (
  <main className="min-h-screen flex items-center justify-center bg-orange-50 px-4">
    <div className="bg-white shadow-sm rounded-3xl p-8 w-full max-w-sm">
      <p className="text-lg font-bold text-orange-900 mb-4">🐾 PetPass</p>
      <h1 className="text-xl font-bold text-gray-800 mb-1">Clinic Login</h1>
      <p className="text-sm text-gray-500 mb-6">Sign in to manage pet records</p>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border border-gray-300 rounded-lg p-2 mb-3 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border border-gray-300 rounded-lg p-2 mb-4 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
      />

      <div className="flex gap-2">
        <button
          onClick={handleLogin}
          className="flex-1 bg-orange-500 text-white text-sm font-medium py-2 rounded-full hover:bg-orange-600 transition"
        >
          Log In
        </button>
        <button
          onClick={handleSignup}
          className="flex-1 bg-orange-100 text-orange-800 text-sm font-medium py-2 rounded-full hover:bg-orange-200 transition"
        >
          Sign Up
        </button>
      </div>

      {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
    </div>
  </main>
);
}