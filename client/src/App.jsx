import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import iUpiLogo from "/iUpi.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex justify-center items-center p-4">
        <a href="#">
          <img src={iUpiLogo} className="logo h-16" alt="iUpi logo" />
        </a>
      </div>
      <div className="flex justify-center gap-8 p-4">
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo h-16" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo h-16" alt="React logo" />
        </a>
      </div>
      <h1 className="text-3xl font-bold text-center mt-4">Vite + React</h1>
      <div className="card mt-6 p-4 bg-white rounded-lg shadow-md max-w-xs mx-auto">
        <button
          onClick={() => setCount((count) => count + 1)}
          className="px-4 py-2 btn "
        >
          count is {count}
        </button>
        <p className="mt-2 text-center text-gray-600">
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs mt-4 text-center text-blue-600">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
