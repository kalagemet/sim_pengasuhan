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

export const login = async (username, password, response) => {
	await axios("/apis", {
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

export const getTahunAjar = async (context, cari, response) => {
	await axios("/apis", {
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

export const setTahunAjar = async (context, id, response) => {
	await axios("/apis", {
		method: "POST",
		headers: {
			Accept: "*/*",
			"Content-Type": "application/x-www-form-urlencoded",
		},
		data: {
			act: "setSemester",
			username: context.user.user_id,
			token: context.user.user_lock,
			record: {
				id_semester: id,
			},
		},
	})
		.then((res) =>
			res.data.error_code === 403 ? logout(context) : response(res)
		)
		.catch((e) => response({ status: 400, msg: e.message }));
};

export const getProdi = async (context, response) => {
	await axios("/apis", {
		method: "POST",
		headers: {
			Accept: "*/*",
			"Content-Type": "application/x-www-form-urlencoded",
		},
		data: {
			act: "getProdi",
			username: context.user.user_id,
			token: context.user.user_lock,
		},
	})
		.then((res) =>
			res.data.error_code === 403 ? logout(context) : response(res)
		)
		.catch((e) => response({ status: 400, msg: e.message }));
};

export const getAngkatan = async (context, prodi, response) => {
	await axios("/apis", {
		method: "POST",
		headers: {
			Accept: "*/*",
			"Content-Type": "application/x-www-form-urlencoded",
		},
		data: {
			act: "getAngkatan",
			username: context.user.user_id,
			token: context.user.user_lock,
			payload: {
				kode_prodi: prodi,
			},
		},
	})
		.then((res) =>
			res.data.error_code === 403 ? logout(context) : response(res)
		)
		.catch((e) => response({ status: 400, msg: e.message }));
};

export const getKelas = async (context, prodi, angkatan, response) => {
	await axios("/apis", {
		method: "POST",
		headers: {
			Accept: "*/*",
			"Content-Type": "application/x-www-form-urlencoded",
		},
		data: {
			act: "getKelas",
			username: context.user.user_id,
			token: context.user.user_lock,
			payload: {
				kode_prodi: prodi,
				kode_angkatan: angkatan,
			},
		},
	})
		.then((res) =>
			res.data.error_code === 403 ? logout(context) : response(res)
		)
		.catch((e) => response({ status: 400, msg: e.message }));
};

export const getTaruna = async (
	context,
	prodi,
	angkatan,
	kelas,
	string,
	limit,
	page,
	response
) => {
	await axios("/apis?page=" + page, {
		method: "POST",
		headers: {
			Accept: "*/*",
			"Content-Type": "application/x-www-form-urlencoded",
		},
		data: {
			act: "getTaruna",
			username: context.user.user_id,
			token: context.user.user_lock,
			payload: {
				kode_prodi: prodi,
				kode_angkatan: angkatan,
				kode_kelas: kelas,
				string: string,
				limit: limit,
			},
		},
	})
		.then((res) =>
			res.data.error_code === 403 ? logout(context) : response(res)
		)
		.catch((e) => response({ status: 400, msg: e.message }));
};

export const getKategori = async (context, string, response) => {
	await axios("/apis", {
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

export const insertPeristiwa = async (context, record, response) => {
	await axios("/apis", {
		method: "POST",
		headers: {
			Accept: "*/*",
			"Content-Type": "application/x-www-form-urlencoded",
		},
		data: {
			act: "insertPeristiwa",
			username: context.user.user_id,
			token: context.user.user_lock,
			record: {
				id_user: context.user.identity,
				id_kategori: record.subPeristiwa,
				nama_peristiwa: record.nama_peristiwa,
				poin: record.poin,
				poin_tambahan: record.poin_tambahan,
			},
		},
	})
		.then((res) =>
			res.data.error_code === 403 ? logout(context) : response(res)
		)
		.catch((e) => response({ status: 400, msg: e.message }));
};

export const updatePeristiwa = async (context, record, response) => {
	await axios("/apis", {
		method: "POST",
		headers: {
			Accept: "*/*",
			"Content-Type": "application/x-www-form-urlencoded",
		},
		data: {
			act: "updatePeristiwa",
			username: context.user.user_id,
			token: context.user.user_lock,
			record: {
				id: record.id,
				id_user: context.user.identity,
				id_kategori: record.subPeristiwa,
				nama_peristiwa: record.nama_peristiwa,
				poin: record.poin,
				poin_tambahan: record.poin_tambahan ? 1 : 0,
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
	await axios("/apis?page=" + page, {
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

export const hapusPeristiwa = async (context, id, response) => {
	await axios("/apis", {
		method: "POST",
		headers: {
			Accept: "*/*",
			"Content-Type": "application/x-www-form-urlencoded",
		},
		data: {
			act: "deletePeristiwa",
			username: context.user.user_id,
			token: context.user.user_lock,
			record: {
				id: id,
			},
		},
	})
		.then((res) =>
			res.data.error_code === 403 ? logout(context) : response(res)
		)
		.catch((e) => response({ status: 400, msg: e.message }));
};

export const entriPoin = async (context, record = [], response) => {
	await axios("/apis", {
		method: "POST",
		headers: {
			Accept: "*/*",
			"Content-Type": "application/x-www-form-urlencoded",
		},
		data: {
			act: "entriPoin",
			username: context.user.user_id,
			token: context.user.user_lock,
			record: record,
		},
	})
		.then((res) =>
			res.data.error_code === 403 ? logout(context) : response(res)
		)
		.catch((e) => response({ status: 400, msg: e.message }));
};

export const getEntri = async (
	context,
	kategori,
	startDate,
	endDate,
	page,
	limit,
	response
) => {
	await axios("/apis?page=" + page, {
		method: "POST",
		headers: {
			Accept: "*/*",
			"Content-Type": "application/x-www-form-urlencoded",
		},
		data: {
			act: "getEntri",
			username: context.user.user_id,
			token: context.user.user_lock,
			payload: {
				id_kategori: kategori,
				startDate: startDate,
				endDate: endDate,
				limit: limit,
			},
		},
	})
		.then((res) =>
			res.data.error_code === 403 ? logout(context) : response(res)
		)
		.catch((e) => response({ status: 400, msg: e.message }));
};

export const getRecord = async (context, id_entri, response) => {
	await axios("/apis", {
		method: "POST",
		headers: {
			Accept: "*/*",
			"Content-Type": "application/x-www-form-urlencoded",
		},
		data: {
			act: "getRecord",
			username: context.user.user_id,
			token: context.user.user_lock,
			payload: {
				id_entri: id_entri,
			},
		},
	})
		.then((res) =>
			res.data.error_code === 403 ? logout(context) : response(res)
		)
		.catch((e) => response({ status: 400, msg: e.message }));
};

export const updateEntri = async (context, id_entri, array, response) => {
	await axios("/apis", {
		method: "POST",
		headers: {
			Accept: "*/*",
			"Content-Type": "application/x-www-form-urlencoded",
		},
		data: {
			act: "editEntriPoin",
			username: context.user.user_id,
			token: context.user.user_lock,
			record: {
				id_entri: id_entri,
				taruna: array.taruna,
				peristiwa: array.peristiwa,
			},
		},
	})
		.then((res) =>
			res.data.error_code === 403 ? logout(context) : response(res)
		)
		.catch((e) => response({ status: 400, msg: e.message }));
};

export const getLog = async (
	context,
	smt,
	string,
	startDate,
	endDate,
	page,
	limit,
	response
) => {
	await axios("/apis?page=" + page, {
		method: "POST",
		headers: {
			Accept: "*/*",
			"Content-Type": "application/x-www-form-urlencoded",
		},
		data: {
			act: "getLog",
			username: context.user.user_id,
			token: context.user.user_lock,
			payload: {
				id_smt: smt,
				string: string,
				startDate: startDate,
				endDate: endDate,
				limit: limit,
			},
		},
	})
		.then((res) =>
			res.data.error_code === 403 ? logout(context) : response(res)
		)
		.catch((e) => response({ status: 400, msg: e.message }));
};

export const getDetailPeristiwa = async (context, id_peristiwa, response) => {
	await axios("/apis", {
		method: "POST",
		headers: {
			Accept: "*/*",
			"Content-Type": "application/x-www-form-urlencoded",
		},
		data: {
			act: "getDetailPeristiwa",
			username: context.user.user_id,
			token: context.user.user_lock,
			payload: {
				id_peristiwa: id_peristiwa,
			},
		},
	})
		.then((res) =>
			res.data.error_code === 403 ? logout(context) : response(res)
		)
		.catch((e) => response({ status: 400, msg: e.message }));
};

export const getLogPeristiwa = async (
	context,
	id_peristiwa,
	smt,
	page,
	limit,
	response
) => {
	await axios("/apis?page=" + page, {
		method: "POST",
		headers: {
			Accept: "*/*",
			"Content-Type": "application/x-www-form-urlencoded",
		},
		data: {
			act: "getLogPeristiwa",
			username: context.user.user_id,
			token: context.user.user_lock,
			payload: {
				id_peristiwa: id_peristiwa,
				id_smt: smt,
				limit: limit,
			},
		},
	})
		.then((res) =>
			res.data.error_code === 403 ? logout(context) : response(res)
		)
		.catch((e) => response({ status: 400, msg: e.message }));
};

export const getRiwayatPeristiwa = async (
	context,
	id_peristiwa,
	smt,
	filter,
	page,
	limit,
	response
) => {
	await axios("/apis?page=" + page, {
		method: "POST",
		headers: {
			Accept: "*/*",
			"Content-Type": "application/x-www-form-urlencoded",
		},
		data: {
			act: "getRiwayatPeristiwa",
			username: context.user.user_id,
			token: context.user.user_lock,
			payload: {
				id_peristiwa: id_peristiwa,
				id_smt: smt,
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

export const getDetailTaruna = async (context, id_taruna, response) => {
	await axios("/apis", {
		method: "POST",
		headers: {
			Accept: "*/*",
			"Content-Type": "application/x-www-form-urlencoded",
		},
		data: {
			act: "getDetailTaruna",
			username: context.user.user_id,
			token: context.user.user_lock,
			payload: {
				id_taruna: id_taruna,
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
	id_taruna,
	smt,
	filter,
	page,
	limit,
	response
) => {
	await axios("/apis?page=" + page, {
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
				id_taruna: id_taruna,
				id_smt: smt === 0 ? "/" : smt,
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

export const getDashboardCount = async (
	context,
	prodi,
	angkatan,
	kelas,
	response
) => {
	await axios("/apis", {
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
				kode_prodi: prodi,
				kode_angkatan: angkatan,
				kode_kelas: kelas,
			},
		},
	})
		.then((res) =>
			res.data.error_code === 403 ? logout(context) : response(res)
		)
		.catch((e) => response({ status: 400, msg: e.message }));
};

export const getDashboardDaftarTaruna = async (
	context,
	prodi,
	angkatan,
	kelas,
	string,
	limit,
	page,
	response
) => {
	await axios("/apis?page=" + page, {
		method: "POST",
		headers: {
			Accept: "*/*",
			"Content-Type": "application/x-www-form-urlencoded",
		},
		data: {
			act: "getDashboardDaftarTaruna",
			username: context.user.user_id,
			token: context.user.user_lock,
			payload: {
				kode_prodi: prodi,
				kode_angkatan: angkatan,
				kode_kelas: kelas,
				predikat: string,
				limit: limit,
			},
		},
	})
		.then((res) =>
			res.data.error_code === 403 ? logout(context) : response(res)
		)
		.catch((e) => response({ status: 400, msg: e.message }));
};

export const getRekapPoin = async (context, id_taruna, id_smt, response) => {
	await axios("/apis", {
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
				id_taruna: id_taruna,
				id_smt: id_smt === 0 ? "/" : id_smt,
			},
		},
	})
		.then((res) =>
			res.data.error_code === 403 ? logout(context) : response(res)
		)
		.catch((e) => response({ status: 400, msg: e.message }));
};
