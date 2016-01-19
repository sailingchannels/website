import React from "react";

class SearchBar extends React.Component {

    // COMPONENT DID MOUNT
    componentDidMount() {

        // intercept browser search ctrl+f
        $(window).on("keydown", function(e){
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

    // COMPONENT WILL UNMOUNT
    componentWillUnmount() {
        $(window).off("keydown");
    }

    // KEY UP
    keyUp(e) {

        // ESC clears selection
        if(e.keyCode === 27) {

            e.target.value = "";
            this.props.history.pushState(null, "/");
            return;
        }

        // ENTER triggers search
        else if(e.keyCode === 13) {
            var v = e.target.value;
            this.props.history.replaceState(null, "/search/" + encodeURIComponent(v));
        }
    }

    // CHANGE SORT
    changeSort(e) {
        $(window).trigger("changeSort", {"sortBy": e.target.value});
    }

    // RENDER
	render() {

        // make sort group invisible when we are searching
        var sortGroupClass = "form-group sort-group";
        if(this.props.query) {
            sortGroupClass += " invisible";
        }

		return (
            <div className="row search-row">
				<div className="col-lg-4 col-md-3 col-sm-3"></div>
                <div className="col-lg-4 col-md-6 col-sm-6">
                    <div className="form-group label-floating is-empty">
                        <label className="control-label">Search for ...</label>
                        <input className="form-control" type="text" id="search-bar" onKeyUp={this.keyUp.bind(this)} />
                        <span className="material-input"></span>
                    </div>

                    <div className={sortGroupClass}>
                        <label className="sort-label control-label">Sort by:</label>
                        <input type="radio" onClick={this.changeSort.bind(this)} className="sort-option" name="sortby" value="subscribers" defaultChecked={this.props.sortBy === "subscribers"} />&nbsp;Subscribers
                        <input type="radio" onClick={this.changeSort.bind(this)} className="sort-option" name="sortby" value="upload" defaultChecked={this.props.sortBy === "upload"} />&nbsp;Last upload
                        <input type="radio" onClick={this.changeSort.bind(this)} className="sort-option" name="sortby" value="founded" defaultChecked={this.props.sortBy === "newest"} />&nbsp;Founded
                    </div>
                </div>
				<div className="col-lg-4 col-md-3 col-sm-3"></div>
            </div>
		);
	}
}

export default SearchBar;
