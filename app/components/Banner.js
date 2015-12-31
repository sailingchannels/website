import React from "react";
import {Link} from "react-router";

class Banner extends React.Component {

    // RENDER
	render() {

		return (
            <div id="banner-dialog" className="modal fade">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" aria-hidden="true">×</button>
                    <h3 className="modal-title">Thanks for stopping by!</h3>
                  </div>
                  <div className="modal-body">
                    <p>
                        The Two aboard Tuuli crew created this website in their sparetime.
                    </p>
                    <p>
                        If you like this site, please give back some appreciation by subscribing to our YouTube channel!
                    </p>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-primary" data-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
		);
	}
}

export default Banner;
