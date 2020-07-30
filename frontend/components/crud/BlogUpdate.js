import Link from "next/link";
import { useState, useEffect } from "react";
import Router from "next/router";
import { withRouter } from "next/router";
import { getCookie, isAuth } from "../../actions/auth";
import { getCategories } from "../../actions/category";
import { getTags } from "../../actions/tag";
import { singleBlog, updateBlog } from "../../actions/blog";
import { API } from "../../config";
import axios from "axios";

const BlogUpdate = ({ router }) => {
	const [categories, setCategories] = useState([]);
	const [tags, setTags] = useState([]);
	const [blogId, setblogId] = useState("");
	const [checked, setChecked] = useState([]); // categories
	const [checkedTag, setCheckedTag] = useState([]); // tags
	const [request, setRequest] = useState(false);
	const [values, setValues] = useState({
		title: "",
		error: "",
		body: "",
		success: "",
		formData: "",
		title: "",
		body: "",
	});
	const { error, success, formData, title, body } = values;
	const token = getCookie("token");

	useEffect(() => {
		setValues({ ...values, formData: new FormData() });
		initBlog();
		initCategories();
		initTags();
	}, [router]);

	const initBlog = () => {
		if (router.query.slug) {
			singleBlog(router.query.slug).then((data) => {
				if (data.error) {
					console.log(data.error);
				} else {
					setValues({ ...values, title: data.title, body: data.body });
					// setBody(data.body);
					setCategoriesArray(data.categories);
					setTagsArray(data.tags);
				}
			});
		}
	};

	const setCategoriesArray = (blogCategories) => {
		let ca = [];
		blogCategories.map((c, i) => {
			ca.push(c._id);
		});
		setChecked(ca);
	};

	const setTagsArray = (blogTags) => {
		let ta = [];
		blogTags.map((t, i) => {
			ta.push(t._id);
		});
		setCheckedTag(ta);
	};

	const initCategories = () => {
		getCategories().then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				setCategories(data);
			}
		});
	};

	const initTags = () => {
		getTags().then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				setTags(data);
			}
		});
	};

	const handleToggle = (c) => () => {
		setValues({ ...values, error: "" });
		// return the first index or -1
		const clickedCategory = checked.indexOf(c);
		const all = [...checked];

		if (clickedCategory === -1) {
			all.push(c);
		} else {
			all.splice(clickedCategory, 1);
		}
		console.log(all);
		setChecked(all);
		formData.set("categories", all);
	};

	const handleTagsToggle = (t) => () => {
		setValues({ ...values, error: "" });
		// return the first index or -1
		const clickedTag = checkedTag.indexOf(t);
		const all = [...checkedTag];

		if (clickedTag === -1) {
			all.push(t);
		} else {
			all.splice(clickedTag, 1);
		}
		console.log(all);
		setCheckedTag(all);
		formData.set("tags", all);
	};

	const findOutCategory = (c) => {
		const result = checked.indexOf(c);
		if (result !== -1) {
			return true;
		} else {
			return false;
		}
	};

	const findOutTag = (t) => {
		const result = checkedTag.indexOf(t);
		if (result !== -1) {
			return true;
		} else {
			return false;
		}
	};

	const showCategories = () => {
		return (
			categories &&
			categories.map((c, i) => (
				<li key={i} className="list-unstyled">
					<input
						onChange={handleToggle(c._id)}
						checked={findOutCategory(c._id)}
						type="checkbox"
						className="mr-2"
					/>
					<label className="form-check-label">{c.name}</label>
				</li>
			))
		);
	};

	const showTags = () => {
		return (
			tags &&
			tags.map((t, i) => (
				<li key={i} className="list-unstyled">
					<input
						onChange={handleTagsToggle(t._id)}
						checked={findOutTag(t._id)}
						type="checkbox"
						className="mr-2"
					/>
					<label className="form-check-label">{t.name}</label>
				</li>
			))
		);
	};

	const handleChange = (name) => (e) => {
		// console.log(e.target.value);
		const value = name === "photo" ? e.target.files[0] : e.target.value;
		formData.set(name, value);
		setValues({ ...values, [name]: value, formData, error: "" });
	};

	const editBlog = (e) => {
		e.preventDefault();
		updateBlog(formData, token, router.query.slug).then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error });
			} else {
				setValues({
					...values,
					title: "",
					success: `Blog titled "${data.title}" is successfully updated`,
				});
				setRequest(false);
				if (isAuth() && isAuth().role === 1) {
					// Router.replace(`/admin/crud/${router.query.slug}`);
					Router.replace(`/admin`);
				} else if (isAuth() && isAuth().role === 0) {
					// Router.replace(`/user/crud/${router.query.slug}`);
					Router.replace(`/user`);
				}
			}
		});
	};

	const showError = () => (
		<div
			className="alert alert-danger"
			style={{ display: error ? "" : "none" }}
		>
			{error}
		</div>
	);

	const showSuccess = () => (
		<div
			className="alert alert-success"
			style={{ display: success ? "" : "none" }}
		>
			{success}
		</div>
	);

	const convertPdf = () => {
		axios.get(`${API}/pdf/convert/${router.query.slug}`).then((res, err) => {
			console.log(res);
			setRequest(true);
			setblogId(res.data);
		});
	};

	const updateBlogForm = () => {
		return (
			<>
				<form onSubmit={editBlog}>
					<div className="form-group">
						<label className="text-muted">Title</label>
						<input
							type="text"
							className="form-control"
							value={title}
							onChange={handleChange("title")}
						/>
					</div>

					<div className="form-group">
						<textarea
							style={{ height: 700 }}
							className="form-control"
							value={body}
							placeholder="Write something amazing..."
							onChange={handleChange("body")}
						/>
					</div>

					<div className="col-4">
						<button type="submit" className="btn btn-primary">
							Update
						</button>
					</div>
				</form>
				<div className="pt-1 col-4">
					<button className="btn btn-warning" onClick={convertPdf}>
						Convert to Pdf
					</button>
				</div>
			</>
		);
	};

	return (
		<div className="container-fluid pb-5">
			<div className="row">
				<div className="col-md-8">
					{request && (
						<div
							className="alert alert-warning d-flex justify-content-between"
							role="alert"
						>
							<div className="pt-2">
								The pdf download{" "}
								<a
									href={`https://mdstoragenew.s3.ap-southeast-2.amazonaws.com/folder/${blogId}.pdf`}
									class="alert-link"
								>
									link
								</a>{" "}
								is here. Give it a click if you like.
							</div>
							<button
								className="btn btn-danger ml-5"
								onClick={() => {
									setRequest(false);
								}}
							>
								X
							</button>
						</div>
					)}
					{updateBlogForm()}

					<div className="pt-3">
						{showSuccess()}
						{showError()}
					</div>

					{body && (
						<img
							src={`${API}/blog/photo/${router.query.slug}`}
							alt={title}
							style={{ width: "100%" }}
						/>
					)}
				</div>

				<div className="col-md-4">
					<div>
						<div className="form-group pb-2">
							<h5>Featured image</h5>
							<hr />

							<small className="text-muted">Max size: 1mb</small>
							<br />
							<label className="btn btn-outline-info">
								Upload featured image
								<input
									onChange={handleChange("photo")}
									type="file"
									accept="image/*"
									hidden
								/>
							</label>
						</div>
					</div>
					<div>
						<h5>Categories</h5>
						<hr />

						<ul style={{ maxHeight: "200px", overflowY: "scroll" }}>
							{showCategories()}
						</ul>
					</div>
					<div>
						<h5>Tags</h5>
						<hr />
						<ul style={{ maxHeight: "200px", overflowY: "scroll" }}>
							{showTags()}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default withRouter(BlogUpdate);
