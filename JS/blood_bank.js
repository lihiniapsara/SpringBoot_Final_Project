/*
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



// GET: Fetch all blood banks
    function loadBloodBanks() {
        $.ajax({
            url: 'http://localhost:8080/api/v1/blood_bank/getAll',
            type: "GET",
            dataType: "json",
            success: function (response) {
                console.log("Blood banks loaded:", response);
                displayBloodBanks(response.data || response); // Check if response has 'data'
            },
            error: function (error) {
                console.error("Error fetching blood banks:", error);
            }
        });
    }

    // Function to display blood banks in a table
/!*
    function displayBloodBanks(bloodBanks) {
        let tableBody = $("#bloodBankTableBody");
        tableBody.empty();
        bloodBanks.forEach(bank => {
            let row = `<tr>
                <td>${bank.id}</td>
                <td>${bank.hospitalName}</td>
                <td>${bank.location}</td>
                <td>${bank.contactDetails}</td>
                <td>${bank.storageCapacity}</td>
                <td>${bank.lastStockUpdateDate}</td>
                <td>${bank.managementType}</td>
                <td>
                    <button class="btn btn-warning" onclick="editBloodBank(${bank.id})">Edit</button>
                    <button class="btn btn-danger" onclick="deleteBloodBank(${bank.id})">Delete</button>
                </td>
            </tr>`;
            tableBody.append(row);
        });
    }
*!/

    // POST: Add a new blood bank
    function addBloodBank(event) {
        event.preventDefault();
        let bloodBankData = {
            hospitalName: $("#addName").val(),
            location: $("#addLocation").val(),
            contactDetails: $("#addContact").val(),
            storageCapacity: $("#addStorageCapacity").val(),
            lastStockUpdateDate: $("#addLastUpdate").val(),
            managementType: $("#addManagedBy").val()
        };

        $.ajax({
            url: 'http://localhost:8080/api/v1/blood_bank/register',
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(bloodBankData),
            headers: {
                Authorization: "Bearer " +"eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoidXNlciIsInN1YiI6ImFwc2FyYWxpaGluaTExQGdtYWlsLmNvbSIsImlhdCI6MTc0Mjg3ODY0MywiZXhwIjoxNzQzOTE1NDQzfQ.-ZP780TCw3ozJQcq3ti5n1YfaJCfLt0LjYHffrtX4Pu-Lm9MjP387bSZHqfaQnQWY8Vo7sU_MY59dDPRjRb7eg"
            },
            success: function (response) {
                console.log("Blood bank added:", response);
                hideAddModal();
                loadBloodBanks(); // Reload data
            },
            error: function (error) {
                console.error("Error adding blood bank:", error);
            }
        });
    }

    // Function to pre-fill edit form
    function editBloodBank(id) {
        $.ajax({
            url: `http://localhost:8080/api/v1/blood_bank/get/${id}`,
            type: "GET",
            dataType: "json",
            success: function (bank) {
                $("#editName").val(bank.hospitalName);
                $("#editLocation").val(bank.location);
                $("#editContact").val(bank.contactDetails);
                $("#editStorageCapacity").val(bank.storageCapacity);
                $("#editLastUpdate").val(bank.lastStockUpdateDate);
                $("#editManagedBy").val(bank.managementType);

                $("#editBloodBankId").val(id); // Store ID in hidden input field
                $("#editModal").modal("show");
            },
            error: function (error) {
                console.error("Error fetching blood bank details:", error);
            }
        });
    }

    // PUT: Update an existing blood bank
    function updateBloodBank() {
        let id = $("#editBloodBankId").val(); // Get stored ID

        let updatedData = {
            hospitalName: $("#editName").val(),
            location: $("#editLocation").val(),
            contactDetails: $("#editContact").val(),
            storageCapacity: $("#editStorageCapacity").val(),
            lastStockUpdateDate: $("#editLastUpdate").val(),
            managementType: $("#editManagedBy").val()
        };

        $.ajax({
            url: `http://localhost:8080/api/v1/blood_bank/update/${id}`,
            type: "PUT",
            contentType: "application/json",
            data: JSON.stringify(updatedData),
            success: function (response) {
                console.log("Blood bank updated:", response);
                hideEditModal();
                loadBloodBanks(); // Reload data
            },
            error: function (error) {
                console.error("Error updating blood bank:", error);
            }
        });
    }

    // DELETE: Remove blood bank
    function deleteBloodBank(id) {
        if (confirm("Are you sure you want to delete this blood bank?")) {
            $.ajax({
                url: `http://localhost:8080/api/v1/blood_bank/delete/${id}`,
                type: "DELETE",
                success: function (response) {
                    console.log("Blood bank deleted:", response);
                    loadBloodBanks();
                },
                error: function (error) {
                    console.error("Error deleting blood bank:", error);
                }
            });
        }
    }

    // Load blood banks on page load
    loadBloodBanks();

*/
document.addEventListener("DOMContentLoaded", function () {
/*    fetch("http://localhost:8080/api/v1/camp/hospital-names") // Replace with your actual API URL
        .then(response => {
            if (!response.ok) {  // Check if the HTTP status is OK
                throw new Error("Network response was not ok: " + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log("API Response:", data); // Log the full response

            if (data.code === 202 && Array.isArray(data.data) && data.data.length > 0) {
                const dropdown = document.getElementById("Dropdown");

   console.log("test" , dropdown)

                // Clear existing options
                dropdown.innerHTML = "<option value=''  >Select a Hospital test</option>";

                data.data.forEach(hospitalName => {
                    // let option = document.createElement("option");
                    // option.value = hospitalName;
                    // option.textContent = hospitalName;
                    // dropdown.appendChild(option);
 console.log(hospitalName)
                    dropdown.innerHTML = `<option value=''  >${hospitalName}</option>`;

                });

                console.log("Hospitals added to dropdown successfully");
            } else {
                console.error("No hospitals found in response or invalid response format");
            }
        })
        .catch(error => console.error("Error fetching hospital names:", error));*/

    sethospital(event);
});

/*
document.addEventListener("DOMContentLoaded", function () {
    fetch("http://localhost:8080/api/v1/camp/hospital-names") // API URL එක ඇතුලත් කරන්න
        .then(response => response.json())
        .then(data => {
            console.log("API Response:", data); // API response එක log කරන්න

            if (data.code === 202 && Array.isArray(data.data) && data.data.length > 0) {
                const dropdown = document.getElementById("Dropdown");

                // Existing options clear කරන්න
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
*/

function sethospital(event) {
    event.preventDefault();
    console.log("Get Data")
    $.ajax({
        url: "http://localhost:8080/api/v1/camp/hospital-names",
        type: "GET",
        success: function (response) {
            console.log(response)
            let array = response.data;
            console.log(array.length)
            let value = $("#dropname").val();
            console.log(value);
            $("#dropname").empty();

            for (let i = 0; i < array.length; i++) {
            console.log(array[i])
                $("#dropname").append(`<option value="${array[i]}">${array[i]}</option>`)


            }

               /* const dropdown = document.getElementById("Dropdown");
                dropdown.innerHTML = "<option value='' disabled selected>Select a Hospital</option>";
                    let option = document.createElement("option");
                    option.value = hospitalName[0];
                    option.textContent = hospitalName[0];
                    dropdown.appendChild(option);*/
        },
        error: function (error) {
            console.error("Error fetching hospital names:", error);
        }
    })
}

function addBloodBank(event) {
      event.preventDefault();

      let bloodStockLevels = {
          "A+": $("#addA+").val() || 0,
          "A-": $("#addA-").val() || 0,
          "B+": $("#addB+").val() || 0,
          "B-": $("#addB-").val() || 0,
          "AB+": $("#addAB+").val() || 0,
          "AB-": $("#addAB-").val() || 0,
          "O+": $("#addO+").val() || 0,
          "O-": $("#addO-").val() || 0
      };


      // Get form data
      let bloodBankData = {
          hospitalName: $("#hospitalDropdown").val(),
          location: $("#addLocation").val(),
          district: $("#addDistrict").val(),
          latitude: $("#addlatitude").val(),
          contactDetails: $("#addContact").val(),
          stocklevels: bloodStockLevels,
          storageCapacity: $("#addStorageCapacity").val(),
          lastStockUpdateDate: $("#addLastUpdate").val(),
          managementType: $("#addManagedBy").val()
      }

      console.log(bloodBankData)

      $.ajax({
          url: "http://localhost:8080/api/v1/blood_bank/register",
          type: "POST",
          contentType: "application/json",
          data: JSON.stringify(bloodBankData),
          headers: {
              Authorization: "Bearer " +"eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoidXNlciIsInN1YiI6ImFwc2FyYWxpaGluaTExQGdtYWlsLmNvbSIsImlhdCI6MTc0Mjg3ODY0MywiZXhwIjoxNzQzOTE1NDQzfQ.-ZP780TCw3ozJQcq3ti5n1YfaJCfLt0LjYHffrtX4Pu-Lm9MjP387bSZHqfaQnQWY8Vo7sU_MY59dDPRjRb7eg"
          },
          success: function (response) {
              console.log("Blood bank added:", response);
              hideAddModal();
          },
          error: function (error) {
              console.error("Error adding blood bank:", error);
          }
      });
  }