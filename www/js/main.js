function logout()
{
    localStorage.removeItem('userId');
    window.location = "index.html";
}
