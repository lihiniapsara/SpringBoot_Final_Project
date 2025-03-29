function registerdonor(event) {
    event.preventDefault();
    console.log("Donor Registering...");

    // Collect form data
    let donor = {
        fullName: $("#donorname").val(),
        dateOfBirth: $("#dateOfBirth").val(),
        gender: $("#gender").val(),
        bloodGroup: $("#bloodGroup").val(),
        nicOrPassport: $("#nicOrPassport").val(),
        contact: $("#contactdonor").val(),
        email: $("#donoremail").val(),
        address: $("#homeAddress").val(),
        city: $("#city").val(),
        district: $("#dist").val(),
        province: $("#province").val(),
        zipCode: $("#zipCode").val(),
        healthConditions: [],
        donationDate: "2025-02-14"
    };

    // Collect checked health conditions
    $("input[name='health_conditions']:checked").each(function() {
        donor.healthConditions.push($(this).val());
    });

    console.log(donor); // Debugging

    $.ajax({
        type: "POST",
        url: 'http://localhost:8080/api/v1/donor/register',
        contentType: "application/json",
        data: JSON.stringify(donor),
        dataType: "json",
        headers: {
            Authorization: "Bearer " +"eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoidXNlciIsInN1YiI6ImFwc2FyYWxpaGluaTExQGdtYWlsLmNvbSIsImlhdCI6MTc0Mjg3ODY0MywiZXhwIjoxNzQzOTE1NDQzfQ.-ZP780TCw3ozJQcq3ti5n1YfaJCfLt0LjYHffrtX4Pu-Lm9MjP387bSZHqfaQnQWY8Vo7sU_MY59dDPRjRb7eg"
        },
        success: function(response) {
            $("#responseMessage").html("<p style='color:green;'>Successfully registered!</p>");
        },
        error: function(xhr, status, error) {
            console.error("Error:", error);
            $("#responseMessage").html("<p style='color:red;'>Error submitting the form. Try again.</p>");
        }
    });
}
function showAllDonors(event) {
    event.preventDefault();
    console.log("viewAll")
    $.ajax({
        type: "GET",
        url: 'http://localhost:8080/api/v1/donor/getAll',
        contentType: "application/json",
        data: JSON.stringify(donor),
        dataType: "json",
        headers: {
            Authorization: "Bearer " +"eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoidXNlciIsInN1YiI6ImFwc2FyYWxpaGluaTExQGdtYWlsLmNvbSIsImlhdCI6MTc0Mjg3ODY0MywiZXhwIjoxNzQzOTE1NDQzfQ.-ZP780TCw3ozJQcq3ti5n1YfaJCfLt0LjYHffrtX4Pu-Lm9MjP387bSZHqfaQnQWY8Vo7sU_MY59dDPRjRb7eg"
        },
        success: function(response) {
            console.log(response);
            // Handle the response data here
        },
        error: function(xhr, status, error) {
            console.error("Error:", error);
        }
    });
}