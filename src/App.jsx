import Header from "./components/header/Header";
import AddListing from "./pages/addListing/AddListing";
import Home from "./pages/home/Home";
import Listing from "./pages/listing/Listing";
import { Routes, Route } from "react-router-dom";
import AgentModal from "./components/agentModal/AgentModal";
function App() {
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
