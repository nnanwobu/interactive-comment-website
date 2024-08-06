"use client";
const { useState } = require("react");

function Counter({ data }) {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>there are {data.length} users</p>
      <button onClick={() => setCount(count + 1)}>{count}</button>
    </div>
  );
}

export default Counter;
