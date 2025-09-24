
"use client";
import { useState } from "react";
export default function Ask() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [msg, setMsg] = useState("");
  async function submit() {
    const r = await fetch("/api/questions", { method: "POST", body: JSON.stringify({ title, body_md: body }) });
    const j = await r.json();
    setMsg(r.ok ? `Created question ${j.id}` : `Error: ${j.error || "unknown"}`);
  }
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold">Ask a question</h2>
      <input className="border p-2 w-full" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
      <textarea className="border p-2 w-full h-40" placeholder="Details" value={body} onChange={e=>setBody(e.target.value)} />
      <button onClick={submit} className="bg-black text-white px-4 py-2 rounded">Post</button>
      {msg && <p className="text-sm text-gray-700">{msg}</p>}
    </div>
  );
}
