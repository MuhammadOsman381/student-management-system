import { createContext } from "react";
import { useState } from "react";
import App from "./App";

export const context = createContext({
  teacherid: "",
});

function MyContext() {
  const [teacherid, setTeacherId] = useState("");
  const [subID, setSubID] = useState("");
  return (
    <context.Provider
      value={{
        subID,
        setSubID,
        teacherid,
        setTeacherId,
      }}
    >
      <App />
    </context.Provider>
  );
}

export default MyContext;
