"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function NavLinks() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setLoggedIn(!!data.session);
    });
  }, []);

  return (
    <div className="flex gap-3 items-center">
      {loggedIn ? (
        <>
          <Link
            href="/dashboard"
            className="text-sm font-medium text-blue-600 hover:underline"
          >
            Dashboard
          </Link>
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              window.location.reload();
            }}
            className="text-sm font-medium text-gray-500 hover:underline"
          >
            Log Out
          </button>
        </>
      ) : (
        <Link
          href="/login"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          Clinic Login
        </Link>
      )}
      <Link
        href="/add-pet"
        className="text-sm font-medium bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-700 transition"
      >
        + Add Pet
      </Link>
    </div>
  );
}