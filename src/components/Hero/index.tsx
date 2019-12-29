import React from "react";

interface HeroProps {
	title: string;
	subtitle?: string;
}

function Hero(props: HeroProps) {
	return (
		<section className="hero channels-hero">
			<div className="hero-body">
				<h1 className="title">{props.title}</h1>
				<h2 className="subtitle">{props.subtitle}</h2>
			</div>
		</section>
	);
}

export default Hero;
