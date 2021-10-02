import React from "react";
import VisibilitySensor from "react-visibility-sensor";

interface ChannelLoadMoreButtonProps {
	isLoading: boolean;
	loadingAction: () => void;
}

export default function ChannelLoadMoreButton(props: ChannelLoadMoreButtonProps) {
	const onChange = (isVisible: boolean) => {
		if (isVisible && !props.isLoading) {
			props.loadingAction();
		}
	};

	return (
		<VisibilitySensor onChange={onChange}>
			<button
				className={"button is-rounded " + (props.isLoading ? "is-loading" : null)}
				disabled={props.isLoading}
				onClick={props.loadingAction}
			>
				<i className="fas fa-arrow-circle-down icon-spacer"></i> Load more channels
			</button>
		</VisibilitySensor>
	);
}
