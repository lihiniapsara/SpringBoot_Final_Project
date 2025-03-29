document.addEventListener("DOMContentLoaded", function () {
    fetch("http://localhost:8080/api/v1/camp/hospital-names") // Replace with your actual API URL
        .then(response => response.json())
        .then(data => {
            console.log("API Response:", data); // Log the full response

            if (data.code === 202 && Array.isArray(data.data) && data.data.length > 0) {
                const dropdown = document.getElementById("hospitalDropdown");

                // Clear existing options
                dropdown.innerHTML = "<option value='' disabled selected>Select a Hospital</option>";

                data.data.forEach(hospitalName => {
                    let option = document.createElement("option");
                    option.value = hospitalName;
                    option.textContent = hospitalName;
                    dropdown.appendChild(option);
                });

                console.log("Hospitals added to dropdown successfully");
            } else {
                console.error("No hospitals found in response");
            }
        })
        .catch(error => console.error("Error fetching hospital names:", error));
});

function campRegister(event) {

    event.preventDefault(); // Prevent form from reloading the page

    let campData = {
        campDate: $("#campDate").val(),
        campName: $("#campName").val(),
        contactNumber: $("#contactNumber").val(),
        email: $("#email-camp").val(),
        campLocation: $("#campLocation").val(),
        city: $("#city2").val(),
        district: $("#districtDropdown").val(),
        province: $("#campprovince").val(),
        zipCode: $("#zipCode-camp").val(),
        hospitalname: $("#hospitalDropdown").val() // Get selected hospital name
    };

    console.log("Submitting Camp Data:", campData);

    $.ajax({
        url: "http://localhost:8080/api/v1/camp/register", // Replace with your API URL
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(campData),
        headers: {
            Authorization: "Bearer " +"eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoidXNlciIsInN1YiI6ImFwc2FyYWxpaGluaTExQGdtYWlsLmNvbSIsImlhdCI6MTc0Mjg3ODY0MywiZXhwIjoxNzQzOTE1NDQzfQ.-ZP780TCw3ozJQcq3ti5n1YfaJCfLt0LjYHffrtX4Pu-Lm9MjP387bSZHqfaQnQWY8Vo7sU_MY59dDPRjRb7eg"
        },
        success: function (response) {
            console.log("Camp Registered:", response);

            if (response.code === 201) {
                alert("Camp Registered Successfully!");
                $("#campRegisterForm")[0].reset(); // Clear form
            } else {
                alert("Error: " + response.message);
            }
        },
        error: function (xhr, status, error) {
            console.error("Error registering camp:", error);
            alert("Registration failed. Please try again.");
        }
    });
}

