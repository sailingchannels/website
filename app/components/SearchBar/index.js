import React from "react";
import $ from "jquery";
import { Link } from "react-router-dom";

import "./SearchBar.css";

class SearchBar extends React.Component {
	componentDidMount() {
		// intercept browser search ctrl+f
		$(window).on("keydown", function(e) {
			if ((e.ctrlKey || e.metaKey) && e.keyCode === 70) {
				// don't open browser search
				e.preventDefault();

				// focus search bar
				$("#search-bar").focus();

				// scroll up
				window.setTimeout(function() {
					window.scrollTo(0, 0);
				}, 1);
			}
		});
	}

	componentWillUnmount() {
		$(window).off("keydown");
	}

	keyUp(e) {
		// ESC clears selection
		if (e.keyCode === 27) {
			e.target.value = "";
			this.props.history.push("/");
			return;
		} else if (e.keyCode === 13) {
			// ENTER triggers search
			var v = e.target.value;
			this.props.history.push("/search/" + encodeURIComponent(v));
		}
	}

	render() {
		// make sort group invisible when we are searching
		var sortGroupClass = "hidden-xs hidden-sm form-group sort-group";
		if (this.props.query) {
			sortGroupClass += " invisible";
		}

		return (
			<div className="row search-row hidden-xs hidden-sm">
				<div className="col-lg-3 col-md-2 col-sm-2" />
				<div className="col-lg-6 col-md-8 col-sm-8">
					<div className="row">
						<div className="col-lg-1 col-md-1 col-sm-0" />
						<div className="col-lg-10 col-md-10 col-sm-12">
							<div className="form-group is-empty">
								<input
									className="form-control"
									type="text"
									id="search-bar"
									placeholder="Search for ..."
									onKeyUp={this.keyUp.bind(this)}
								/>
								<span className="material-input" />
							</div>
						</div>
						<div className="col-lg-1 col-md-1 col-sm-0" />
					</div>

					<div className={sortGroupClass}>
						<label className="sort-label control-label">Sort by:</label>
						<Link to={"/by-subscribers"} className="sortBy-label">
							<input
								readOnly
								type="radio"
								className="sort-option"
								checked={this.props.sortBy === "subscribers"}
							/>
							&nbsp;Subscribers
						</Link>
						<Link to={"/by-views"} className="sortBy-label">
							<input
								readOnly
								type="radio"
								className="sort-option"
								checked={this.props.sortBy === "views"}
							/>
							&nbsp;Views
						</Link>
						<Link to={"/by-upload"} className="sortBy-label">
							<input
								readOnly
								type="radio"
								className="sort-option"
								checked={this.props.sortBy === "upload"}
							/>
							&nbsp;Last upload
						</Link>
						<Link to={"/by-founded"} className="sortBy-label">
							<input
								readOnly
								type="radio"
								className="sort-option"
								checked={this.props.sortBy === "founded"}
							/>
							&nbsp;Founded
						</Link>
						<Link to={"/by-trending"} className="sortBy-label">
							<input
								readOnly
								type="radio"
								className="sort-option"
								checked={this.props.sortBy === "trending"}
							/>
							&nbsp;Trending
						</Link>
					</div>
				</div>
				<div className="col-lg-3 col-md-2 col-sm-2" />
			</div>
		);
	}
}

export default SearchBar;
