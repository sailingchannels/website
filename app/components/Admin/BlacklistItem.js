import React from "react";

class BlacklistItem extends React.Component {

	// RENDER
	render() {
		return (
			<div className="row channel-row">
                <div className="col-md-2 col-sm-2 col-xs-3">
                </div>
                <div className="col-md-7 col-sm-6 col-xs-9">
					{this.props.id}
                </div>
                <div className="col-md-3 col-sm-4 col-xs-10 col-xs-offset-3 col-md-offset-0 col-sm-offset-0">
                </div>
			</div>
		);
	}
}

export default BlacklistItem;
