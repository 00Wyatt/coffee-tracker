import { useState } from "react";
import Layout from "./components/Layout";
import Hero from "./components/Hero";
import History from "./components/History";
import Stats from "./components/Stats";
import CoffeeForm from "./components/CoffeeForm";
import Modal from "./components/Modal";
import Authentication from "./components/Authentication";
import { useAuth } from "./context/AuthContext";

function App() {
    const { globalUser, isLoading, globalData } = useAuth();
    const isAuthenticated = globalUser;
    const isData = globalData && !!Object.keys(globalData || {}).length;
    const [showModal, setShowModal] = useState(false);

    function handleCloseModal() {
        setShowModal(false);
    }

    return (
        <>
            {showModal && (
                <Modal handleCloseModal={handleCloseModal}>
                    <Authentication
                        showModal={showModal}
                        handleCloseModal={handleCloseModal}
                    />
                </Modal>
            )}
            <Layout setShowModal={setShowModal}>
                <Hero />
                <CoffeeForm
                    isAuthenticated={isAuthenticated}
                    setShowModal={setShowModal}
                />
                {isAuthenticated && isLoading && <p>Loading data...</p>}
                {isAuthenticated && isData && (
                    <>
                        <Stats />
                        <History />
                    </>
                )}
            </Layout>
        </>
    );
}

export default App;
