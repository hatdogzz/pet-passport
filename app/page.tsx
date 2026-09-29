import { supabase } from "@/lib/supabase";
import Link from "next/link";
import NavLinks from "@/app/nav-links";

export default async function Home() {
  const { data: pets, error } = await supabase.from("pets").select("*");
  const { count: ownerCount } = await supabase
    .from("owners")
    .select("*", { count: "exact", head: true });
  const { count: recordCount } = await supabase
    .from("vaccine_records")
    .select("*", { count: "exact", head: true });

  return (
    <main className="min-h-screen bg-orange-50 px-4 py-10">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-orange-900 flex items-center gap-2">
            🐾 <span>PetPass</span>
          </h1>
          <NavLinks />
        </div>

    <div className="flex gap-3 mb-8">
      <div className="bg-white rounded-2xl shadow-sm px-4 py-3 flex-1 text-center">
        <p className="text-xl font-bold text-orange-600">{pets?.length ?? 0}</p>
        <p className="text-xs text-gray-500">Pets</p>
      </div>
      <div className="bg-white rounded-2xl shadow-sm px-4 py-3 flex-1 text-center">
        <p className="text-xl font-bold text-orange-600">{ownerCount ?? 0}</p>
        <p className="text-xs text-gray-500">Owners</p>
      </div>
      <div className="bg-white rounded-2xl shadow-sm px-4 py-3 flex-1 text-center">
        <p className="text-xl font-bold text-orange-600">{recordCount ?? 0}</p>
        <p className="text-xs text-gray-500">Records</p>
      </div>
    </div>
        

        {error && <p className="text-red-500 text-sm">Error: {error.message}</p>}

        <div className="bg-white rounded-3xl shadow-sm divide-y divide-orange-100 overflow-hidden">
          {pets && pets.length > 0 ? (
            pets.map((pet) => (
              <Link
                key={pet.id}
                href={`/pet/${pet.id}`}
                className="flex items-center gap-4 p-4 hover:bg-orange-50 transition"
              >
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-xl">
                  {pet.species?.toLowerCase() === "cat" ? "🐱" : "🐶"}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{pet.name}</p>
                  <p className="text-sm text-gray-500">
                    {pet.species} • {pet.breed}
                  </p>
                </div>
                <span className="text-orange-400 text-sm">View →</span>
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