import { supabase } from "@/lib/supabase";
import PetQR from "@/app/pet-qr";

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
    return <p className="text-center mt-20 text-gray-500">Pet not found.</p>;
  }

  return (
    <main className="max-w-md mx-auto mt-10 px-4">
      <div className="bg-white shadow-md rounded-2xl p-6 text-center">
        <h1 className="text-2xl font-bold text-gray-800">{pet.name}</h1>
        <p className="text-gray-500 mb-4">Pet Passport</p>

        <div className="flex justify-center mb-4">
          <PetQR url={`http://localhost:3000/pet/${pet.id}`} />
        </div>

        <div className="text-left text-sm text-gray-700 space-y-1 mb-6">
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
                <tr className="border-b border-gray-300 text-gray-600">
                  <th className="py-2">Type</th>
                  <th className="py-2">Given</th>
                  <th className="py-2">Next Due</th>
                  <th className="py-2">Weight</th>
                </tr>
              </thead>
              <tbody>
                {records.map((r) => (
                  <tr key={r.id} className="border-b border-gray-100">
                    <td className="py-2">{r.vaccine_type}</td>
                    <td className="py-2">{r.date_given}</td>
                    <td className="py-2">{r.next_due_date}</td>
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
    </main>
  );
}