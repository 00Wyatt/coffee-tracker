import { useState } from "react";
import Layout from "./components/Layout";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import CoffeeForm from "./components/CoffeeForm";

function App() {
	const isAuthenticated = false;

	const authenticatedContent = (
		<>
			<Stats />
			<History />
		</>
	)

	return <>
		<Layout>
			<Hero />
			<CoffeeForm />
			{isAuthenticated && (authenticatedContent)}
		</Layout>
	</>;
}

export default App;
