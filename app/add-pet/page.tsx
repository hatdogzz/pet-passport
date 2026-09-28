"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";


export default function AddPet() {
  const [ownerName, setOwnerName] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");

  const [petName, setPetName] = useState("");
  const [species, setSpecies] = useState("");
  const [breed, setBreed] = useState("");
  const [birthdate, setBirthdate] = useState("");

  const [message, setMessage] = useState("");

  async function handleAddPet() {
    

    // Step 1: create the owner first
    const { data: owner, error: ownerError } = await supabase
      .from("owners")
      .insert({ name: ownerName, phone: ownerPhone, email: ownerEmail })
      .select()
      .single();
    // ...rest stays the same

    if (ownerError || !owner) {
      setMessage("Error creating owner: " + ownerError?.message);
      return;
    }

    // Step 2: create the pet, linked to that owner's id
    const { error: petError } = await supabase.from("pets").insert({
      owner_id: owner.id,
      name: petName,
      species,
      breed,
      birthdate,
    });

    if (petError) {
      setMessage("Error creating pet: " + petError.message);
      return;
    }

    setMessage(`Success! ${petName} was added under owner ${ownerName}.`);
    setOwnerName("");
    setOwnerPhone("");
    setOwnerEmail("");
    setPetName("");
    setSpecies("");
    setBreed("");
    setBirthdate("");
  }

  return (
    <main className="min-h-screen bg-orange-50 flex items-center justify-center px-4">
      <div className="bg-white shadow-md rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-xl font-bold text-gray-800 mb-1">Add New Pet</h1>
        <p className="text-sm text-gray-500 mb-6">Register an owner and their pet</p>

        <h2 className="text-sm font-semibold text-gray-700 mb-2">Owner Info</h2>
        <div className="space-y-3 mb-5">
          <input
            placeholder="Owner Name"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <input
            placeholder="Phone (e.g. 09171234567)"
            value={ownerPhone}
            onChange={(e) => setOwnerPhone(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <input
            placeholder="Email"
            value={ownerEmail}
            onChange={(e) => setOwnerEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <h2 className="text-sm font-semibold text-gray-700 mb-2">Pet Info</h2>
        <div className="space-y-3">
          <input
            placeholder="Pet Name"
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <input
            placeholder="Species (e.g. Dog, Cat)"
            value={species}
            onChange={(e) => setSpecies(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <input
            placeholder="Breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <div>
            <label className="text-xs text-gray-500 mb-1 block">Birthdate</label>
            <input
              type="date"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 text-sm text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
        </div>

        <button
          onClick={handleAddPet}
          className="w-full mt-5 bg-orange-500 text-white text-sm font-medium py-2 rounded-lg hover:bg-orange-600 transition"
        >
          Add Pet
        </button>

        {message && (
          <p className="text-sm mt-4 text-center text-gray-700">{message}</p>
        )}
      </div>
    </main>
  );
}