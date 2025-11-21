import SyllabusTracker from "./home";
import { Analytics } from "@vercel/analytics/react";
import "./App.css";

function App() {
  return (
    <>
      <SyllabusTracker />
      <Analytics />
    </>
  );
}

export default App;
