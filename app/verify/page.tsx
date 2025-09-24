"use client";
import { useState } from "react";

export default function Verify() {
  const [trade, setTrade] = useState("electric");
  const [state, setState] = useState("");
  const [license, setLicense] = useState("");
  const [msg, setMsg] = useState("");

  async function submit() {
    setMsg("");
    try {
      const r = await fetch("/api/verify/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          trade,
          state,
          license_number: license,
        }),
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) {
        setMsg(`Error: ${j.error || r.statusText}`);
        return;
      }
      setMsg("✅ Submitted. Admin will review.");
    } catch (e: any) {
      setMsg(`Error: ${e?.message || "network"}`);
    }
  }

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold">Submit your license</h2>

      <label className="block">
        Trade:
        <select
          className="border p-2 ml-2"
          value={trade}
          onChange={(e) => setTrade(e.target.value)}
        >
          <option value="electric">Electric</option>
          <option value="plumbing">Plumbing</option>
          <option value="hvac">HVAC</option>
          <option value="gc">General Contractor</option>
        </select>
      </label>

      <input
        className="border p-2 w-full"
        placeholder="State (e.g. FL)"
        value={state}
        onChange={(e) => setState(e.target.value)}
      />

      <input
        className="border p-2 w-full"
        placeholder="License number"
        value={license}
        onChange={(e) => setLicense(e.target.value)}
      />

      <button
        onClick={submit}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Submit
      </button>

      {msg && <p>{msg}</p>}
    </div>
  );
}

