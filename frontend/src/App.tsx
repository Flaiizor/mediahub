import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import AddMediaModal from "./components/AddMediaModal";

function AnimatedRoutes({ refreshKey }: { refreshKey: number }) {
    const location = useLocation();
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home refreshKey={refreshKey} />} />
            </Routes>
        </AnimatePresence>
    );
}

export default function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);

    const handleMediaAdded = () => {
        setRefreshKey((k) => k + 1);
    };

    return (
        <Router>
            <NavBar onAddClick={() => setIsModalOpen(true)} />
            <AnimatedRoutes refreshKey={refreshKey} />
            <AddMediaModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onMediaAdded={handleMediaAdded}
            />
        </Router>
    );
}
