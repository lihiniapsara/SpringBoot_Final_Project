function addInventory(event) {
    event.preventDefault();
    console.log("Get Data")

    let blood_inventory = {
        bloodType: $("#bloodType").val(),
        units: $("#units").val(),
        donationDate: $("#donationDate").val(),
        expiryDate: $("#expiryDate").val()
    };
    console.log(blood_inventory);
    $.ajax({
        url: 'http://localhost:8080/api/v1/blood-inventory/register',
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify(blood_inventory),
        dataType: "json",
        headers: {
            Authorization: "Bearer " +"eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoidXNlciIsInN1YiI6InVzZXJAZXhhbXBsZS5jb20iLCJpYXQiOjE3NDM5MjE2MTQsImV4cCI6MTc0NDk1ODQxNH0.39sBbE25H79CxXFwPxuniNn_prGRRBgox29lX74MfomMjyNBn3dv6dVR6-vwUgWtyEp73xHmcVmK3IRHJjN6Ag"
        },
        success: function (response) {
            console.log(response);
            alert(response.message);
            loadInventoryTable();
            clearForm();
        },
        error: function (xhr, status, error) {
            console.error("Error loading data:", xhr.responseText);
            alert('Error loading inventory data');
        }
    });

}
function clearForm() {
    $("#bloodType").val("");
    $("#units").val("");
    $("#donationDate").val("");
    $("#expiryDate").val("");
}
function loadInventoryTable() {
    let today = new Date();
    $.ajax({
        url: 'http://localhost:8080/api/v1/blood-inventory/getAll',
        type: 'GET',
        contentType: "application/json",
        dataType: "json",
        headers: {
            Authorization: "Bearer " +"eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoidXNlciIsInN1YiI6InVzZXJAZXhhbXBsZS5jb20iLCJpYXQiOjE3NDM5MjE2MTQsImV4cCI6MTc0NDk1ODQxNH0.39sBbE25H79CxXFwPxuniNn_prGRRBgox29lX74MfomMjyNBn3dv6dVR6-vwUgWtyEp73xHmcVmK3IRHJjN6Ag"
        },
        success: function (response) {
            console.log(response.data);

            let bloodin = response.data;
            console.log(bloodin.length);

            $("#inventoryBody").empty();

            // Array to hold IDs of expired items for deletion
            let expiredItems = [];

            bloodin.forEach(function (item) {
                console.log(item);

                let expiryDate = new Date(item.expiryDate);
                let timeDiff = expiryDate - today;
                let daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

                // Check if item is expired
                if (daysRemaining < 0) {
                    expiredItems.push(item.id); // Add to expired items list
                    return; // Skip adding to table
                }

                let statusClass = '';
                let statusText = '';

                if (daysRemaining < 7) {
                    statusClass = 'status-warning';
                    statusText = `Warning (${daysRemaining} days left)`;
                } else {
                    statusClass = 'status-good';
                    statusText = `Good (${daysRemaining} days left)`;
                }

                let row = `<tr>
                    <td>${item.bloodType}</td>
                    <td>${item.units}</td>
                    <td>${formatDateTime(item.donationDate)}</td>
                    <td>${formatDateTime(item.expiryDate)}</td>
                    <td><span class="status-tag ${statusClass}">${statusText}</span></td>
                </tr>`;

                $('#inventoryBody').append(row);
            });

            // Delete all expired items if any found
            if (expiredItems.length > 0) {
                deleteExpiredItems(expiredItems);
            }
        },
        error: function (xhr, status, error) {
            console.error("Error loading data:", xhr.responseText);
            alert('Error loading inventory data');
        }
    });
}

// Function to delete expired items
function deleteExpiredItems(ids) {
    // You might want to confirm with user before mass deletion
    if (confirm(`${ids.length} expired items found. Delete them automatically?`)) {
        // Delete each expired item
        ids.forEach(id => {
            $.ajax({
                url: `http://localhost:8080/api/v1/blood-inventory/delete/${id}`,
                type: 'DELETE',
                headers: {
                    Authorization: "Bearer " +"eyJhbGciOiJIUzUxMiJ9.eyJyb2xlIjoidXNlciIsInN1YiI6InVzZXJAZXhhbXBsZS5jb20iLCJpYXQiOjE3NDM5MjE2MTQsImV4cCI6MTc0NDk1ODQxNH0.39sBbE25H79CxXFwPxuniNn_prGRRBgox29lX74MfomMjyNBn3dv6dVR6-vwUgWtyEp73xHmcVmK3IRHJjN6Ag"
                },
                success: function() {
                    console.log(`Deleted expired item with ID: ${id}`);
                },
                error: function(xhr) {
                    console.error(`Error deleting item ${id}:`, xhr.responseText);
                }
            });
        });

        // Show notification
        showError(`${ids.length} expired items were automatically deleted.`);

        // Refresh the table after deletion
        setTimeout(loadInventoryTable, 1000);
    }
}
// Call the function to load inventory table data when page loads
$(document).ready(function() {
    loadInventoryTable();

    // Check for expired items every hour (3600000 milliseconds)
    setInterval(loadInventoryTable, 3600000);
});