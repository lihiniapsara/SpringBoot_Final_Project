/*
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
*/

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
function registerdonor(event) {
    event.preventDefault();
    console.log("Donor Registering...");

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
        hasDiabetes: false,
        hasHeartProblem: false,
        hasLowPressure: false,
        hasHighPressure: false,
        hasSocialIssues: false,
        hasTattoos: false,
        hasOtherIssues: false,
        donationDate: $("#donationDate").val() || null // Allow dynamic input
    };

    // Map health conditions to boolean fields
    $("input[name='health_conditions']:checked").each(function() {
        const condition = $(this).val();
        if (condition === "Diabetes") donor.hasDiabetes = true;
        if (condition === "Heart Problem") donor.hasHeartProblem = true;
        if (condition === "Low Pressure") donor.hasLowPressure = true;
        if (condition === "High Pressure") donor.hasHighPressure = true;
        if (condition === "Social Issues") donor.hasSocialIssues = true;
        if (condition === "Tattoos") donor.hasTattoos = true;
        if (condition === "Other Issues") donor.hasOtherIssues = true;
    });

    console.log("Donor Data:", donor);

    $.ajax({
        type: "POST",
        url: 'http://localhost:8080/api/v1/donor/register',
        contentType: "application/json",
        data: JSON.stringify(donor),
        dataType: "json",
        headers: {
            Authorization: "Bearer " + "eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiZG9ub3IiLCJzdWIiOiJqYW5lLmRvZUBnbWFpbC5jb20iLCJpYXQiOjE3NDUxMzczMjQsImV4cCI6MTc0NjE3NDEyNH0.0HbqYUKDOIFGrzZ_aXWdh80M7jBRuRn7V6C1yS_sifUg1J0UUClR0gDnfGiWnEyySVg2klpif4pU-94NxVggWg"
        },
        success: function(response) {
            $("#responseMessage").html("<p style='color:green;'>Successfully registered!</p>");
        },
        error: function(xhr, status, error) {
            console.error("Error:", xhr.status, xhr.responseText);
            $("#responseMessage").html(`<p style='color:red;'>Error submitting the form: ${xhr.responseText || 'Unknown error'}</p>`);
        }
    });
}

function saveDateTime() {
    console.log("Saving Date...");

    let contact = document.getElementById("donorContact").value;
    let date = document.getElementById("editDate").value;

    if (!contact) {
        alert("Error: Donor contact is missing!");
        return;
    }

    if (!date) {
        alert("Please select a date.");
        return;
    }

    let donorData = {
        contact: contact,
        donationDate: date
    };

    $.ajax({
        url: "http://localhost:8080/api/v1/donor/update-date",
        type: "PUT",
        contentType: "application/json",
        headers: {
            Authorization: "Bearer " + "eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiZG9ub3IiLCJzdWIiOiJqYW5lLmRvZUBnbWFpbC5jb20iLCJpYXQiOjE3NDUxMzczMjQsImV4cCI6MTc0NjE3NDEyNH0.0HbqYUKDOIFGrzZ_aXWdh80M7jBRuRn7V6C1yS_sifUg1J0UUClR0gDnfGiWnEyySVg2klpif4pU-94NxVggWg"
        },
        data: JSON.stringify(donorData),
        success: function(response) {
            console.log("Date updated successfully:", response);
            alert("Donation date updated successfully!");
            closePopup();
            getAllDonors();
        },
        error: function(xhr, status, error) {
            console.error("Error updating date:", error);
            alert("Failed to update donation date. Please try again.");
        }
    });
}function getAllDonors() {
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
            Authorization: "Bearer " + "eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiZG9ub3IiLCJzdWIiOiJqYW5lLmRvZUBnbWFpbC5jb20iLCJpYXQiOjE3NDUxMzczMjQsImV4cCI6MTc0NjE3NDEyNH0.0HbqYUKDOIFGrzZ_aXWdh80M7jBRuRn7V6C1yS_sifUg1J0UUClR0gDnfGiWnEyySVg2klpif4pU-94NxVggWg"
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
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const searchInput = document.querySelector('.search-input');
    const filterSelect = document.querySelector('.filter-select');
    const donorsTableBody = document.querySelector('.donors-table tbody');

    // Initial load of donors
    getAllDonors();

    // Search by Contact Number
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.trim().toLowerCase();
        filterDonors(searchTerm, filterSelect.value);
    });

    // Filter by Blood Group
    filterSelect.addEventListener('change', function() {
        const bloodGroup = this.value;
        filterDonors(searchInput.value.trim().toLowerCase(), bloodGroup);
    });

    // Function to filter donors
    function filterDonors(searchTerm, bloodGroup) {
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/api/v1/donor/getAll",
            dataType: "json",
            headers: {
                Authorization: "Bearer " + "eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiZG9ub3IiLCJzdWIiOiJqYW5lLmRvZUBnbWFpbC5jb20iLCJpYXQiOjE3NDUxMzczMjQsImV4cCI6MTc0NjE3NDEyNH0.0HbqYUKDOIFGrzZ_aXWdh80M7jBRuRn7V6C1yS_sifUg1J0UUClR0gDnfGiWnEyySVg2klpif4pU-94NxVggWg"
            },
            success: function (response) {
                if (response && response.data) {
                    let filteredDonors = response.data;

                    // Filter by contact number
                    if (searchTerm) {
                        filteredDonors = filteredDonors.filter(donor =>
                            donor.contact && donor.contact.toLowerCase().includes(searchTerm)
                            );
                    }

                    // Filter by blood group
                    if (bloodGroup) {
                        filteredDonors = filteredDonors.filter(donor =>
                            donor.bloodGroup === bloodGroup
                            );
                    }

                    // Render filtered donors
                    let tableBody = "";
                    filteredDonors.forEach((donor, index) => {
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
                                <td><button style="background-color: #10ad10; border-radius: 15%;" onclick="openPopup('${donor.contact}')">Edit Date</button></td>
                            </tr>
                        `;
                    });

                    donorsTableBody.innerHTML = tableBody;
                }
            },
            error: function (xhr, status, error) {
                console.error("Error fetching donors:", error);
            }
        });
    }
});

function filterDonors(searchTerm, bloodGroup) {
    let url = "http://localhost:8080/api/v1/donor/getAll";
    if (searchTerm || bloodGroup) {
        url += "?";
        if (searchTerm) url += `contact=${encodeURIComponent(searchTerm)}`;
        if (bloodGroup) url += `${searchTerm ? "&" : ""}bloodGroup=${encodeURIComponent(bloodGroup)}`;
    }

    $.ajax({
        type: "GET",
        url: url,
        dataType: "json",
        headers: {
            Authorization: "Bearer " + "eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoiZG9ub3IiLCJzdWIiOiJqYW5lLmRvZUBnbWFpbC5jb20iLCJpYXQiOjE3NDUxMzczMjQsImV4cCI6MTc0NjE3NDEyNH0.0HbqYUKDOIFGrzZ_aXWdh80M7jBRuRn7V6C1yS_sifUg1J0UUClR0gDnfGiWnEyySVg2klpif4pU-94NxVggWg"
        },
        success: function (response) {
            if (response && response.data) {
                let tableBody = "";
                response.data.forEach((donor, index) => {
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
                            <td><button style="background-color: #10ad10; border-radius: 15%;" onclick="openPopup('${donor.contact}')">Edit Date</button></td>
                        </tr>
                    `;
                });

                donorsTableBody.innerHTML = tableBody;
            }
        },
        error: function (xhr, status, error) {
            console.error("Error fetching donors:", error);
        }
    });
}
