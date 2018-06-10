import { BrowserRouter } from "react-router-dom";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

export default class OwnBrowserRouter extends BrowserRouter {
	history;
}
