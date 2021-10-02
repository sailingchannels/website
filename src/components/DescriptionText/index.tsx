import React from "react";

interface DescriptionTextProps {
	text: string;
}

const DESCRIPTION_MAX_LENGTH = 300;

export default function DescriptionText(props: DescriptionTextProps) {
	if (!props.text) return null;

	const length = props.text.length;
	if (length > DESCRIPTION_MAX_LENGTH) {
		return <span>{props.text.substring(0, Math.min(DESCRIPTION_MAX_LENGTH, length))} […]</span>;
	} else {
		return <span>{props.text}</span>;
	}
}
