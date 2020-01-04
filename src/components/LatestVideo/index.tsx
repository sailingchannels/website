import React, { useState } from "react";
import { LATEST_VIDEO_QUERY } from "./gql";
import { useQuery } from "@apollo/react-hooks";

interface LatestVideoProps {
	channelId: string;
}

function LatestVideo(props: LatestVideoProps) {
	// load main menu items via graphql
	const { loading, error, data } = useQuery(LATEST_VIDEO_QUERY, {
		fetchPolicy: "network-only",
		variables: {
			channelId: props.channelId
		}
	});

	if (data) {
		return (
			<iframe
				width="100%"
				height="390"
				style={{ height: "390px" }}
				src={`https://www.youtube.com/embed/${
					data.latestVideo.iD
				}?origin=https://sailing-channels.com`}
				frameBorder="0"
				allowFullScreen
			/>
		);
	}

	return null;
}

export default LatestVideo;
