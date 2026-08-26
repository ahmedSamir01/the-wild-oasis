"use client";

import { useState } from "react";

function Counter({ data }) {
  const [count, setCount] = useState(0);

  console.log(data);

  return (
    <div>
      <pre>counter count: {data.length}</pre>
      <h1>Counter</h1>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

export default Counter;
