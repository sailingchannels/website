import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { LANGUAGES_QUERY } from "./gql";
import Language from "../../entities/Language";
import { useLocalStorage, writeStorage } from "@rehooks/local-storage";
import { LANGUAGE_SETTING_KEY, DEFAULT_LANGUAGE } from "../../Constants";

export default function LanguageSelect() {
	//#region Hooks

	// load main menu items via graphql
	const { loading, error, data } = useQuery(LANGUAGES_QUERY, {
		fetchPolicy: "cache-first"
	});

	// load selected language from local storage
	const [selectedLanguage] = useLocalStorage<string>(LANGUAGE_SETTING_KEY);

	//#endregion

	//#region Functions

	/**
	 * Stores a new language code after selection changed
	 * @param event Select onChange event
	 */
	function changeLanguage(event) {
		writeStorage<string>(LANGUAGE_SETTING_KEY, event.target.value);
	}

	//#endregion

	if (loading || !data) return null;

	return (
		<div className="select">
			<select onChange={changeLanguage} value={selectedLanguage || DEFAULT_LANGUAGE}>
				{data.languages.map((language: Language) => {
					return (
						<option key={language.code} value={language.code}>
							{language.name}
						</option>
					);
				})}
			</select>
		</div>
	);
}
