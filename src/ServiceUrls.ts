export function IdentityService() {
	// check if we are currently running as localhost
	const isLocal: boolean = location.hostname === "localhost" || location.hostname === "127.0.0.1";

	// set oauth URL accordingly
	return isLocal ? "http://localhost:3000" : "https://identity.sailing-channels.com";
}

export function DataService() {
	// check if we are currently running as localhost
	const isLocal: boolean = location.hostname === "localhost" || location.hostname === "127.0.0.1";

	// set oauth URL accordingly
	return isLocal ? "http://localhost:5000" : "https://data.sailing-channels.com";
}
