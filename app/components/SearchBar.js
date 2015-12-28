import React from "react";

class SearchBar extends React.Component {

    // KEY UP
    keyUp(e) {

        // ESC clears selection
        if(e.keyCode === 27) {

            e.target.value = "";
        }

        var v = e.target.value;
        $(window).trigger("typeSearchterm", {"term": v});
    }

    // RENDER
	render() {
		return (
            <div className="row search-row">
				<div className="col-md-4"></div>
                <div className="col-md-4">
                    <div className="form-group label-floating is-empty">
                        <label className="control-label">Search for ...</label>
                        <input className="form-control" type="text" onKeyUp={this.keyUp.bind(this)} />
                        <span className="material-input"></span>
                    </div>
                </div>
				<div className="col-md-4"></div>
            </div>
		);
	}
}

export default SearchBar;
