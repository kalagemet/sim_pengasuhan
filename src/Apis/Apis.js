import md5 from "md5";

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
				id: username,
			},
		})
	);
	await fetch(process.env.REACT_APP_API_SERVER, {
		method: "POST",
		body: formData,
	})
		.then((data) => data.json())
		.then((data) => response({ error: false, ...data }))
		.catch((e) => response({ error: true, ...e }));
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
	await fetch(`${process.env.REACT_APP_API_SERVER}`, {
		method: "POST",
		body: formData,
	})
		.then((data) => data.json())
		.then((data) => response({ error: false, ...data }))
		.catch((e) => response({ error: true, ...e }));
};
