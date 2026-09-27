"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import NavLinks from "@/app/nav-links";

export default function Dashboard() {
  const [petId, setPetId] = useState("");
  const [vaccineType, setVaccineType] = useState("");
  const [dateGiven, setDateGiven] = useState("");
  const [nextDueDate, setNextDueDate] = useState("");
  const [weight, setWeight] = useState("");
  const [message, setMessage] = useState("");

  async function handleAddRecord() {
    const { error } = await supabase.from("vaccine_records").insert({
      pet_id: Number(petId),
      vaccine_type: vaccineType,
      date_given: dateGiven,
      next_due_date: nextDueDate,
      weight_kg: Number(weight),
    });

    if (error) {
      setMessage("Error: " + error.message);
    } else {
      setMessage("Record added successfully!");
      setPetId("");
      setVaccineType("");
      setDateGiven("");
      setNextDueDate("");
      setWeight("");
    }
  }

  return (
    <main className="min-h-screen bg-orange-50 px-4 py-10">
      <div className="max-w-md mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold text-orange-900">🐾 PetPass</h1>
          <NavLinks />
        </div>

        <div className="bg-white shadow-md rounded-2xl p-8 w-full">
          <h1 className="text-xl font-bold text-gray-800 mb-1">Clinic Dashboard</h1>
          <p className="text-sm text-gray-500 mb-6">Add a new vaccine record</p>

          <div className="space-y-3">
            <input
              placeholder="Pet ID"
              value={petId}
              onChange={(e) => setPetId(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

            <input
              placeholder="Vaccine Type (e.g. Anti-rabies)"
              value={vaccineType}
              onChange={(e) => setVaccineType(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
            />

            <div>
              <label className="text-xs text-gray-500 mb-1 block">Date Given</label>
              <input
                type="date"
                value={dateGiven}
                onChange={(e) => setDateGiven(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <div>
              <label className="text-xs text-gray-500 mb-1 block">Next Due Date</label>
              <input
                type="date"
                value={nextDueDate}
                onChange={(e) => setNextDueDate(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            <input
              placeholder="Weight (kg)"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <button
            onClick={handleAddRecord}
            className="w-full mt-5 bg-orange-500 text-white text-sm font-medium py-2 rounded-lg hover:bg-orange-600 transition"
          >
            Add Record
          </button>

          {message && (
            <p className="text-sm mt-4 text-center text-gray-700">{message}</p>
          )}
        </div>
      </div>
    </main>
  );
}