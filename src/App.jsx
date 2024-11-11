import { useState } from "react";
import Layout from "./components/Layout";
import Hero from "./components/Hero";

function App() {
	const isAuthenticated = false;

	return <>
	<Layout>
		<Hero />
		<CoffeeForm />
	</Layout>
	</>;
}

export default App;
