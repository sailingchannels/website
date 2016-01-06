import React from "react";
import LanguageActions from "../actions/LanguageActions";
import LanguageStore from "../stores/LanguageStore";

class LanguagePicker extends React.Component {

    // CONSTRUCTOR
	constructor(props) {
		super(props);
		this.state = LanguageStore.getState();
		this.onChange = this.onChange.bind(this);
	}

	// COMPONENT DID MOUNT
	componentDidMount() {
		LanguageStore.listen(this.onChange);

        var defaultLanguage = "en";

        // if no cookie exists yet, set the language to default english
        if(!Cookies.get("channel-language")) {

            Cookies.set("channel-language", defaultLanguage);
            this.setState({
                "selectedLanguage": defaultLanguage
            });
        }
        else {
            this.setState({
                "selectedLanguage": Cookies.get("channel-language")
            });
        }

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
            "selectedLanguage": e.target.value
        });
    }

    // RENDER
	render() {

        console.log(this.state.selectedLanguage);

        var langOptions = [];
        for(var l in this.state.languages) {
            var ll = this.state.languages[l];

            if(ll.code === this.state.selectedLanguage) {
                langOptions.push(
                    <option key={ll.code} value={ll.code} selected>{ll.name}</option>
                );
            }
            else {
                langOptions.push(
                    <option key={ll.code} value={ll.code}>{ll.name}</option>
                );
            }
        }

		return (
            <select className="form-control language-picker" data-dropdownjs="true" onChange={this.setLanguage.bind(this)}>
              {langOptions}
            </select>
		);
	}
}

export default LanguagePicker;
