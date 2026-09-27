export async function sendSms(phone: string, message: string) {
  const res = await fetch("https://api.semaphore.co/api/v4/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      apikey: process.env.SEMAPHORE_API_KEY,
      number: phone,
      message: message,
    }),
  });

  const data = await res.json();
  return data;
}