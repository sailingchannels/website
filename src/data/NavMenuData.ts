import MainMenuSection from "../entities/MainMenuSection";

var channelSection: MainMenuSection = {
	title: "Channels",
	items: [
		{
			title: "Subscribers",
			href: "/by-subscribers",
			icon: "fas fa-users"
		},
		{
			title: "Views",
			href: "/by-views",
			icon: "fas fa-eye"
		},
		{
			title: "Last Upload",
			href: "/by-upload",
			isDefault: true,
			icon: "fas fa-cloud-upload-alt"
		},
		{
			title: "Founded",
			href: "/by-founded",
			icon: "fas fa-plus-circle"
		},
		{
			title: "Trending",
			href: "/by-trending",
			icon: "fas fa-chart-line"
		},
		{
			title: "Topics",
			href: "/topics",
			icon: "fas fa-tags"
		}
	]
};

var menuSection: MainMenuSection = {
	title: "Menu",
	items: [
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
