import MainMenuSection from "../entities/MainMenuSection";

var channelSection: MainMenuSection = {
	title: "Channels",
	items: [
		{
			title: "Subscribers",
			href: "/by-subscribers"
		},
		{
			title: "Views",
			href: "/by-views"
		},
		{
			title: "Last Upload",
			href: "/by-upload",
			isDefault: true
		},
		{
			title: "Founded",
			href: "/by-founded"
		},
		{
			title: "Trending",
			href: "/by-trending"
		}
	]
};

var menuSection: MainMenuSection = {
	title: "Menu",
	items: [
		{
			title: "Explore by topics",
			href: "/topics"
		},
		{
			title: "Introduction",
			href: "/how-it-works"
		},
		{
			title: "Suggest a channel",
			href: "/suggest"
		},
		{
			title: "Contributions",
			href: "/contributions"
		},
		{
			title: "Support us",
			href: "/support-us"
		}
	]
};

var sections: MainMenuSection[] = [channelSection, menuSection];
export default sections;
