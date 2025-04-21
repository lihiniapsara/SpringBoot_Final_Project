document.addEventListener('DOMContentLoaded', function () {
});
$("#loginbtn").on("click", function (event) {
    event.preventDefault();
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

            //  window.location.href = "../html/index.html";
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("email", response.data.email);
            //alert("sdert7ygfcfyu7ygfcgyuygfvgu")
            getuser(response.data.email);
            // Handle success (e.g., redirect or display message)
            // alert("Login successful!");
            //window.location.href = "dashboard.html"; // Redirect to dashboard or homepage
        },
        error: function (xhr, status, error) {
            // Handle errors (e.g., server issues)
            console.error("Error:", xhr.responseText);
            alert("An error occurred. Please try again later.");
        }
    });
});

function getuser(email) {
    console.log(email)

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/v1/user/getemail/" + email,
        contentType: "application/json",
        dataType: "json",
        success: function (response) {
            console.log(response);
                localStorage.setItem("user",response.data);
                localStorage.setItem("role",response.data.role);
                let role = localStorage.getItem("role");
                // Handle success (e.g., redirect or display message)
//USER donor Hospital
            if (role === "USER") {
                window.location.href = "../html/chat.html";
            } else if (role === "donor") {
                window.location.href = "../html/chat.html";
            } else if (role === "Hospital") {
                window.location.href = "../html/index.html";
            } else if (role === "admin") {
                window.location.href = "../html/index.html";

            }

                console.log(response.data);
                alert("Login successful!");
               // window.location.href = "dashboard.html"; // Redirect to dashboard or homepage

        }})
}
$(document).ready(function() {
    let countdownTime = 30; // 30 seconds
    let countdown = setInterval(function() {
        countdownTime--;
        $("#countdown").text(countdownTime + "s");

        if (countdownTime <= 0) {
            clearInterval(countdown);
            $("#resend").removeClass("disabled"); // Enable the resend link
            $("#countdown").text(''); // Clear the countdown
        }
    }, 1000); // Runs every second
});

// Store the OTP from server response
let serverOTP;

function sendOTP() {
    var email = document.getElementById('emaill').value;

    if (!email) {
        alert("Please enter your email address.");
        return;
    }

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/api/v1/pass/OTP",
        contentType: "application/json",
        data: JSON.stringify({email: email}),
        dataType: "json",
        success: function (response) {
            console.log(response);
            // Store the OTP from the server response
            serverOTP = response;

            alert("OTP has been sent to " + email + ". Please check your inbox.");

            // Show OTP field and submit button
            document.getElementById('otpField').classList.remove('hidden');
            document.getElementById('submitOTP').classList.remove('hidden');

            // Hide send OTP button, show resend link with countdown
            $("#sentOTP").hide();
            $("#resend").show();
            $("#resend").addClass("disabled");

            // Start countdown for resend
            let countdownTime = 30;
            $("#countdown").text(countdownTime + "s");

            let countdown = setInterval(function() {
                countdownTime--;
                $("#countdown").text(countdownTime + "s");

                if (countdownTime <= 0) {
                    clearInterval(countdown);
                    $("#resend").removeClass("disabled");
                    $("#countdown").text('');
                }
            }, 1000);
        },
        error: function (xhr, status, error) {
            console.log(error);
            alert('Failed to send OTP. Please try again.');
        }
    });
}

function resendOTP() {
    // Only proceed if the resend button is not disabled
    if ($("#resend").hasClass("disabled")) {
        return;
    }

    var email = document.getElementById('emaill').value;

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/api/v1/pass/OTP",
        contentType: "application/json",
        data: JSON.stringify({email: email}),
        dataType: "json",
        success: function (response) {
            console.log(response);
            // Update stored OTP with new one from server
            serverOTP = response;

            // Restart countdown
            $("#resend").addClass("disabled");
            let countdownTime = 30;
            $("#countdown").text(countdownTime + "s");

            let countdown = setInterval(function() {
                countdownTime--;
                $("#countdown").text(countdownTime + "s");

                if (countdownTime <= 0) {
                    clearInterval(countdown);
                    $("#resend").removeClass("disabled");
                    $("#countdown").text('');
                }
            }, 1000);
        },
        error: function (xhr, status, error) {
            console.log(error);
            alert('Failed to resend OTP. Please try again.');
        }
    });
}

// Verify OTP
document.getElementById('submitOTP').onclick = function(event) {
    event.preventDefault();
    var enteredOTP = document.getElementById('otp').value;

    if (!enteredOTP) {
        alert("Please enter the OTP.");
        return;
    }

    // Compare entered OTP with the one received from server
    if (enteredOTP == serverOTP) {
        // If OTP matches, proceed to password reset
        document.getElementById('newPassword').classList.remove('hidden');
        document.getElementById('submitPass').classList.remove('hidden');
        document.getElementById('otpField').classList.add('hidden');
        document.getElementById('resend').classList.add('hidden');
        document.getElementById('submitOTP').classList.add('hidden');
        $("#resend").hide();


        alert("OTP Verified. Please set your new password.");
    } else {
        alert("Invalid OTP. Please try again.");
    }
}

// Reset password
$("#submitPass").on("click", function(event) {
    event.preventDefault();

    var password = $("#password").val();

    if (!password) {
        alert("Please enter a new password.");
        return;
    }

    var data = {
        email: $("#emaill").val(),
        password: password
    };

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/api/v1/pass/resetPassword",
        contentType: "application/json",
        data: JSON.stringify(data),
        dataType: "json",
        success: function(response) {
            console.log(response);
            alert("Password has been reset successfully. You can now login with your new password.");
            closePopup(); // Close the forgot password modal
        },
        error: function(xhr, status, error) {
            console.log(error);
            alert('Failed to reset password. Please try again.');
        }
    });
});


// Open the login modal
function openModal() {
    document.getElementById("loginModal").style.display = "block";
}

// Close the login modal
function closeModal() {
    document.getElementById("loginModal").style.display = "none";
}

// Open the registration modal
function openRegModal() {
    document.getElementById("registrationModal").style.display = "block";
}

// Close the registration modal
function closeRegModal() {
    document.getElementById("registrationModal").style.display = "none";
}

// Close the modals when clicking outside the content
window.onclick = function(event) {
    if (event.target == document.getElementById("loginModal")) {
        closeModal();
    }
    if (event.target == document.getElementById("registrationModal")) {
        closeRegModal();
    }
    if(event.target == document.getElementById("forget")) {
        closePopup();
    }
}

function closePopup() {
    document.getElementById("forget").style.display = "none";
}

function openForgetModal() {
    closeModal()
    document.getElementById("forget").style.display = "block";

    // Optional: Forgot Password Popup
    function showForgotPasswordPopup() {
        alert("Forgot password functionality to be implemented.");
    }
}
