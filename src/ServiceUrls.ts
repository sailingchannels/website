export function IdentityService() {
	const isLocal: boolean = location.hostname === "localhost" || location.hostname === "127.0.0.1";
	return isLocal ? "http://localhost:3000" : "https://identity.sailing-channels.com";
}

export function DataService() {
	const isLocal: boolean = location.hostname === "localhost" || location.hostname === "127.0.0.1";
	return isLocal ? "http://localhost:5000" : "https://data.sailing-channels.com";
}
