import Header from "./components/header/Header";
import Home from "./pages/home/Home";
import Listing from "./pages/listing/Listing";
import { Routes, Route } from "react-router-dom";
function App() {
  // 9cfc227b-ce5f-487d-a2cb-55f0028470ef
  return (
    <>
      <Header />
      {/* <Home /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listing/:id" element={<Listing />} />
      </Routes>
    </>
  );
}

export default App;
