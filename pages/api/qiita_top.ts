import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const qiitaRes = await fetch("https://qiita.com/api/v2/items?sort=created&per_page=4&query=user:nagi-0106", {
        headers: {
          Authorization: `Bearer ${process.env.QIITA_API_KEY}`,
        },
      });

      if (!qiitaRes.ok) {
        return res.status(qiitaRes.status).json({ error: "Qiita API error" });
      }
      const data = await qiitaRes.json();
      return res.status(200).json({ data });
    } catch (error) {
      console.error("Qiita fetch error:", error);
      return res.status(500).json({ error: "failed to load data" });
    }
  } else {
    return res.status(405).json({ error: "method not allowed" });
  }
}
