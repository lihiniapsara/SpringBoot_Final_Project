$(document).ready(function () {
    loadBloodBank();
    populateHospitalDropdown(); // Call on page load
});

function populateHospitalDropdown() {
    $.ajax({
        url: "http://localhost:8080/api/v1/camp/hospital-names",
        type: "GET",
        success: function (response) {
            console.log("Hospital names response:", response);
            const dropdown = $("#hospitalDropdown"); // Ensure ID matches HTML
            dropdown.empty();
            dropdown.append("<option value='' disabled selected>Select a Hospital</option>");
            response.data.forEach(hospital => {
                dropdown.append(`<option value="${hospital}">${hospital}</option>`);
            });
        },
        error: function (error) {
            console.error("Error fetching hospital names:", error);
        }
    });
}
/*
function addBloodBank(event) {
    event.preventDefault();

    let bloodStockLevels = {
        "A+": $("#stockA+").val() || 0,
        "A-": $("#stockA-").val() || 0,
        "B+": $("#stockB+").val() || 0,
        "B-": $("#stockB-").val() || 0,
        "AB+": $("#stockAB+").val() || 0,
        "AB-": $("#stockAB-").val() || 0,
        "O+": $("#stockO+").val() || 0,
        "O-": $("#stockO-").val() || 0
    };

    let bloodBankData = {
        hospitalName: $("#hospitalDropdown").val(),
        location: $("#location").val(), // Match HTML ID
        district: $("#district").val(),
        latitude: $("#latitude").val(),
        longitude: $("#Longitude").val(), // Added longitude
        contactDetails: $("#contactDetails").val(),
        stocklevels: bloodStockLevels,
        storageCapacity: $("#storageCapacity").val(),
        lastStockUpdateDate: $("#lastStockUpdateDate").val(),
        managementType: $("#managementType").val()
    };

    $.ajax({
        url: "http://localhost:8080/api/v1/blood_bank/register",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(bloodBankData),
        headers: {
            Authorization: "Bearer eyJhbGciOiJIUzUxMiJ9..." // Your token
        },
        success: function (response) {
            console.log("Blood bank added:", response);
            $("#bloodBankModal").hide(); // Hide modal (ensure jQuery UI or custom CSS)
            loadBloodBank(); // Refresh table
        },
        error: function (error) {
            console.error("Error adding blood bank:", error);
        }
    });
}
*/
// Function to show the modal
function addBloodBank(event) {
    event.preventDefault();
    document.getElementById('bloodBankModal').style.display = 'block';
    document.getElementById('modalTitle').textContent = 'Add New Blood Bank';
    document.getElementById('bloodBankForm').reset(); // Reset form fields
}

// Close modal when clicking the close button
document.getElementById('closeModalBtn').addEventListener('click', function() {
    document.getElementById('bloodBankModal').style.display = 'none';
});

// Close modal when clicking cancel
document.getElementById('cancelBtn').addEventListener('click', function() {
    document.getElementById('bloodBankModal').style.display = 'none';
});

// Handle form submission with AJAX
$(document).ready(function () {
    // Attach the function to the form submission
    $("#bloodBankForm").submit(function (event) {
        addBloodBankStock(event);
    });
});

function addBloodBankStock(event) {
    event.preventDefault();
    console.log("Adding Blood Bank Stock...");

    let hospitalName = $("#hospitalName").val();
    let location = $("#location").val();
    let district = $("#district").val();
    let latitude = $("#latitude").val();
    let longitude = $("#Longitude").val();
    let contactDetails = $("#contactDetails").val();


    // Collect stock levels from individual inputs
    let stockLevels = {
        "A+": $("#stock1").val(),
        "A-": $("#stock2").val(),
        "B+": $("#stock3").val(),
        "B-": $("#stock4").val(),
        "AB+": $("#stock5").val(),
        "AB-": $("#stock6").val(),
        "O+": $("#stock7").val(),
        "O-": $("#stock8").val()
    };

    let storageCapacity = $("#storageCapacity").val();
    let managementType = $("#managementType").val();

    if (!hospitalName || !location || !district || !storageCapacity) {
        alert("Please fill all required fields!");
        return;
    }



    let bloodBankData = {
        hospitalName: hospitalName,
        location: location,
        district: district,
        latitude: latitude,
        longitude: longitude,
        contactDetails: contactDetails,
        stockLevels: stockLevels,  // Using the stock levels object
        lastStockUpdateDate: new Date().toISOString().split('T')[0],
        storageCapacity: parseInt(storageCapacity),
        managementType: managementType
    };

    console.log("Blood Bank :"+bloodBankData);

/*
    $.ajax({
        url: "http://localhost:8080/api/v1/blood_bank/register",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(bloodBankData),
        dataType: "json",
        headers: {
            Authorization: "Bearer " + "eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoidXNlciIsInN1YiI6ImFwc2FyYWxpaGluaTExQGdtYWlsLmNvbSIsImlhdCI6MTc0Mjg3ODY0MywiZXhwIjoxNzQzOTE1NDQzfQ.-ZP780TCw3ozJQcq3ti5n1YfaJCfLt0LjYHffrtX4Pu-Lm9MjP387bSZHqfaQnQWY8Vo7sU_MY59dDPRjRb7eg"

        },
        success: function (response) {
            alert("Blood Bank Stock Added Successfully!");
            console.log(response);
            $("#bloodBankForm")[0].reset(); // Reset the form after success
        },
        error: function (error) {
            console.error("Error:", error);
            alert("Failed to add blood bank stock!");
        }
    });
*/

    loadBloodBank();
}

// Optional: Add some basic CSS to make the modal work
/*style.textContent = `
    .popup {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.5);
    }
    .popup-content {
        background-color: white;
        margin: 15% auto;
        padding: 20px;
        width: 70%;
        max-width: 500px;
        position: relative;
    }
    .close-btn {
        position: absolute;
        right: 10px;
        top: 10px;
        font-size: 24px;
        cursor: pointer;
    }
    .form-group {
        margin-bottom: 15px;
    }
    .blood-level-group {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
    }
    .stock-item {
        display: flex;
        align-items: center;
        gap: 5px;
    }
    .form-actions {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        margin-top: 20px;
    }
`;
document.head.appendChild(style);*/
function loadBloodBank() {
    console.log("Sending request with token:");

    $.ajax({
        url: "http://localhost:8080/api/v1/blood_bank/getAll",
        type: "GET",
        headers: {
            Authorization: "Bearer " + "eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiZG9ub3IiLCJzdWIiOiJqYW5lLmRvZUBnbWFpbC5jb20iLCJpYXQiOjE3NDUxMzczMjQsImV4cCI6MTc0NjE3NDEyNH0.0HbqYUKDOIFGrzZ_aXWdh80M7jBRuRn7V6C1yS_sifUg1J0UUClR0gDnfGiWnEyySVg2klpif4pU-94NxVggWg"
        },
        success: function (response) {
            console.log("Blood banks loaded:", response);
            // Access the array inside response.body.data
            const bloodBanks = response.body.data;
            if (Array.isArray(bloodBanks)) {
                let tableBody = '';
                bloodBanks.forEach(bank => {
                    tableBody += `
                        <tr>
                            <td>${bank.hospitalName}</td>
                            <td>${bank.location}</td>
                            <td>${bank.district}</td>
                            <td>${bank.contactDetails}</td>
                            <td>
                               ${bank.stocklevels}
                            </td>
                            <td>${bank.storageCapacity}</td>
                            <td>${bank.lastStockUpdateDate}</td>
                            <td>${bank.managementType}</td>
                            
                        </tr>
                    `;
                });
                $('#bloodBanksTableBody').html(tableBody);
                attachEventListeners();
            } else {
                console.error("Expected an array in response.body.data, but got:", bloodBanks);
                alert("No blood banks found or invalid response format.");
            }
        },
        error: function (xhr, status, error) {
            console.error("Error loading blood banks:", {
                status: xhr.status,
                statusText: xhr.statusText,
                responseText: xhr.responseText
            });
            alert("Failed to load blood banks. Please check the server response.");
        }
    });
}

  $(document).ready(function () {
      loadBloodBank();
  });