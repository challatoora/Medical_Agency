import React from "react";
import { createRoot } from "react-dom/client";

console.log("MAIN JSX LOADED");

function Test() {
  return (
    <h1 style={{color:"red"}}>
      REACT IS WORKING
    </h1>
  );
}

createRoot(document.getElementById("root")).render(
  <Test />
);