export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(200).send("OK");
  }

  res.status(200).send("received");

  try {
    const data = req.body;

  await fetch("https://script.google.com/macros/s/AKfycbzhhth6P-qR-_1DPidjdmx9MvKGvcAHReu3mdD5vm7Pe-mx8HybdeGbxrGQeOzz6VIj/exec", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
  } catch (err) {
    console.error(err);
  }
}
