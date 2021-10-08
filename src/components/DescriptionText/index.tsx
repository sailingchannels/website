import React from "react";

interface DescriptionTextProps {
	text: string;
}

const DESCRIPTION_MAX_LENGTH = 300;

export default function DescriptionText(props: DescriptionTextProps) {
	const { text } = props;

	if (!text) return null;

	const length = text.length;
	if (length > DESCRIPTION_MAX_LENGTH) {
		return <span>{text.substring(0, Math.min(DESCRIPTION_MAX_LENGTH, length))} […]</span>;
	} else {
		return <span>{text}</span>;
	}
}
