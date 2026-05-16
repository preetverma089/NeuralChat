import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ChatPage from "./pages/ChatPage";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<ChatPage />} />
      {/* Redirect any unknown path to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);

export default App;
