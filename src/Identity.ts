export default () => {
	// check if we are currently running as localhost
	const isLocal: boolean = location.hostname === "localhost" || location.hostname === "127.0.0.1";

	// set oauth URL accordingly
	return isLocal ? "http://localhost:3000" : "https://identity.sailing-channels.com";
};
