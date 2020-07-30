import Layout from "../../components/Layout";
import React from "react";
import { Jumbotron, Container } from "reactstrap";

const MarkdownAbout = () => {
	return (
		<>
			<Layout>
				<Jumbotron>
					<h1 className="display-3">Markdown Notetaker</h1>
					<p className="lead">
						This application was inspired by the simplicity of markdown files.
						You can use this note taking application to quickly take notes and
						store them online.
					</p>
					<hr className="my-2" />
					<p>
						Below is a small cheatsheat of basic Markdown commands. Learn more
						about the simplicity of Markdown{" "}
						<a href="https://www.markdownguide.org/">Here</a>! Or click this{" "}
						<a href="https://www.markdowntutorial.com/lesson/1/">link</a> for an
						indepth guided Markdown exercise!
					</p>
					<Container>
						<img
							src="../../static/images/MDCheatsheet.png"
							class="img-fluid mx-auto"
						/>
					</Container>
				</Jumbotron>
			</Layout>
		</>
	);
};

export default MarkdownAbout;
