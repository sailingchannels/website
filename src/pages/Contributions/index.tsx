import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Hero from "../../components/Hero";

function Contributions(props) {
	return (
		<>
			<Helmet>
				<title>Contributions | Sailing Channels</title>
			</Helmet>

			<Hero title="Contributions" />

			<p>
				This is the place where we want to thank all of you for your great feedback regarding this
				site. Some of you have submitted ideas and improvements that made it on the todo list and are
				already implemented or fixed:
			</p>

			<table className="table is-striped is-fullwidth">
				<thead>
					<tr>
						<th>Suggestion</th>
						<th className="by-col">By</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Feature: A way to filter by language of the channel</td>
						<td>
							<a
								href="https://www.youtube.com/channel/UCUMEKlaxhujH5r6sAVViTGw"
								target="_blank"
								title="Go to Norman Boyes YouTube channel"
								rel="noopener"
							>
								Norman Boyes
							</a>
						</td>
					</tr>
					<tr>
						<td>Feature: Sort channels by total views</td>
						<td>
							<Link to="/channel/UCvLc83k5o11EIF1lEo0VmuQ" title="Go to Delos channel">
								Brian (SV Delos)
							</Link>
						</td>
					</tr>
					<tr>
						<td>
							Bug report: Website (scrolling) slows down drastically when loading lots of
							channels
						</td>
						<td>
							<a
								href="https://www.youtube.com/user/steedharold"
								target="_blank"
								title="Go to Harold Steed's YouTube channel"
								rel="noopener"
							>
								Harold Steed
							</a>
						</td>
					</tr>
					<tr>
						<td>Feature: Show vessel position that belongs to a channel on a map</td>
						<td>
							<Link
								to="/channel/UCpfax0gLoUZMqw-ROxX77Yw"
								title="Go to Drake Paragon's channel"
							>
								Drake Paragon
							</Link>
						</td>
					</tr>
					<tr>
						<td>Feature: Sort channels by currently popular channels, see what's trending.</td>
						<td>
							<Link
								to="/channel/UC6ZRBkwBQBrEOQQKwGi85gQ"
								title="Go to Kismet Adventure's channel"
							>
								Kismet Adventures
							</Link>
						</td>
					</tr>
					<tr>
						<td>
							Improvement: Implementing a subscriber threshold that channels have to reach in
							order to be listed on the "trending" page.
							<br />
							<i>
								(Ed.: The threshold is now the median value of the subscriber distribution of
								all listed channels.)
							</i>
						</td>
						<td>
							<Link to="/channel/UC8dsJQ_9CEwRmur_HFSXezA" title="Go to The Corsair's channel">
								The Corsair
							</Link>
						</td>
					</tr>
					<tr>
						<td>
							Improvement: Set "Last upload" as default sorting option to facilitate attention
							to a broader variety of channels.
						</td>
						<td>
							<Link to="/channel/UCu08YiFDAiIxl4xJDveTdJw" title="Go to Mount Ocean's channel">
								Mount Ocean
							</Link>
						</td>
					</tr>
					<tr>
						<td>Feature: Group channel by their topic, e.g. "family", "couple", "diy"</td>
						<td>
							<Link
								to="/channel/UCNYlvlreZiRRHo_v5Nmrfow"
								title="Go to Sailing Zatara's channel"
							>
								Sailing Zatara
							</Link>
							, David V.
						</td>
					</tr>
				</tbody>
			</table>
		</>
	);
}

export default Contributions;
