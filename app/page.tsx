
export default function Home() {
  return (
    <main className="space-y-4">
      <h2 className="text-xl font-semibold">Welcome</h2>
      <p>Follow the README to deploy. Then try asking a question, submitting a license, approving it in Admin, and running AI Search.</p>
      <ul className="list-disc ml-6">
        <li><a className="underline" href="/ask">Ask a question</a></li>
        <li><a className="underline" href="/verify">Submit license</a></li>
        <li><a className="underline" href="/search">AI Search</a></li>
      </ul>
    </main>
  );
}
