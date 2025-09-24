
"use client";
import { useState } from "react";
export default function Search() {
  const [q, setQ] = useState("");
  const [data, setData] = useState<any>(null);
  async function doSearch() {
    const r = await fetch("/api/search/ai", { method: "POST", body: JSON.stringify({ q }) });
    setData(await r.json());
  }
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold">AI Search</h2>
      <input className="border p-2 w-full" placeholder="e.g., NEC bonding for pool pump" value={q} onChange={e=>setQ(e.target.value)} />
      <button onClick={doSearch} className="bg-black text-white px-4 py-2 rounded">Search</button>
      {data?.summary && <div className="border p-3 rounded"><h3 className="font-semibold">Summary</h3><p>{data.summary}</p></div>}
      {data?.answers && <div className="space-y-2">{data.answers.map((a:any)=>(<pre key={a.id} className="p-2 bg-gray-100 overflow-x-auto">{a.body_md}</pre>))}</div>}
    </div>
  );
}
