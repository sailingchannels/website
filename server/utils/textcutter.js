// TEXT CUTTER
module.exports = function(i, text) {
	if (text.length < i) return text;

	var shorter = text.substr(0, i);
	if (/^\S/.test(text.substr(i))) {
		return shorter.replace(/\s+\S*$/, "") + " ...";
	}

	return shorter;
};
