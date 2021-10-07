import React, { useEffect, useState } from "react";
import { useLocalStorage, writeStorage } from "@rehooks/local-storage";
import {
	SPONSOR_MODAL_ACTIVATION_COUNTER_KEY,
	SPONSOR_MODEL_ACTIVATION_COUNTER_THRESHOLD
} from "../../Constants";
import classNames from "classnames";

const SponsorModal = () => {
	const [isActive, setIsActive] = useState(false);
	const [sponsorModalActivationCounter] = useLocalStorage<number>(SPONSOR_MODAL_ACTIVATION_COUNTER_KEY);

	useEffect(() => {
		const updatedSponsorModalActivationCounter =
			((sponsorModalActivationCounter || 0) % SPONSOR_MODEL_ACTIVATION_COUNTER_THRESHOLD) + 1;

		writeStorage<number>(SPONSOR_MODAL_ACTIVATION_COUNTER_KEY, updatedSponsorModalActivationCounter);

		if (updatedSponsorModalActivationCounter == 2) {
			setIsActive(true);
		}
	}, []);

	const modelClasses = classNames({
		modal: true,
		"is-active": isActive
	});

	return (
		<div className={modelClasses}>
			<div className="modal-background"></div>
			<div className="modal-card">
				<header className="modal-card-head">
					<p className="modal-card-title">Support us!</p>
					<button className="delete" aria-label="close" onClick={() => setIsActive(false)}></button>
				</header>
				<section className="modal-card-body has-text-centered">
					<div style={{ marginBottom: "0.25rem" }}>
						This website was created by the{" "}
						<a href="/#/channel/UCZbZeC2OfdVMwm9AR_zu0_g" target="_blank">
							Two aboard Tuuli
						</a>{" "}
						crew for you to enjoy.
					</div>
					<div style={{ marginBottom: "0.25rem" }}>
						Maintaining this website costs time and money.
					</div>
					<div style={{ marginBottom: "2rem" }}>
						If you like this overview of sailing channels, please consider supporting the project:
					</div>
					<nav className="level" style={{ marginBottom: "1rem" }}>
						<div className="level-item has-text-centered">
							<a
								href="https://www.patreon.com/bePatron?u=2839847"
								target="_blank"
								className="button is-danger is-rounded is-medium"
							>
								<i className="fab fa-patreon fa-fw"></i> Become a patron
							</a>
						</div>
						<div className="level-item has-text-centered">
							<a
								href="https://paypal.me/sailingchannels"
								target="_blank"
								className="button is-info is-rounded is-medium"
							>
								<i className="fab fa-paypal fa-fw"></i>PayPal donation
							</a>
						</div>
					</nav>
				</section>
			</div>
		</div>
	);
};

export default SponsorModal;
