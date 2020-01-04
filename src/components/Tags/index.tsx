import React from "react";

interface TagsProps {
	tags: string[];
}

function Tags(props: TagsProps) {
	if (props.tags) {
		return (
			<>
				<h3>
					<strong>Popular video tags:</strong>
				</h3>
				<div className="tags">
					{props.tags.map((tag) => {
						return <span className="tag is-light">{tag}</span>;
					})}
				</div>
			</>
		);
	}

	return null;
}

export default Tags;
