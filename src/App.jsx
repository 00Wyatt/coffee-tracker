import { useState } from "react";
import Layout from "./components/Layout";
import Hero from "./components/Hero";
import History from "./components/History";
import Stats from "./components/Stats";
import CoffeeForm from "./components/CoffeeForm";
import Modal from "./components/Modal";
import Authentication from "./components/Authentication";

function App() {
    const isAuthenticated = false;
    const [showModal, setShowModal] = useState(false);

    function handleCloseModal() {
        setShowModal(false);
    }

    return (
        <>
            {showModal && (
                <Modal handleCloseModal={handleCloseModal}>
                    <Authentication />
                </Modal>
            )}
            <Layout setShowModal={setShowModal}>
                <Hero />
                <CoffeeForm
                    isAuthenticated={isAuthenticated}
                    setShowModal={setShowModal}
                />
                {isAuthenticated && (
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
