const rimraf = require("rimraf");
const package = require("../package.json");

const dir = "./docs/" + package.version + "/";

console.info("cleaning " + dir);
rimraf(dir, (err) => {
	if (err) console.error(err);
});
