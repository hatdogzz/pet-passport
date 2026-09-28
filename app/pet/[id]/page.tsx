import { supabase } from "@/lib/supabase";
import PetQR from "@/app/pet-qr";
import Link from "next/link";

export default async function PetProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id: petId } = await params;

  const { data: pet, error: petError } = await supabase
    .from("pets")
    .select("*")
    .eq("id", petId)
    .single();

  const { data: records } = await supabase
    .from("vaccine_records")
    .select("*")
    .eq("pet_id", petId)
    .order("date_given", { ascending: false });

  if (petError || !pet) {
    return (
      <main className="min-h-screen bg-orange-50 flex items-center justify-center">
        <p className="text-gray-500">Pet not found.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-orange-50 px-4 py-10">
      <div className="max-w-md mx-auto">
        <Link href="/" className="text-lg font-bold text-orange-900 mb-6 block">
          🐾 PetPass
        </Link>

        <div className="bg-white shadow-sm rounded-3xl p-6 text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-orange-100 flex items-center justify-center text-3xl mb-3">
            {pet.species?.toLowerCase() === "cat" ? "🐱" : "🐶"}
          </div>
          <h1 className="text-2xl font-bold text-gray-800">{pet.name}</h1>
          <p className="text-orange-500 text-sm mb-4">Pet Passport</p>

          <div className="flex justify-center mb-5">
            <PetQR petId={pet.id} />
          </div>

          <div className="text-left text-sm text-gray-700 space-y-1 mb-6 bg-orange-50 rounded-2xl p-4">
            <p><span className="font-semibold">Species:</span> {pet.species}</p>
            <p><span className="font-semibold">Breed:</span> {pet.breed}</p>
            <p><span className="font-semibold">Birthdate:</span> {pet.birthdate}</p>
          </div>

          <h2 className="text-left font-semibold text-gray-800 mb-2">
            Vaccine & Health Records
          </h2>

          {records && records.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="border-b border-orange-200 text-orange-800">
                    <th className="py-2 pr-2">Type</th>
                    <th className="py-2 pr-2">Given</th>
                    <th className="py-2 pr-2">Next Due</th>
                    <th className="py-2">Weight</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((r) => (
                    <tr key={r.id} className="border-b border-orange-100 text-gray-800">
                      <td className="py-2 pr-2">{r.vaccine_type}</td>
                      <td className="py-2 pr-2">{r.date_given}</td>
                      <td className="py-2 pr-2">{r.next_due_date}</td>
                      <td className="py-2">{r.weight_kg} kg</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-400 text-sm">No records yet.</p>
          )}
        </div>
      </div>
    </main>
  );
}