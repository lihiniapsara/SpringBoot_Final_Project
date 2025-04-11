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
            Authorization: "Bearer " +"eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoidXNlciIsInN1YiI6InVzZXJAZXhhbXBsZS5jb20iLCJpYXQiOjE3NDM5MjE2MTQsImV4cCI6MTc0NDk1ODQxNH0.39sBbE25H79CxXFwPxuniNn_prGRRBgox29lX74MfomMjyNBn3dv6dVR6-vwUgWtyEp73xHmcVmK3IRHJjN6Ag"
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

// Function to open the popup and set the donor ID
function openPopup(contact) {
    document.getElementById("donorContact").value = contact; // Set the contact number
    document.getElementById("dateTimePopup").style.display = "block"; // Show the popup
}
// Function to save date & time
/*function saveDateTime() {
    console.log("Saving Date & Time...");

    let contact = document.getElementById("donorContact").value; // Get hidden contact number
    let date = document.getElementById("editDate").value;
    let time = document.getElementById("editTime").value;
    let dateTime = date + "T" + time + ":00"; // Format for Java LocalDateTime

    if (!contact) {
        alert("Error: Donor contact is missing!");
        return;
    }

    if (date && time) {
        $.ajax({
            url:"http://localhost:8080/api/v1/donor/update-date",
            method: "PUT",
            ContentType: "application/json",
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoidXNlciIsInN1YiI6InVzZXJAZXhhbXBsZS5jb20iLCJpYXQiOjE3NDM5MjE2MTQsImV4cCI6MTc0NDk1ODQxNH0.39sBbE25H79CxXFwPxuniNn_prGRRBgox29lX74MfomMjyNBn3dv6dVR6-vwUgWtyEp73xHmcVmK3IRHJjN6Ag"
            },
            data: JSON.stringi
            })
        })

    } else {
        alert("Please select both date and time.");
    }
}*/
function getAllDonors() {
    console.log("Step 1: Function getAllDonors() called");

    // Check if jQuery is loaded
    if (typeof $ === "undefined") {
        console.error("jQuery is not loaded!");
        return;
    } else {
        console.log("Step 2: jQuery is loaded");
    }

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/api/v1/donor/getAll",
        dataType: "json",
        headers: {
            Authorization: "Bearer eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoidXNlciIsInN1YiI6InVzZXJAZXhhbXBsZS5jb20iLCJpYXQiOjE3NDM5MjE2MTQsImV4cCI6MTc0NDk1ODQxNH0.39sBbE25H79CxXFwPxuniNn_prGRRBgox29lX74MfomMjyNBn3dv6dVR6-vwUgWtyEp73xHmcVmK3IRHJjN6Ag"
        },
        beforeSend: function () {
            console.log("Step 3: AJAX request is about to be sent");
        },
        success: function (response) {
            console.log("Step 4: AJAX success - Response received:", response);

            if (response && response.data) {
                console.log("Step 5: Data found in response:", response.data);
                let tableBody = "";

                response.data.forEach((donor, index) => {
                    console.log(`Step 6: Processing donor ${index + 1}:`, donor);

                    let healthConditions = [];
                    if (donor.hasDiabetes) healthConditions.push("Diabetes");
                    if (donor.hasHeartProblem) healthConditions.push("Heart Problem");
                    if (donor.hasLowPressure) healthConditions.push("Low Pressure");
                    if (donor.hasHighPressure) healthConditions.push("High Pressure");
                    if (donor.hasSocialIssues) healthConditions.push("Social Issues");
                    if (donor.hasTattoos) healthConditions.push("Tattoos");
                    if (donor.hasOtherIssues) healthConditions.push("Other Issues");

                    let healthConditionsDisplay = healthConditions.length > 0 ? healthConditions.join(", ") : "None";

                    tableBody += `
                        <tr>
                            <td>${donor.fullName || "N/A"}</td>
                            <td>${donor.nicOrPassport || "N/A"}</td>
                            <td>${donor.dateOfBirth || "N/A"}</td>
                            <td>${donor.gender || "N/A"}</td>
                            <td>${donor.bloodGroup || "N/A"}</td>
                            <td>${donor.contact || "N/A"}</td>
                            <td>${donor.email || "N/A"}</td>
                            <td>${donor.address || "N/A"}</td>
                            <td>${donor.city || "N/A"}</td>
                            <td>${donor.district || "N/A"}</td>
                            <td>${donor.province || "N/A"}</td>
                            <td>${donor.zipCode || "N/A"}</td>
                            <td>${healthConditionsDisplay}</td>
                            <td><span class="editable-date" data-id="${donor.contact || "N/A"}">${donor.donationDate || "N/A"}</span></td>
                            <td><button style="background-color: #10ad10; border-radius: 15%;" onclick="openPopup(123)">Edit Date</button></td>
                        </tr>
                    `;
                });

                console.log("Step 7: Updating table with HTML:", tableBody);
                $(".donors-table tbody").html(tableBody);
            } else {
                console.error("Step 5: No data in response or invalid format:", response);
            }
        },
        error: function (xhr, status, error) {
            console.error("Step 4: AJAX error occurred");
            console.error("Status:", status);
            console.error("Error:", error);
            console.error("Response Text:", xhr.responseText);
        }
    });
}$(document).ready(function() {
    getAllDonors()
})
    // Function to update the table
/*
    function updateDonorTable(donors) {
        let tbody = $(".donors-table tbody"); // Select the table body
        tablebody.inner
        donors.forEach(donor => {
            let row = `<tr>
            <td>${donor.fullName}</td>
            <td>${donor.nic}</td>
            <td>${donor.dob}</td>
            <td>${donor.gender}</td>
            <td>${donor.bloodGroup}</td>
            <td>${donor.contact}</td>
            <td>${donor.email}</td>
            <td>${donor.address}</td>
            <td>${donor.city}</td>
            <td>${donor.district}</td>
            <td>${donor.province}</td>
            <td>${donor.zipCode}</td>
            <td>${donor.healthConditions || "N/A"}</td>
            <td>${donor.lastDonation || "N/A"}</td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="deleteDonor('${donor.nic}')">Delete</button>
            </td>
        </tr>`;
            tbody.append(row);
        });
    }*/
