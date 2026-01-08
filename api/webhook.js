export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(200).send("OK");
  }

  res.status(200).send("received");

  try {
    const data = req.body;

  await fetch("https://script.google.com/macros/s/AKfycbxn5Gv0OgTshXZVifztdz5uEloVO7rfhn2TyyGAU8xPXMXa8Wj_Llt_OmQR43Iq7mkm/exec", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
  } catch (err) {
    console.error(err);
  }
}
