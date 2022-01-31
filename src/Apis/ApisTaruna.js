import axios from "axios";
import md5 from "md5";

axios.defaults.baseURL = process.env.REACT_APP_API_SERVER;

const logout = (context) => {
	context.setNotify(
		"dont",
		"Session token tidak valid",
		"mengalihkan ke login ulang ...",
		"red"
	);
	setTimeout(() => context.logout(), 3000);
};

export const loginTaruna = async (username, password, response) => {
	await axios("/apis/user", {
		method: "POST",
		headers: {
			Accept: "*/*",
			"Content-Type": "application/x-www-form-urlencoded",
		},
		data: {
			act: "getToken",
			username: username,
			password: md5(password),
		},
	})
		.then((res) => response(res))
		.catch((e) => response({ status: 400, msg: e.message }));
};

export const getDetailTaruna = async (context, response) => {
	await axios("/apis/user", {
		method: "POST",
		headers: {
			Accept: "*/*",
			"Content-Type": "application/x-www-form-urlencoded",
		},
		data: {
			act: "getDetailTaruna",
			username: context.user.user_id,
			token: context.user.user_lock,
		},
	})
		.then((res) =>
			res.data.error_code === 403 ? logout(context) : response(res)
		)
		.catch((e) => response({ status: 400, msg: e.message }));
};

export const getTahunAjar = async (context, cari, response) => {
	await axios("/apis/user", {
		method: "POST",
		headers: {
			Accept: "*/*",
			"Content-Type": "application/x-www-form-urlencoded",
		},
		data: {
			act: "getSemester",
			username: context.user.user_id,
			token: context.user.user_lock,
			payload: {
				nama_semester: cari,
			},
		},
	})
		.then((res) =>
			res.data.error_code === 403 ? logout(context) : response(res)
		)
		.catch((e) => response({ status: 400, msg: e.message }));
};

export const getLogTaruna = async (
	context,
	smt,
	filter,
	page,
	limit,
	response
) => {
	await axios("/apis/user?page=" + page, {
		method: "POST",
		headers: {
			Accept: "*/*",
			"Content-Type": "application/x-www-form-urlencoded",
		},
		data: {
			act: "getLogTaruna",
			username: context.user.user_id,
			token: context.user.user_lock,
			payload: {
				id_smt: smt === 0 ? "" : smt,
				string: filter,
				limit: limit,
			},
		},
	})
		.then((res) =>
			res.data.error_code === 403 ? logout(context) : response(res)
		)
		.catch((e) => response({ status: 400, msg: e.message }));
};

export const getRekapPoin = async (context, id_smt, response) => {
	await axios("/apis/user", {
		method: "POST",
		headers: {
			Accept: "*/*",
			"Content-Type": "application/x-www-form-urlencoded",
		},
		data: {
			act: "getRekapPoin",
			username: context.user.user_id,
			token: context.user.user_lock,
			payload: {
				id_smt: id_smt === 0 ? "" : id_smt,
			},
		},
	})
		.then((res) =>
			res.data.error_code === 403 ? logout(context) : response(res)
		)
		.catch((e) => response({ status: 400, msg: e.message }));
};

export const getKategori = async (context, string, response) => {
	await axios("/apis/user", {
		method: "POST",
		headers: {
			Accept: "*/*",
			"Content-Type": "application/x-www-form-urlencoded",
		},
		data: {
			act: "getKategori",
			username: context.user.user_id,
			token: context.user.user_lock,
			payload: {
				string: string,
			},
		},
	})
		.then((res) =>
			res.data.error_code === 403 ? logout(context) : response(res)
		)
		.catch((e) => response({ status: 400, msg: e.message }));
};

export const getPeristiwa = async (
	context,
	kategori,
	nama_peristiwa,
	page,
	limit,
	response
) => {
	await axios("/apis/user?page=" + page, {
		method: "POST",
		headers: {
			Accept: "*/*",
			"Content-Type": "application/x-www-form-urlencoded",
		},
		data: {
			act: "getPeristiwa",
			username: context.user.user_id,
			token: context.user.user_lock,
			payload: {
				id_kategori: kategori,
				string: nama_peristiwa,
				limit: limit,
			},
		},
	})
		.then((res) =>
			res.data.error_code === 403 ? logout(context) : response(res)
		)
		.catch((e) => response({ status: 400, msg: e.message }));
};

export const getDashboardCount = async (context, smt, response) => {
	await axios("/apis/user", {
		method: "POST",
		headers: {
			Accept: "*/*",
			"Content-Type": "application/x-www-form-urlencoded",
		},
		data: {
			act: "getDashboardCount",
			username: context.user.user_id,
			token: context.user.user_lock,
			payload: {
				id_smt: smt === 0 ? "" : smt,
			},
		},
	})
		.then((res) =>
			res.data.error_code === 403 ? logout(context) : response(res)
		)
		.catch((e) => response({ status: 400, msg: e.message }));
};

export const getDashboardData = async (
	context,
	smt,
	pelanggaran,
	limit,
	response
) => {
	await axios("/apis/user", {
		method: "POST",
		headers: {
			Accept: "*/*",
			"Content-Type": "application/x-www-form-urlencoded",
		},
		data: {
			act: "getDashboardData",
			username: context.user.user_id,
			token: context.user.user_lock,
			payload: {
				id_smt: smt === 0 ? "" : smt,
				pelanggaran: pelanggaran,
				limit: limit,
			},
		},
	})
		.then((res) =>
			res.data.error_code === 403 ? logout(context) : response(res)
		)
		.catch((e) => response({ status: 400, msg: e.message }));
};
