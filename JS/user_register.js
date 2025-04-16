
function registerUser(event) {
    event.preventDefault(); // Prevent form from submitting the traditional way

      /*  $(document).ready(function () {
            $("#registrationForm").register(function (event) {
                event.preventDefault(); // Prevent default form submission*/
                console.log("Registration form submitted");

                let user = {
                    username: $("input[placeholder='Choose a username']").val(),
                    email: $("input[placeholder='Enter your email']").val(),
                    password: $("#password").val(),
                    role: "USER",
                };
                console.log(user)

                $.ajax({
                    type: "POST",
                    url: 'http://localhost:8080/api/v1/user/register',
                    contentType: "application/json",
                    data:JSON.stringify(user),
                    dataType: "json",
                    headers: {
                        Authorization: "Bearer " +"eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoidXNlciIsInN1YiI6InVzZXJAZXhhbXBsZS5jb20iLCJpYXQiOjE3NDM5MjE2MTQsImV4cCI6MTc0NDk1ODQxNH0.39sBbE25H79CxXFwPxuniNn_prGRRBgox29lX74MfomMjyNBn3dv6dVR6-vwUgWtyEp73xHmcVmK3IRHJjN6Ag"
                    },
                    success: function (response) {
                        alert(response.message);
                            //window.location.href = "UserRegister.html"; // Redirect on success

                        console.log(response+"dsfghjk");
                    },
                    error: function () {
                        alert("Registration failed. Please try again.");
                    }
                });
}





