import * as React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import App from "./App";
import ApolloClient from "apollo-client";
import { ApolloProvider } from "@apollo/react-hooks";
import { BatchHttpLink } from "apollo-link-batch-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";

import "bulma/css/bulma.css";

(async () => {
	// graphql setup
	const link = new BatchHttpLink({
		uri: "http://localhost:5000/api/graphql",
		batchInterval: 250,
		credentials: "include"
	});
	const cache = new InMemoryCache();

	// await before instantiating ApolloClient, else queries might run before the cache is persisted
	await persistCache({
		cache,
		storage: window.localStorage,
		debug: false
	});

	const client = new ApolloClient({
		link,
		cache
	});

	const root: HTMLElement = document.getElementById("root");

	const render = (AppComponent) => {
		ReactDOM.render(
			<AppContainer>
				<ApolloProvider client={client}>
					<AppComponent />
				</ApolloProvider>
			</AppContainer>,
			root
		);
	};

	render(App);

	if (module["hot"]) {
		module["hot"].accept("./App", () => {
			render(App);
		});
	}
})();
