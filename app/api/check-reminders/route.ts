import { supabase } from "@/lib/supabase";
import { sendSms } from "@/lib/sendSms";
import { NextResponse } from "next/server";

export async function GET() {
  const today = new Date();
  const threeDaysFromNow = new Date();
  threeDaysFromNow.setDate(today.getDate() + 3);

  const todayStr = today.toISOString().split("T")[0];
  const futureStr = threeDaysFromNow.toISOString().split("T")[0];

  const { data: dueRecords, error } = await supabase
    .from("vaccine_records")
    .select("*, pets(name, owner_id, owners(name, phone))")
    .gte("next_due_date", todayStr)
    .lte("next_due_date", futureStr);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const results = [];

  for (const record of dueRecords) {
    const ownerPhone = record.pets?.owners?.phone;
    const ownerName = record.pets?.owners?.name;
    const petName = record.pets?.name;

    if (ownerPhone) {
      const smsResult = await sendSms(
        ownerPhone,
        `Hi ${ownerName}, reminder: ${petName}'s ${record.vaccine_type} is due on ${record.next_due_date}.`
      );
      results.push(smsResult);
    }
  }

  return NextResponse.json({ found: dueRecords.length, results });
}