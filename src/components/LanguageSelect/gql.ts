import gql from "graphql-tag";

export const LANGUAGES_QUERY = gql`
	query Languages {
		languages {
			name
			code
		}
	}
`;
