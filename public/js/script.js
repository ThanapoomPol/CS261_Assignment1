function validateUsername() {
	const username = document.getElementById("username").value;
	const usernameError = document.getElementById("usernameError");

	const isValid = /^\d{10}$/.test(username);

	if (!isValid) {
		usernameError.innerText = "Username must be exactly 10 digits.";
		document.getElementById("username").classList.add("is-invalid");
		return false;
	} else {
		usernameError.innerText = "";
		document.getElementById("username").classList.remove("is-invalid");
		return true;
	}
}

function openModal(data) {
	const modalContent =
		data.message != "Success"
			? `<p>The Username or Password is Incorrect.</p>`
			: ` 
			<p><strong>Username:</strong> ${data.username}</p>
			<p><strong>Name (English):</strong> ${data.displayname_en}</p>
			<p><strong>Name (Thai):</strong> ${data.displayname_th}</p>
			<p><strong>Email:</strong> ${data.email}</p>
			<p><strong>Faculty:</strong> ${data.faculty}</p>
			<p><strong>Department:</strong> ${data.department}</p>
			<p><strong>Role:</strong> ${data.type}</p>`;
	document.getElementById("modal").innerHTML = modalContent;
	var myModal = new bootstrap.Modal(document.getElementById("resultModal"));
	myModal.show();
}

function submitLogin(e) {
	e.preventDefault();

	if (!validateUsername()) return;

	const username = document.getElementById("username").value;
	const password = document.getElementById("password").value;

	fetch("/api/auth", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ username, password }),
	})
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			openModal(data);
		})
		.catch((error) => {
			console.error("Error:", error);
			openModal({ message: "An error occurred while processing your request." });
		});
}
