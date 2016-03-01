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
				<Logo />
				<OffsetMenu />
                <div className="row content-row">
					<div className="col-md-3"></div>
					<div className="col-md-6">
	                    <h1 className="content-h1">Contributions</h1>
						<p>
							This is the place we want to thank all of you for your great feedback regarding this site. Some of you have submitted ideas and improvements that made it on the todo list and are already implemented:
						</p>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Suggestion</th>
                                    <th>By</th>
                                </tr>
                            </thead>
                            <tr>
                                <td>A way to filter by language of the channel</td>
                                <td><a href="https://www.youtube.com/channel/UCUMEKlaxhujH5r6sAVViTGw" target="_blank">Norman Boyes</a></td>
                            </tr>
							<tr>
                                <td>Exclude channels that have not uploaded a video in a year</td>
                                <td><a href="https://www.youtube.com/channel/UCpqFgOKXM0yMji81WxQjl-g" target="_blank">Someday sailor</a></td>
                            </tr>
							<tr>
                                <td>Sort channels by total views</td>
                                <td><a href="https://www.youtube.com/user/briantrautman" target="_blank">Brian, SV Delos</a></td>
                            </tr>
                        </table>
					</div>
					<div className="col-md-3"></div>
                </div>
            </div>
		);
	}
}

export default Contributions;
