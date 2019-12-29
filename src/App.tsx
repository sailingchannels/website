import React from "react";
import Layout from "./components/Layout";
import GlobalContext from "./contexts/GlobalContext";

import "./App.css";

/**
 * The main application view
 */
export default function App() {
	return (
		<GlobalContext.ContextProvider>
			<Layout />
		</GlobalContext.ContextProvider>
	);
}
