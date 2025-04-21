// Elements
const steps = document.querySelectorAll('.form-step');
const progressSteps = document.querySelectorAll('.progress-step');
const amountButtons = document.querySelectorAll('.amount-btn');
const customAmount = document.getElementById('customAmount');
const paymentOptions = document.querySelectorAll('.payment-option');
const creditPayment = document.getElementById('creditPayment');
const bankPayment = document.getElementById('bankPayment');
const payherePayment = document.getElementById('payherePayment');
const thankYou = document.getElementById('thankYou');
const fetchDonationsBtn = document.getElementById('fetchDonations');
const donationsTableBody = document.getElementById('donationsTableBody');
const bankSelection = document.getElementById('bankSelection');

// Navigation buttons
const toStep2 = document.getElementById('toStep2');
const backToStep1 = document.getElementById('backToStep1');
const toStep3 = document.getElementById('toStep3');
const backToStep2 = document.getElementById('backToStep2');
const toStep4 = document.getElementById('toStep4');
const backToStep3 = document.getElementById('backToStep3');
const completeDonation = document.getElementById('completeDonation');

// Error message elements
const errorMessages = {
    name: document.getElementById('name-error'),
    email: document.getElementById('email-error'),
    phone: document.getElementById('phone-error'),
    amount: document.getElementById('amount-error'),
    payment: document.getElementById('payment-error'),
    cardName: document.getElementById('cardName-error'),
    cardNumber: document.getElementById('cardNumber-error'),
    expiry: document.getElementById('expiry-error'),
    cvv: document.getElementById('cvv-error'),
    proofOfPayment: document.getElementById('proofOfPayment-error'),
    bankSelection: document.getElementById('bankSelection-error')
};

// Backend API URL
const API_URL = 'http://localhost:8080/api/v1/donations';

// Card formatting
const cardNumber = document.getElementById('cardNumber');
if (cardNumber) {
    cardNumber.addEventListener('input', function(e) {
        let value = this.value.replace(/\D/g, '');
        value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
        this.value = value.slice(0, 19);
    });
}

// Expiry date formatting
const expiry = document.getElementById('expiry');
if (expiry) {
    expiry.addEventListener('input', function(e) {
        let value = this.value.replace(/\D/g, '');
        if (value.length > 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        this.value = value.slice(0, 5);
    });
}

// Navigation functions
function showStep(stepNumber) {
    steps.forEach(step => step.classList.remove('active'));
    const currentStep = document.getElementById('step' + stepNumber);
    if (currentStep) {
        currentStep.classList.add('active');
        updateProgressBar(stepNumber);
    } else {
        console.error(`Step ${stepNumber} not found`);
    }
}

function updateProgressBar(currentStep) {
    progressSteps.forEach((step, index) => {
        const stepNum = index + 1;
        if (stepNum < currentStep) {
            step.classList.add('step-complete');
            step.classList.remove('step-active');
        } else if (stepNum === currentStep) {
            step.classList.add('step-active');
            step.classList.remove('step-complete');
        } else {
            step.classList.remove('step-active');
            step.classList.remove('step-complete');
        }
    });
}

// Clear error messages
function clearErrors() {
    Object.values(errorMessages).forEach(error => {
        if (error) {
            error.style.display = 'none';
        }
    });
}

// Show error message
function showError(field, show = true) {
    if (errorMessages[field]) {
        errorMessages[field].style.display = show ? 'block' : 'none';
    } else {
        console.error(`Error element for ${field} not found`);
    }
    return !show;
}

// Validate email
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Amount button handlers
amountButtons.forEach(button => {
    button.addEventListener('click', function() {
        amountButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        if (customAmount) {
            customAmount.value = this.getAttribute('data-amount');
        }
    });
});

// Custom amount handler
if (customAmount) {
    customAmount.addEventListener('input', function() {
        amountButtons.forEach(btn => btn.classList.remove('active'));
    });
}

// Payment method handlers
paymentOptions.forEach(option => {
    option.addEventListener('click', function() {
        paymentOptions.forEach(opt => opt.classList.remove('active'));
        this.classList.add('active');
        const paymentType = this.getAttribute('data-payment');
        if (creditPayment) creditPayment.style.display = paymentType === 'credit' ? 'block' : 'none';
        if (bankPayment) bankPayment.style.display = paymentType === 'bank' ? 'block' : 'none';
        if (payherePayment) payherePayment.style.display = paymentType === 'payhere' ? 'block' : 'none';
    });
});

// Navigation event listeners
if (toStep2) {
    toStep2.addEventListener('click', function() {
        clearErrors();
        const name = document.getElementById('name')?.value.trim() || '';
        const email = document.getElementById('email')?.value.trim() || '';
        const phone = document.getElementById('phone')?.value.trim() || '';

        let isValid = true;
        if (!name) isValid = showError('name') && isValid;
        if (!email || !isValidEmail(email)) isValid = showError('email') && isValid;
        if (!phone) isValid = showError('phone') && isValid;

        if (isValid) showStep(2);
    });
}

if (backToStep1) {
    backToStep1.addEventListener('click', function() {
        showStep(1);
    });
}

if (toStep3) {
    toStep3.addEventListener('click', function() {
        clearErrors();
        const amount = customAmount?.value.trim() || '';

        if (!amount || parseFloat(amount) <= 0) {
            showError('amount');
            return;
        }

        showStep(3);
    });
}

if (backToStep2) {
    backToStep2.addEventListener('click', function() {
        showStep(2);
    });
}

if (toStep4) {
    toStep4.addEventListener('click', function() {
        clearErrors();
        const activePayment = document.querySelector('.payment-option.active');
        const paymentType = activePayment ? activePayment.getAttribute('data-payment') : null;

        if (!paymentType) {
            showError('payment');
            return;
        }

        let isValid = true;
        if (paymentType === 'credit') {
            const cardName = document.getElementById('cardName')?.value.trim() || '';
            const cardNum = document.getElementById('cardNumber')?.value.replace(/\s/g, '') || '';
            const expiryDate = document.getElementById('expiry')?.value.trim() || '';
            const cvv = document.getElementById('cvv')?.value.trim() || '';

            if (!cardName) isValid = showError('cardName') && isValid;
            if (!cardNum || cardNum.length < 15) isValid = showError('cardNumber') && isValid;
            if (!expiryDate || !/^\d{2}\/\d{2}$/.test(expiryDate)) isValid = showError('expiry') && isValid;
            if (!cvv || cvv.length < 3) isValid = showError('cvv') && isValid;
        } else if (paymentType === 'bank') {
            const proofFile = document.getElementById('proofOfPayment')?.files[0];
            if (!proofFile) isValid = showError('proofOfPayment') && isValid;
            if (bankSelection && !bankSelection.value) isValid = showError('bankSelection') && isValid;
        }

        if (!isValid) return;

        // Update summary
        const name = document.getElementById('name')?.value.trim() || '';
        const email = document.getElementById('email')?.value.trim() || '';
        const phone = document.getElementById('phone')?.value.trim() || '';
        const amount = customAmount?.value.trim() || '0';
        const paymentMethodText = paymentType === 'credit' ? 'Credit/Debit Card' :
            paymentType === 'bank' ? 'Bank Transfer' : 'PayHere';

        const summaryName = document.getElementById('summary-name');
        if (summaryName) summaryName.textContent = name;

        const summaryEmail = document.getElementById('summary-email');
        if (summaryEmail) summaryEmail.textContent = email;

        const summaryPhone = document.getElementById('summary-phone');
        if (summaryPhone) summaryPhone.textContent = phone;

        const summaryAmount = document.getElementById('summary-amount');
        if (summaryAmount) summaryAmount.textContent = 'LKR ' + Number(amount).toLocaleString();

        const summaryPayment = document.getElementById('summary-payment');
        if (summaryPayment) summaryPayment.textContent = paymentMethodText;

        showStep(4);
    });
}

if (backToStep3) {
    backToStep3.addEventListener('click', function() {
        showStep(3);
    });
}

if (completeDonation) {
    completeDonation.addEventListener('click', async function() {
        clearErrors();
        const name = document.getElementById('name')?.value.trim() || '';
        const email = document.getElementById('email')?.value.trim() || '';
        const phone = document.getElementById('phone')?.value.trim() || '';
        const nic = document.getElementById('nic')?.value.trim() || '';
        const amount = Number(customAmount?.value.trim() || '0');
        const activePayment = document.querySelector('.payment-option.active');
        const paymentType = activePayment ? activePayment.getAttribute('data-payment') : null;

        // Map frontend payment method to backend values
        const paymentMethodMap = {
            'credit': 'CREDIT_CARD',
            'bank': 'BANK_TRANSFER',
            'payhere': 'PAYHERE'
        };
        const paymentMethod = paymentMethodMap[paymentType] || 'UNKNOWN';

        // Prepare payment details
        const paymentDetails = {};
        if (paymentType === 'credit') {
            paymentDetails.cardHolderName = document.getElementById('cardName')?.value.trim() || '';
            paymentDetails.cardNumber = document.getElementById('cardNumber')?.value.replace(/\s/g, '') || '';
            paymentDetails.cardType = determineCardType(paymentDetails.cardNumber);
        } else if (paymentType === 'bank') {
            const proofFile = document.getElementById('proofOfPayment')?.files[0];
            if (!proofFile) {
                showError('proofOfPayment');
                return;
            }
            if (!bankSelection || !bankSelection.value) {
                showError('bankSelection');
                return;
            }
            paymentDetails.referenceNumber = nic || 'N/A';
            paymentDetails.bankName = bankSelection.value;
            console.log('Bank Name before sending:', paymentDetails.bankName); // Debug
        } else if (paymentType === 'payhere') {
            paymentDetails.payhereTransactionId = 'PENDING';
        }

        // Prepare JSON request body
        const requestData = {
            fullName: name,
            email: email,
            mobileNumber: phone,
            nicNumber: nic || '',
            amount: amount,
            paymentMethod: paymentMethod,
            paymentDetails: paymentDetails
        };

        console.log('Request Data:', requestData); // Debug

        try {
            completeDonation.disabled = true;
            completeDonation.textContent = 'Processing...';

            // Handle bank transfer proof of payment
            if (paymentType === 'bank') {
                const proofFile = document.getElementById('proofOfPayment')?.files[0];
                if (proofFile) {
                    const formData = new FormData();
                    formData.append('file', proofFile);
                    formData.append('donationData', JSON.stringify(requestData));

                    const response = await fetch(`${API_URL}/donate/bank-transfer`, {
                        method: 'POST',
                        body: formData
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.message || 'Failed to process bank transfer donation');
                    }

                    const data = await response.json();
                    handleSuccessfulDonation(data);
                    return;
                } else {
                    throw new Error('Proof of payment is required for bank transfers');
                }
            }

            // Handle credit card and PayHere
            const response = await fetch(`${API_URL}/donate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(requestData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to process donation');
            }

            const data = await response.json();
            handleSuccessfulDonation(data);

        } catch (error) {
            alert('Error: ' + error.message);
        } finally {
            completeDonation.disabled = false;
            completeDonation.textContent = 'Complete Donation';
        }
    });
}

function handleSuccessfulDonation(data) {
    // Hide all steps
    steps.forEach(step => step.classList.remove('active'));
    if (thankYou) {
        thankYou.style.display = 'block';
    }

    // Update transaction details
    const transactionId = document.getElementById('transaction-id');
    if (transactionId) transactionId.textContent = data.transactionId;

    const transactionDate = document.getElementById('transaction-date');
    if (transactionDate) transactionDate.textContent = new Date(data.donationDate).toLocaleDateString('en-US', {
        month: 'long', day: 'numeric', year: 'numeric'
    });

    const transactionAmount = document.getElementById('transaction-amount');
    if (transactionAmount) transactionAmount.textContent = 'LKR ' + Number(data.amount).toLocaleString();

    // Update progress bar
    progressSteps.forEach(step => {
        step.classList.add('step-complete');
        step.classList.remove('step-active');
    });
}

// Determine card type
function determineCardType(cardNumber) {
    if (!cardNumber) return 'UNKNOWN';
    cardNumber = cardNumber.replace(/\s|-/g, '');
    const firstDigit = cardNumber.charAt(0);
    switch (firstDigit) {
        case '4': return 'VISA';
        case '5': return 'MASTERCARD';
        case '3': return 'AMEX';
        default: return 'OTHER';
    }
}

// Fetch all donations
async function getAllDonations() {
    try {
        if (fetchDonationsBtn) {
            fetchDonationsBtn.disabled = true;
            fetchDonationsBtn.textContent = 'Loading...';
        }

        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch donations');
        }

        const donations = await response.json();

        // Clear existing table content
        if (donationsTableBody) {
            donationsTableBody.innerHTML = '';

            // Populate table with donations
            donations.forEach(donation => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${donation.fullName}</td>
                    <td>LKR ${Number(donation.amount).toLocaleString()}</td>
                    <td>${donation.paymentMethod}</td>
                    <td>${donation.paymentStatus}</td>
                    <td>${new Date(donation.donationDate).toLocaleDateString('en-US', {
                    month: 'short', day: 'numeric', year: 'numeric'
                })}</td>
                `;
                donationsTableBody.appendChild(row);
            });

            // If no donations, show a message
            if (donations.length === 0) {
                donationsTableBody.innerHTML = '<tr><td colspan="5">No donations found</td></tr>';
            }
        }
    } catch (error) {
        alert('Error: ' + error.message);
    } finally {
        if (fetchDonationsBtn) {
            fetchDonationsBtn.disabled = false;
            fetchDonationsBtn.textContent = 'Fetch All Donations';
        }
    }
}

// Event listener for fetching donations
if (fetchDonationsBtn) {
    fetchDonationsBtn.addEventListener('click', getAllDonations);
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    showStep(1);
    const initialPayment = document.querySelector('.payment-option.active');
    if (initialPayment) {
        const paymentType = initialPayment.getAttribute('data-payment');
        if (creditPayment) creditPayment.style.display = paymentType === 'credit' ? 'block' : 'none';
        if (bankPayment) bankPayment.style.display = paymentType === 'bank' ? 'block' : 'none';
        if (payherePayment) payherePayment.style.display = paymentType === 'payhere' ? 'block' : 'none';
    }
});