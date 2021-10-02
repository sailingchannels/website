import React from "react";
import { Link } from "react-router-dom";
import LoadingIndicator from "../../components/LoadingIndicator";
import { TOPICS_QUERY } from "./gql";
import { useQuery } from "@apollo/react-hooks";
import { useLocalStorage } from "@rehooks/local-storage";
import { LANGUAGE_SETTING_KEY, DEFAULT_LANGUAGE } from "../../Constants";
import TopicOverview from "../../entities/TopicOverview";
import { v4 as uuid } from "uuid";
import { TOPIC_DETAIL_QUERY } from "../TopicDetail/gql";
import { Helmet } from "react-helmet";

function Topics(props) {
	const [selectedLanguage] = useLocalStorage<string>(LANGUAGE_SETTING_KEY);

	// load main menu items via graphql
	const { loading, error, data, client } = useQuery(TOPICS_QUERY, {
		fetchPolicy: "cache-first",
		variables: {
			language: selectedLanguage || DEFAULT_LANGUAGE
		}
	});

	function chunk(a: any[], n: number) {
		if (!a.length) {
			return [];
		}
		return [a.slice(0, n)].concat(chunk(a.slice(n), n));
	}

	if (loading || !data) return <LoadingIndicator />;

	return (
		<>
			<Helmet>
				<title>Topics | Sailing Channels</title>
			</Helmet>

			<section className="hero channels-hero">
				<div className="hero-body">
					<h1 className="title">
						Topics <span className="tag is-success">beta</span>
					</h1>
					<h2 className="subtitle">Explore sailing channels by their topics.</h2>
				</div>
			</section>

			<p>
				Channels are automatically grouped into topics by their most popular video tags. Those are the
				tags that the content creators tag their videos with upon uploading!
			</p>
			<p style={{ marginBottom: "50px" }}>
				If you wish to suggest an additional topic to list here, please send an email.
			</p>

			{chunk(data.topicsOverview, 2).map((topicOverviewsChunk: TopicOverview[]) => {
				// add a single row of topics based on a 2-chunk
				let row = topicOverviewsChunk.map((topicOverview: TopicOverview) => {
					const { topic } = topicOverview;
					return (
						<div className="column" key={topic.iD}>
							<div
								className="card"
								onMouseOver={() => {
									client.query({
										query: TOPIC_DETAIL_QUERY,
										variables: {
											topicId: topic.iD
										}
									});
								}}
							>
								<div className="card-image">
									<Link to={`/topics/${topic.iD}`} className="image">
										<img
											src={`https://img.youtube.com/vi/${topicOverview.latestVideoID}/maxresdefault.jpg`}
											alt={topic.title}
										/>
									</Link>
								</div>
								<div className="card-content">
									<div className="content">
										<p className="title is-4">{topic.title}</p>
										<p className="subtitle is-6">
											(Photo by: {topicOverview.latestChannelTitle})
										</p>
									</div>

									<div className="content has-text-justified	">{topic.description}</div>
								</div>
								<footer className="card-footer">
									<Link to={`/topics/${topic.iD}`} className="card-footer-item">
										<i className="far fa-list-alt" style={{ marginRight: "5px" }} /> View
										Topic
									</Link>
								</footer>
							</div>
						</div>
					);
				});

				return (
					<div className="columns" key={uuid()}>
						{row}
					</div>
				);
			})}
		</>
	);
}

export default Topics;
