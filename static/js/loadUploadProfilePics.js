// const hostname = "http://localhost:8000";
// async fun() to get profile pic thumb url
const getProfileThumbUrl = () => {
	return fetch(hostname + "/api/profile_pic/?thumb=True", {
		method: "GET",
	})
		.then((res) => res.json())
		.then((data) => {
			return data.url;
		});
};

// async function for getting profile pic url
const getProfilePicUrl = () => {
	return fetch(hostname + "/api/profile_pic/", {
		method: "GET",
	})
		.then((res) => res.json())
		.then((data) => {
			return data.url;
		})
		.catch((err) => console.error(err));
};

const renderProfilePics = () => {
	var img = document.getElementById("img");
	var pic = document.getElementById("pic");
	if (window.location.search == "") {
		getProfilePicUrl().then((data) => {
			pic.setAttribute("src", data);
		});
		getProfileThumbUrl().then((url) => {
			img.setAttribute("src", url);
		});
	} else {
		getProfileThumbUrl().then((url) => {
			img.setAttribute("src", url);
		});
	}
};

const uploadPic = (fd) => {
	return axios
		.put(hostname + "/api/profile_pic/", fd, {
			headers: {
				"X-CSRFToken": getCookie("csrftoken"),
			},
		})
		.then((res) => res.data)
		.catch((err) => err);
};

const uploadImageAxios = () => {
	var fd = new FormData();
	var file = $("#pic_input")[0].files[0];
	fd.append("pic", file, file.name);
	uploadPic(fd)
		.then(() => renderProfilePics())
		.catch((err) => console.log(err));
};

if (window.location.pathname == "/profile/home/") renderProfilePics();
