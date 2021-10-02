import React from "react";
import { Link } from "react-router-dom";
import { VIDEO_COUNT_QUERY } from "./gql";
import { useQuery } from "@apollo/react-hooks";

interface PagingProps {
	currentPage: string;
	channelId: string;
}

function Paging(props: PagingProps) {
	const currentPage: number = parseInt(props.currentPage);

	const { loading, error, data } = useQuery(VIDEO_COUNT_QUERY, {
		fetchPolicy: "network-only",
		variables: {
			channelId: props.channelId
		}
	});

	if (loading || !data) return null;

	let prevButton = (
		<button className="pagination-previous" disabled={true}>
			Previous
		</button>
	);

	// show prev button on every page but the first
	if (currentPage > 0) {
		const prevPage: number = currentPage - 1;
		const prevUrl: string = `/channel/${props.channelId}/${prevPage}`;

		prevButton = (
			<Link to={prevUrl} className="pagination-previous">
				Previous
			</Link>
		);
	}

	let nextButton = (
		<button className="pagination-next" disabled>
			Next
		</button>
	);

	// only show next page if we're not at
	// the end of the pages to show
	if (currentPage < data.videoCount) {
		const nextPage: number = currentPage + 1;
		const nextUrl: string = `/channel/${props.channelId}/${nextPage}`;

		nextButton = (
			<Link to={nextUrl} className="pagination-next">
				Next
			</Link>
		);
	}

	return (
		<nav className="pagination is-small" role="navigation" aria-label="pagination">
			{prevButton}
			{nextButton}
		</nav>
	);
}

export default Paging;
