import React from "react";
import VisibleTab from "../../entities/VisibleTab";

interface ChannelsVideosTabsProps {
	visibleTab: VisibleTab;
	setVisibleTab: (visibleTab: VisibleTab) => void;
}

function ChannelsVideosTabs(props: ChannelsVideosTabsProps) {
	const { visibleTab, setVisibleTab } = props;

	return (
		<div className="tabs is-centered is-boxed">
			<ul>
				<li className={visibleTab == VisibleTab.Videos ? "is-active" : ""}>
					<a
						onClick={() => {
							setVisibleTab(VisibleTab.Videos);
						}}
					>
						<span className="icon is-small">
							<i className="fas fa-video" />
						</span>
						<span>Videos</span>
					</a>
				</li>
				<li className={visibleTab == VisibleTab.Channels ? "is-active" : ""}>
					<a
						onClick={() => {
							setVisibleTab(VisibleTab.Channels);
						}}
					>
						<span className="icon is-small">
							<i className="fas fa-user-friends" />
						</span>
						<span>Channels</span>
					</a>
				</li>
			</ul>
		</div>
	);
}

export default ChannelsVideosTabs;
