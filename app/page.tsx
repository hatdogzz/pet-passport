import { supabase } from "@/lib/supabase";
import Link from "next/link";
import NavLinks from "@/app/nav-links";

export default async function Home() {
  const { data: pets, error } = await supabase.from("pets").select("*");

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">🐾 Pet Passport</h1>
          <NavLinks />
        </div>

        {error && <p className="text-red-500 text-sm">Error: {error.message}</p>}

        <div className="bg-white rounded-2xl shadow-sm divide-y divide-gray-100">
          {pets && pets.length > 0 ? (
            pets.map((pet) => (
              <Link
                key={pet.id}
                href={`/pet/${pet.id}`}
                className="flex items-center justify-between p-4 hover:bg-gray-50 transition"
              >
                <div>
                  <p className="font-medium text-gray-800">{pet.name}</p>
                  <p className="text-sm text-gray-500">
                    {pet.species} • {pet.breed}
                  </p>
                </div>
                <span className="text-gray-400 text-sm">View →</span>
              </Link>
            ))
          ) : (
            <p className="p-4 text-sm text-gray-400">No pets registered yet.</p>
          )}
        </div>
      </div>
    </main>
  );
}