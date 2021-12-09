import axios from "axios";
import md5 from "md5";

axios.defaults.baseURL = process.env.REACT_APP_API_SERVER;

export const login = async (username, password, response) => {
	let ts = new Date().toString();
	var formData = new FormData();
	formData.append(
		"post_data",
		JSON.stringify({
			isAuth: "logged",
			verb: "get_data_user_single",
			id: username,
			tSign: ts,
			token: md5(md5(password) + ts),
			special: 0,
			operation: "read",
			payload: {
				is_direct: 1,
				is_multiple: 0,
				is_filtered: 0,
				filter: { key1: "f_id" },
				term: "admin",
				is_and: "0",
				count: "10",
				page: "1",
			},
		})
	);
	await axios("/", {
		method: "POST",
		data: formData,
	})
		.then((res) => response(res))
		.catch((e) => response({ status: 400, msg: e.message }));
};

export const getTahunAjar = async (context, cari, response) => {
	let ts = new Date().toString();
	var formData = new FormData();
	formData.append(
		"post_data",
		JSON.stringify({
			isAuth: "logged",
			verb: "get_tahun_ajaran_semua",
			id: context.user.f_id,
			tSign: ts,
			token: md5(context.user.user_lock + ts),
			special: 0,
			operation: "read",
			payload: {
				is_direct: 1,
				is_filtered: 0,
				filter: { key1: "t.no_tahun" },
				term: cari,
				count: "10",
				page: "1",
			},
		})
	);
	await axios("/", {
		method: "POST",
		data: formData,
	})
		.then((res) => response(res))
		.catch((e) => response({ status: 400, msg: e.message }));
};

export const getFilterKategori = async (context, cari, response) => {
	let ts = new Date().toString();
	var formData = new FormData();
	formData.append(
		"post_data",
		JSON.stringify({
			isAuth: "logged",
			verb: "get_kategori",
			id: context.user.f_id,
			tSign: ts,
			token: md5(context.user.user_lock + ts),
			special: 0,
			operation: "read",
			payload: {
				is_direct: 1,
				is_filtered: 0,
				filter: { key1: "nama_kategori" },
				term: cari,
				count: "10",
				page: "1",
			},
		})
	);
	await axios("/", {
		method: "POST",
		data: formData,
	})
		.then((res) => response(res))
		.catch((e) => response({ status: 400, msg: e.message }));
};
