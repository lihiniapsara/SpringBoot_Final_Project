document.addEventListener("DOMContentLoaded", function () {
    fetch("http://localhost:8080/api/v1/camp/hospital-names") // Replace with your actual API URL
        .then(response => response.json())
        .then(data => {
            console.log("API Response:", data); // Log the full response

            if (data.code === 202 && Array.isArray(data.data) && data.data.length > 0) {
                const dropdown = document.getElementById("hospitalDropdown1");

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
function bloodRequest(event) {
    event.preventDefault();
    console.log("Adding Blood Request...");

    // Automatically set today's date (YYYY-MM-DD format)
    const today = new Date().toISOString().split('T')[0]; // e.g., "2025-04-10"

    // Create the blood request object with today's date
    let bloodRequest = {
        fullName: $("#fullName").val(),
        phoneNumber: $("#phone").val(),
        bloodType: $("#bloodType").val(),
        district: $("#district").val(),
        requestDate: today, // Automatically set to today’s date
        message: $("#message").val(),
        email: $("#requestemail").val(),
        hospitalName: $("#hospitalDropdown1").val(),
    };

    console.log("Submitting Blood Request with Today's Date:", bloodRequest);

    // Send the data to the backend API
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/api/v1/blood_request/register",
        data: JSON.stringify(bloodRequest),
        contentType: "application/json",
        dataType: "json",
        headers: {
            Authorization: "Bearer " + "eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoidXNlciIsInN1YiI6InVzZXJAZXhhbXBsZS5jb20iLCJpYXQiOjE3NDM5MjE2MTQsImV4cCI6MTc0NDk1ODQxNH0.39sBbE25H79CxXFwPxuniNn_prGRRBgox29lX74MfomMjyNBn3dv6dVR6-vwUgWtyEp73xHmcVmK3IRHJjN6Ag"
        },
        success: function (response) {
            console.log("Blood request submitted successfully with date:", today);
            clearForm(); // Clear the form after success
        },
        error: function (xhr, status, error) {
            console.error("Error submitting blood request:", error);
            alert("Error submitting request. Please try again.");
        }
    });
}
// Function to clear the form after submission

function clearForm() {
    $("#fullName").val("");
    $("#phone").val("");
    $("#bloodType").val("");
    $("#district").val("");
    $("#message").val("");
    $("#requestemail").val("");
    $("#hospitalDropdown1").val("");
}

// Function to load blood requests using AJAX

// Call the function when the page loads
window.onload = loadBloodRequests;

async function loadBloodRequests() {
    try {
        const response = await fetch('http://localhost:8080/api/v1/blood_request/getAll', {
            method: 'GET',
            headers: { 'Accept': 'application/json' }
        });

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status} ${response.statusText}`);
        }

        const requests = await response.json();
        console.log('Parsed response:', requests);

        if (!Array.isArray(requests)) {
            console.error('Error: Response is not an array:', requests);
            const requestList = document.getElementById('requestList');
            if (requestList) {
                requestList.innerHTML = '<li>Invalid data format from server</li>';
            }
            return;
        }

        const requestList = document.getElementById('requestList');
        if (!requestList) {
            console.error('Error: requestList element not found');
            return;
        }
        requestList.innerHTML = '';

        if (requests.length === 0) {
            requestList.innerHTML = '<li>No blood requests available</li>';
            return;
        }

        requests.forEach(request => {
            const hospitalName = request.hospital?.hospitalName || 'N/A'; // Access nested hospitalName safely
            const listItem = document.createElement('li');
            listItem.className = 'request-item';
            listItem.innerHTML = `
                <div class="request-icon">
                    <i class="fas fa-tint"></i>
                </div>
                <div class="request-info">
                    <div class="request-type">${request.bloodType || 'N/A'}</div>
                    <div class="request-date">${request.requestDate || 'N/A'}</div>
                    <div class="hospital-name">${hospitalName}</div>
                </div>
            `;
            requestList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Fetch error:', error);
        const requestList = document.getElementById('requestList');
        if (requestList) {
            requestList.innerHTML = `<li>Error: ${error.message}</li>`;
        }
    }
}

window.onload = function () {
    loadBloodRequests();
    const requestDateInput = document.getElementById('requestDate');
    if (requestDateInput) {
        requestDateInput.value = new Date().toISOString().split('T')[0];
    } else {
        console.error('Error: requestDate element not found');
    }
};

