function hospitalRegister(event) {

    event.preventDefault(); // Prevent form from reloading the page

    let hospitalData = {
        hospitalName: $("#hospitalName").val(),
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
            Authorization: "Bearer " +"eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoidXNlciIsInN1YiI6ImFwc2FyYWxpaGluaTExQGdtYWlsLmNvbSIsImlhdCI6MTc0Mjg3ODY0MywiZXhwIjoxNzQzOTE1NDQzfQ.-ZP780TCw3ozJQcq3ti5n1YfaJCfLt0LjYHffrtX4Pu-Lm9MjP387bSZHqfaQnQWY8Vo7sU_MY59dDPRjRb7eg"
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
