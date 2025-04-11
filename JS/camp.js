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
        dataType: "json", // Expect JSON response
        data: JSON.stringify(campData),
        headers: {
            Authorization: "Bearer " +"eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoidXNlciIsInN1YiI6InVzZXJAZXhhbXBsZS5jb20iLCJpYXQiOjE3NDM5MjE2MTQsImV4cCI6MTc0NDk1ODQxNH0.39sBbE25H79CxXFwPxuniNn_prGRRBgox29lX74MfomMjyNBn3dv6dVR6-vwUgWtyEp73xHmcVmK3IRHJjN6Ag"
        },
        success: function (response) {
            console.log("Camp Registered:", response);
            clearForm();
        },
        error: function (xhr, status, error) {
            console.error("Error registering camp:", error);
            alert("Registration failed. Please try again.");
        }
    });
}
function clearForm() {
    $("#campDate").val("");
    $("#campName").val("");
    $("#contactNumber").val("");
    $("#email-camp").val("");
    $("#campLocation").val("");
    $("#city2").val("");
    $("#districtDropdown").val("");
    $("#campprovince").val("");
    $("#zipCode-camp").val("");
    $("#hospitalDropdown").val("");
}