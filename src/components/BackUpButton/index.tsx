import React, { useEffect, useState } from "react";

const BackUpButton = () => {
	const [isVisisble, setIsVisible] = useState(false);
	const [scrollTop, setScrollTop] = useState(0);

	useEffect(() => {
		const onScroll = (e) => {
			setScrollTop(e.target.documentElement.scrollTop);
		};
		window.addEventListener("scroll", onScroll);

		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	useEffect(() => {
		if (scrollTop > screen.availHeight && !isVisisble) {
			setIsVisible(true);
		}

		if (scrollTop <= screen.availHeight && isVisisble) {
			setIsVisible(false);
		}
	}, [scrollTop, isVisisble]);

	if (!isVisisble) return null;

	return (
		<button
			className="button is-large is-light is-rounded back-up is-hidden-mobile"
			title="Scroll up"
			onClick={() => {
				window.scrollTo(0, 0);
				setIsVisible(false);
			}}
		>
			<span className="icon is-medium">
				<i className="fas fa-arrow-up"></i>
			</span>
		</button>
	);
};

export default BackUpButton;
