import { useState, useRef } from "react";
import "./App.css";
import TokenContext from "./TokenContext";
import Form from "./components/Form";
import Card from "./components/Card";
import { BrowserRouter, Routes, Route} from "react-router-dom";

export default function App() {
  const tokenState = useState({});
  
  return (
      <TokenContext.Provider value={tokenState}>    
           <BrowserRouter>
                <Routes>
                    <Route path="/signup" element={<Form />} />
                </Routes>
           </BrowserRouter>
      </TokenContext.Provider>
  );
}