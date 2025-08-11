import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import AddMediaModal from "./components/AddMediaModal";

function AnimatedRoutes() {
    const location = useLocation();
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
            </Routes>
        </AnimatePresence>
    );
}

export default function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <Router>
            <NavBar onAddClick={() => setIsModalOpen(true)} />
            <AnimatedRoutes />
            <AddMediaModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </Router>
    );
}
