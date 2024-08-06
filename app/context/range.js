"use client";
const { createContext, useContext, useState } = require("react");

const RangeContext = createContext();
const initialState = { from: undefined, to: undefined };
function RangeProvider({ children }) {
  const [range, setRange] = useState(initialState);
  const resetRange = () => setRange(initialState);
  return (
    <RangeContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </RangeContext.Provider>
  );
}

function useRange() {
  const context = useContext(RangeContext);
  if (context === undefined) throw new Error(" context used out of scope");
  return context;
}

export { RangeProvider, useRange };
