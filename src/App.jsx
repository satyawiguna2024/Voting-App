import { Routes, Route } from "react-router";
import { AddCandidateForm, DetailCandidate, Home, Voting } from "./pages/index";
import Navbar from "./pages/navbar/Navbar";
import Footer from "./pages/footer/Footer";

export default function App() {
  return(
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/voting" element={<Voting />} />
            <Route path="/add-candidate" element={<AddCandidateForm />} />
            <Route path="/candidate/:address" element={<DetailCandidate />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
}