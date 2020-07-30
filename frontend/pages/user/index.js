import Layout from "../../components/Layout";
import Private from "../../components/auth/Private";
import Link from "next/link";

const UserIndex = () => {
	return (
		<Layout>
			<Private>
				<div className="container ">
					<div className="row justify-content-center d-flex">
						<div className="col-8 pt-5 pb-5 text-center">
							<h2>User Dashboard</h2>
						</div>
						<div className="col-8">
							<ul class="list-group">
								<li className="list-group-item">
									<a href="/user/crud/blog">Create Blog</a>
								</li>

								<li className="list-group-item">
									<Link href="/user/crud/blogs">
										<a>Update/Delete Blog</a>
									</Link>
								</li>

								<li className="list-group-item">
									<a href="/user/update">Update profile</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</Private>
		</Layout>
	);
};

export default UserIndex;
