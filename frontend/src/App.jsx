import { useState } from "react";

function App() {
  const [query, setQuery] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const ask = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:3001/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query })
    });
    setData(await res.json());
    setLoading(false);
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Ask Anything About Yoga</h2>
      <textarea onChange={e => setQuery(e.target.value)} />
      <br />
      <button onClick={ask}>Ask</button>

      {loading && <p>Loading...</p>}

      {data && (
        <>
          {data.isUnsafe && <p style={{color:"red"}}>⚠️ Safety Warning</p>}
          <p>{data.answer}</p>
          <h4>Sources</h4>
          <ul>{data.sources.map(s => <li key={s}>{s}</li>)}</ul>
        </>
      )}
    </div>
  );
}

export default App;
