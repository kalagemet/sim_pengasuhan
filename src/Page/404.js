import { Header, Image, Segment } from "semantic-ui-react";
import img from "../Assets/image/404.png";

export default function NotFound() {
	return (
		<Segment vertical textAlign="center" className="404-page">
			<Image
				style={{ paddingTop: 50 }}
				verticalAlign="middle"
				centered
				size="medium"
				src={img}
			/>
			<Header style={{ width: "100%", opacity: 0.5 }} as="h1" icon>
				{/* <Icon name="warning circle" /> */}
				404
				<Header.Subheader>
					Halaman yang anda tuju tidak tersedia
				</Header.Subheader>
			</Header>
		</Segment>
	);
}
