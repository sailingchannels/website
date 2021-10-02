import React, { useEffect, useState } from "react";
import VisibilitySensor from "react-visibility-sensor";
import classnames from "classnames";

interface ChannelLoadMoreButtonProps {
	isLoading: boolean;
	loadingAction: () => void;
}

export default function ChannelLoadMoreButton(props: ChannelLoadMoreButtonProps) {
	const { isLoading, loadingAction } = props;
	const [bounce, setBounce] = useState(false);

	const onChange = (isVisible: boolean) => {
		if (isVisible && !props.isLoading) {
			setTimeout(() => {
				props.loadingAction();
			}, 700);

			setBounce(true);
		}
	};

	useEffect(() => {
		if (isLoading === false) {
			setBounce(false);
		}
	}, [isLoading]);

	const buttonClass = classnames({
		button: true,
		"is-medium": true,
		"is-rounded": true,
		"is-loading": isLoading,
		"animate__animated animate__rubberBand": bounce
	});

	return (
		<VisibilitySensor onChange={onChange}>
			<button className={buttonClass} disabled={isLoading} onClick={loadingAction}>
				<i className="fas fa-arrow-circle-down icon-spacer"></i> Load more channels
			</button>
		</VisibilitySensor>
	);
}
