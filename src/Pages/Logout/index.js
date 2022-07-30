const Logout = () => {
    document.cookie = `token = `;
    window.location.href = "/login";
  };
  
  export default Logout;