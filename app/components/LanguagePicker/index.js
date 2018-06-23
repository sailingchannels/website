import React from "react";
import LanguageActions from "actions/LanguageActions";
import LanguageStore from "stores/LanguageStore";
import Cookies from "js-cookie";
import $ from "jquery";

import "./LanguagePicker.css";

class LanguagePicker extends React.PureComponent {
	// CONSTRUCTOR
	constructor(props) {
		super(props);
		this.state = LanguageStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	// COMPONENT DID MOUNT
	componentDidMount() {
		LanguageStore.listen(this.onChange);

		LanguageActions.getLanguages();
	}

	// COMPONENT WILL UNMOUNT
	componentWillUnmount() {
		LanguageStore.unlisten(this.onChange);
	}

	// ON CHANGE
	onChange(state) {
		this.setState(state);
	}

	// SET LANGUAGE
	setLanguage(e) {
		Cookies.set("channel-language", e.target.value);
		this.setState({
			selectedLanguage: e.target.value
		});

		// make channel list rerender
		$(window).trigger("rerenderList");
	}

	// RENDER
	render() {
		return (
			<select
				className="form-control language-picker"
				data-dropdownjs="true"
				value={this.state.selectedLanguage}
				onChange={this.setLanguage.bind(this)}
			>
				{this.state.languages.map((l) => (
					<option key={l.code} value={l.code}>
						{l.name}
					</option>
				))}
			</select>
		);
	}
}

export default LanguagePicker;
