document.addEventListener('DOMContentLoaded', function () {
    $("#loginbtn").on("click", function (event) {

console.log("esdrtfhyuol")
        // Get the form data
        let formData = {
            email: $("#email").val(),
            password: $("#password").val()
        };

        // Send data using AJAX
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/api/v1/auth/authenticate",  // Your login endpoint here
            contentType: "application/json",  // Make sure to send JSON data
            dataType: "json",

            data: JSON.stringify(formData),  // Convert the data to JSON format
            success: function (response) {

                console.log("Login response:"+response)

                window.location.href = "admindashboard.html";
           /*     if (response.message === "success") {
                    // Handle success (e.g., redirect or display message)
                    alert("Login successful!");
                    window.location.href = "dashboard.html"; // Redirect to dashboard or homepage
                } else {
                    // Handle error (e.g., invalid credentials)
                    alert("Invalid credentials. Please try again.");
                }*/
            },
            error: function (xhr, status, error) {
                // Handle errors (e.g., server issues)
                console.error("Error:", xhr.responseText);
                alert("An error occurred. Please try again later.");
            }
        });
    });
});

    // Optional: Forgot Password Popup
    function showForgotPasswordPopup() {
    alert("Forgot password functionality to be implemented.");
}
