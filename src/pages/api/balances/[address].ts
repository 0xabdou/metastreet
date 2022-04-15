import { NextApiHandler } from "next";

const API_KEY = process.env.COVALENT_API_KEY as string;

const handler: NextApiHandler = async (req, res) => {
  // Supports only GET requests
  if (req.method != "GET") {
    return res.status(400).json({ error: `Unsupported method: ${req.method}` });
  }
  // Construct Covalent API request URL
  const address = req.query.address;
  const url = `https://api.covalenthq.com/v1/1/address/${address}/balances_v2/`;
  const params = new URLSearchParams();
  params.append("nft", "true");
  params.append("key", API_KEY);
  // Call Covalent API
  const response = await fetch(`${url}?${params.toString()}`);
  // Throw if Covalent failed
  if (response.status != 200) {
    const error = await response.text();
    console.log("COVALENT ERROR: ", error);
    return res.status(500).json({ error: "Covalent API failed" });
  }
  // Get data from Covalent response
  const json = await response.json();
  const items = json.data.items as any[];
  let collections = items
    .filter((item) => item.type == "nft")
    .filter((item) => item.nft_data && item.nft_data.length);
  // return collection to the caller
  res.status(200).json({ collections });
};

export default handler;
