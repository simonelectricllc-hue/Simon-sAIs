
'use client';
import { useEffect, useState } from 'react';

type Row = { id: string; trade: string; state: string; license_number: string; status: string; created_at: string };

export default function Admin() {
  const [token, setToken] = useState<string>('');
  const [rows, setRows] = useState<Row[] | null>(null);
  const [msg, setMsg] = useState<string>('');

  async function load() {
    setMsg('');
    const r = await fetch('/api/admin/verify', { headers: { 'x-admin-token': token } });
    if (!r.ok) { setMsg('Unauthorized or error'); setRows(null); return; }
    const j = await r.json();
    setRows(j);
  }

  async function act(id: string, action: 'verify'|'reject') {
    setMsg('');
    const r = await fetch('/api/admin/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-token': token },
      body: JSON.stringify({ id, action }),
    });
    if (!r.ok) { setMsg('Action failed'); return; }
    setMsg(action === 'verify' ? 'Verified!' : 'Rejected.');
    await load();
  }

  useEffect(() => {
    const saved = localStorage.getItem('adminToken') || '';
    setToken(saved);
  }, []);

  function saveToken() {
    localStorage.setItem('adminToken', token);
    load();
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Admin – License Approvals</h2>
      <div className="flex items-center gap-2">
        <input className="border p-2 flex-1" placeholder="Enter ADMIN_TOKEN" value={token} onChange={e => setToken(e.target.value)} />
        <button onClick={saveToken} className="bg-black text-white px-3 py-2 rounded">Use Token</button>
      </div>
      {msg && <p className="text-sm text-gray-700">{msg}</p>}
      <button onClick={load} className="border px-3 py-2 rounded">Refresh</button>

      {rows && rows.length === 0 && <p>No pending licenses 🎉</p>}
      {rows && rows.length > 0 && (
        <table className="w-full border text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Trade</th>
              <th className="p-2 text-left">State</th>
              <th className="p-2 text-left">License #</th>
              <th className="p-2 text-left">Submitted</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id} className="border-t">
                <td className="p-2">{r.trade}</td>
                <td className="p-2">{r.state}</td>
                <td className="p-2">{r.license_number}</td>
                <td className="p-2">{new Date(r.created_at).toLocaleString()}</td>
                <td className="p-2 text-center space-x-2">
                  <button onClick={()=>act(r.id,'verify')} className="bg-green-600 text-white px-2 py-1 rounded">Approve</button>
                  <button onClick={()=>act(r.id,'reject')} className="bg-red-600 text-white px-2 py-1 rounded">Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
