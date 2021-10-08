import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { LANGUAGES_QUERY } from "./gql";
import Language from "../../entities/Language";
import { useLocalStorage, writeStorage } from "@rehooks/local-storage";
import { LANGUAGE_SETTING_KEY, DEFAULT_LANGUAGE } from "../../Constants";
import useGoogleAnalyticsEvent from "../../hooks/useGoogleAnalyticsEvent";

export default function LanguageSelect() {
	const { loading, error, data } = useQuery(LANGUAGES_QUERY, {
		fetchPolicy: "cache-first"
	});

	const [selectedLanguage] = useLocalStorage<string>(LANGUAGE_SETTING_KEY);
	const trackGAEvent = useGoogleAnalyticsEvent();

	function changeLanguage(event) {
		writeStorage<string>(LANGUAGE_SETTING_KEY, event.target.value);
		trackGAEvent("User", "Change Language", event.target.value);
	}

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
