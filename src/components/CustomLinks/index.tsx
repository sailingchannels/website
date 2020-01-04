import React from "react";
import CustomLink from "../../entities/CustomLink";

interface CustomLinksProps {
	links: CustomLink[];
}

function CustomLinks(props: CustomLinksProps) {
	if (props.links && props.links.length > 0) {
		return (
			<>
				<h3 className="top-spacer">
					<strong>Links:</strong>
				</h3>
				<ul>
					{props.links.map((link: CustomLink) => {
						return (
							<li key={link.uRL}>
								<a href={`https://youtube.com${link.uRL}`} target="_blank">
									<img alt={link.title} src={link.icon} /> {link.title}
								</a>
							</li>
						);
					})}
				</ul>
			</>
		);
	}

	return null;
}

export default CustomLinks;
