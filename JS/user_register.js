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
                    fullName: $("input[placeholder='Enter your full name']").val(),
                    mobileNumber: $("input[placeholder='Enter your phone number']").val(),
                    nicNumber: $("input[placeholder='Enter your nic']").val(),
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
                        Authorization: "Bearer " + "eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiZG9ub3IiLCJzdWIiOiJqYW5lLmRvZUBnbWFpbC5jb20iLCJpYXQiOjE3NDUxMzczMjQsImV4cCI6MTc0NjE3NDEyNH0.0HbqYUKDOIFGrzZ_aXWdh80M7jBRuRn7V6C1yS_sifUg1J0UUClR0gDnfGiWnEyySVg2klpif4pU-94NxVggWg"
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





