import Header from "./components/header/Header";
import AddListing from "./pages/addListing/AddListing";
import Home from "./pages/home/Home";
import Listing from "./pages/listing/Listing";
import { Routes, Route } from "react-router-dom";
import AgentModal from "./components/agentModal/AgentModal";
function App() {
  // 9d083bd2-a671-4388-ae72-ec3dfe456e91
  return (
    <>
      <Header />
      <AgentModal />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listing/:id" element={<Listing />} />
        <Route path="/add" element={<AddListing />} />
      </Routes>
    </>
  );
}

export default App;
