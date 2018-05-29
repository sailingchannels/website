import React from "react";
import OffsetMenu from "./OffsetMenu";
import OffsetSocial from "./OffsetSocial";
import Logo from "./Logo";

class Contributions extends React.Component {
	// COMPONENT DID MOUNT
	componentDidMount() {
		document.title = "Contributions | Sailing Channels";
	}

	// RENDER
	render() {
		return (
			<div className="container">
				<OffsetSocial />
				<Logo className="hidden-xs hidden-sm" />
				<OffsetMenu />
				<div className="row content-row">
					<div className="col-md-3" />
					<div className="col-md-6">
						<h1 className="content-h1">Contributions</h1>
						<p>
							This is the place where we want to thank all of you for your great
							feedback regarding this site. Some of you have submitted ideas and
							improvements that made it on the todo list and are already implemented
							or fixed:
						</p>
						<table className="table">
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
										>
											Norman Boyes
										</a>
									</td>
								</tr>
								<tr>
									<td>Feature: Sort channels by total views</td>
									<td>
										<a
											href="https://sailing-channels.com/channel/UCvLc83k5o11EIF1lEo0VmuQ"
											target="_blank"
										>
											Brian, SV Delos
										</a>
									</td>
								</tr>
								<tr>
									<td>
										Bug report: Website (scrolling) slows down drastically when
										loading lots of channels
									</td>
									<td>
										<a
											href="https://www.youtube.com/user/steedharold"
											target="_blank"
										>
											Harold Steed
										</a>
									</td>
								</tr>
								<tr>
									<td>
										Feature: Show vessel position that belongs to a channel on a
										map
									</td>
									<td>
										<a
											href="https://sailing-channels.com/channel/UCpfax0gLoUZMqw-ROxX77Yw"
											target="_blank"
										>
											Drake Paragon
										</a>
									</td>
								</tr>
								<tr>
									<td>
										Feature: Sort channels by currently popular channels, see
										what's trending.
									</td>
									<td>
										<a
											href="https://www.sailing-channels.com/channel/UC6ZRBkwBQBrEOQQKwGi85gQ"
											target="_blank"
										>
											Kismet Adventures
										</a>
									</td>
								</tr>
								<tr>
									<td>
										Improvement: Implementing a subscriber threshold that
										channels have to reach in order to be listed on the
										"trending" page.<br />
										<i>
											(Ed.: The threshold is now the median value of the
											subscriber distribution of all listed channels.)
										</i>
									</td>
									<td>
										<a
											href="https://sailing-channels.com/channel/UC8dsJQ_9CEwRmur_HFSXezA"
											target="_blank"
										>
											The Corsair
										</a>
									</td>
								</tr>
								<tr>
									<td>
										Improvement: Set "Last upload" as default sorting option to
										facilitate attention to a broader variety of channels.
									</td>
									<td>
										<a
											href="https://sailing-channels.com/channel/UCu08YiFDAiIxl4xJDveTdJw"
											target="_blank"
										>
											Mount Ocean
										</a>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div className="col-md-3" />
				</div>
			</div>
		);
	}
}

export default Contributions;
