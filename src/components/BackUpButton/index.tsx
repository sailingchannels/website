import React, { useEffect, useState } from "react";

const BackUpButton = () => {
	const [isVisisble, setIsVisible] = useState(false);

	useEffect(() => {
		const onScroll = (e) => {
			const scrollTop = e.target.documentElement.scrollTop;

			if (scrollTop > screen.height && !isVisisble) {
				setIsVisible(true);
			}

			if (scrollTop <= screen.height && isVisisble) {
				setIsVisible(false);
			}
		};
		window.addEventListener("scroll", onScroll);

		return () => window.removeEventListener("scroll", onScroll);
	}, []);

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
