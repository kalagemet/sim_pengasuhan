import { useEffect, useState } from "react";
import { Segment } from "semantic-ui-react";

export default function RequiredApi() {
	const [api, setApi] = useState();
	useEffect(() => {
		fetch("./required_api_pengasuhan.jsonc")
			.then((text) => text.text())
			.then((text) => {
				setApi(text);
			});
	});
	return (
		<Segment inverted className="page-content-segment">
			<div>
				<pre>{api}</pre>
			</div>
		</Segment>
	);
}
