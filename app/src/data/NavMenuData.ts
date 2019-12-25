import MainMenuSection from "../entities/MainMenuSection";

var channelSection: MainMenuSection = {
	title: "Channels",
	items: [
		{
			title: "Subscribers",
			href: "/channels/subscribers"
		},
		{
			title: "Views",
			href: "/channels/views"
		},
		{
			title: "Last Upload",
			href: "/channels/upload"
		},
		{
			title: "Founded",
			href: "/channels/founded"
		},
		{
			title: "Trending",
			href: "/channels/trending"
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
			href: "/how-does-this-work"
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
