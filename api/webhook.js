// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     return res.status(200).send("OK");
//   }

//   res.status(200).send("received");

//   try {
//     const data = req.body;

//   await fetch("https://script.google.com/macros/s/AKfycbzhhth6P-qR-_1DPidjdmx9MvKGvcAHReu3mdD5vm7Pe-mx8HybdeGbxrGQeOzz6VIj/exec", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(data)
//     });
//   } catch (err) {
//     console.error(err);
//   }
// }


export const config = {
  api: {
    bodyParser: true, // đảm bảo Next/Vercel parse JSON body
  },
};

export default async function handler(req, res) {
  // Zalo OA sẽ chỉ gửi POST
  if (req.method !== "POST") {
    return res.status(200).send("OK");
  }

  try {
    // --- B1: Nhận payload từ ZOA ---
    const data = req.body;

    // log để debug trên vercel logs
    console.log("📥 ZOA webhook received:", JSON.stringify(data));

    // --- B2: Forward sang Google Apps Script ---
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbzhhth6P-qR-_1DPidjdmx9MvKGvcAHReu3mdD5vm7Pe-mx8HybdeGbxrGQeOzz6VIj/exec",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    const resultText = await response.text();

    console.log("📤 Apps Script response:", resultText);

    // --- B3: Trả OK ngay cho Zalo OA ---
    return res.status(200).send("received");
  } catch (error) {
    console.error("❌ Error handling webhook:", error);
    return res.status(500).send("error");
  }
}
