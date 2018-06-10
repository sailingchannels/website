/**
 *
 * Asynchronously loads the component for DetailTableRow
 *
 */

import Loadable from "react-loadable";

export default Loadable({
	loader: () => import("./index"),
	loading: () => null
});
