
function hospitalRegister(event) {

    event.preventDefault(); // Prevent form from reloading the page

    let hospitalData = {
/*
        hospital_Name: $("#hospital").val(),
*/
        hospital_Name: "gggggggg",
        typeOfHospital: $("#TypeOfHospital").val(),
        registrationNumber: $("#registrationNumber").val(),
        yearOfEstablishment: $("#yearOfEstablishment").val(),
        address: $("#address").val(),
        city: $("#city").val(),
        district: $("#district").val(),
        province: $("#province").val(),
        zipCode: $("#zipCode").val(),
        officialEmail: $("#officialEmail").val(),
        contactNumber: $("#contactNumber").val(),
        emergencyContactNumber: $("#emergencyContactNumber").val(),
        website: $("#website").val(),
        hasBloodBank: $("#HasBloodBank").val(), // Checkbox ekata boolean value ganna
        bloodBankContactPersonName: $("#bloodBankContactPersonName").val(),
        bloodBankContactNumber: $("#bloodBankContactNumber").val(),
        availableBloodGroups: $("#availableBloodGroups").val().split(","), // Comma separated list ekak hadaganna
        bloodBankLicenseNumber: $("#bloodBankLicenseNumber").val(),
        healthMinistryApprovalCertificate: [], // File upload ekata wena implementation ekak danna ona
        emergencyBloodServiceAvailable: $("#EmergencyBloodServiceAvailable").val(),
        bloodDonationCampFacility: $("#BloodDonationCampFacility").val(),
        numberOfBloodStorageUnits: $("#numberOfBloodStorageUnits").val(),
        userName:"nipun",
    };

    console.log("Submitting Hospital Data:", hospitalData);

    $.ajax({
        url: "http://localhost:8080/api/v1/hospitals/register", // Replace with your API URL
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(hospitalData),
        headers: {
            Authorization: "Bearer " +"eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoidXNlciIsInN1YiI6InVzZXJAZXhhbXBsZS5jb20iLCJpYXQiOjE3NDM5MjE2MTQsImV4cCI6MTc0NDk1ODQxNH0.39sBbE25H79CxXFwPxuniNn_prGRRBgox29lX74MfomMjyNBn3dv6dVR6-vwUgWtyEp73xHmcVmK3IRHJjN6Ag"
        },
        success: function (response) {
            console.log("Hospital added successfully:", response);
            alert("Hospital added successfully!");
        },
        error: function (xhr, status, error) {
            console.error("Error adding hospital:", error);
            alert("Error adding hospital!");
        }
    });
}
function loadHospitalTable() {
    $.ajax({
        url: 'http://localhost:8080/api/v1/hospitals/getAll',
        type: 'GET',
        contentType: "application/json",
        dataType: "json",
        headers: {
            Authorization: "Bearer " + "eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoidXNlciIsInN1YiI6InVzZXJAZXhhbXBsZS5jb20iLCJpYXQiOjE3NDM5MjE2MTQsImV4cCI6MTc0NDk1ODQxNH0.39sBbE25H79CxXFwPxuniNn_prGRRBgox29lX74MfomMjyNBn3dv6dVR6-vwUgWtyEp73xHmcVmK3IRHJjN6Ag"
        },
        success: function (response) {
            console.log(response.data);

            $("#hospitals-data").empty();

            response.data.forEach(function (item) {
                let hasBloodBankStatus = item.hasBloodBank
                    ? `<span style="color: green;">●</span> Available`
                    : `<span style="color: red;">●</span> Not Available`;

                let emergencyServiceStatus = item.emergencyBloodServiceAvailable
                    ? `<span style="color: green;">●</span> Available`
                    : `<span style="color: red;">●</span> Not Available`;

                let row = `<tr>
                    <td>${item.hospitalName}</td>
                    <td>${item.typeOfHospital}</td>
                    <td>${item.address}</td>
                    <td>${item.contactNumber}</td>
                    <td>${hasBloodBankStatus}</td>
                    <td>${item.availableBloodGroups}</td>
                    <td>${emergencyServiceStatus}</td>
                </tr>`;

                $('#hospitals-data').append(row);
            });
        },
        error: function (xhr, status, error) {
            console.error("Error loading data:", xhr.responseText);
            alert('Error loading hospital data');
        }
    });
}
loadHospitalTable();


