function handleLogin(e) {
    e.preventDefault();
    const user = document.getElementById("login-username").value;
    localStorage.setItem("user", JSON.stringify({ username: user, name: user.toUpperCase() }));
    alert("Đăng nhập thành công!");
    window.location.href = "../index.html";
}
