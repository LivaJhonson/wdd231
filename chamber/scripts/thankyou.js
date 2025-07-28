// scripts/thankyou.js - Specific functionality for the Thank You page

document.addEventListener('DOMContentLoaded', () => {

    const urlParams = new URLSearchParams(window.location.search);

    document.getElementById('display-fname').textContent = urlParams.get('fname') || 'N/A';
    document.getElementById('display-lname').textContent = urlParams.get('lname') || 'N/A';
    document.getElementById('display-email').textContent = urlParams.get('email') || 'N/A';
    document.getElementById('display-phone').textContent = urlParams.get('phone') || 'N/A';
    document.getElementById('display-orgname').textContent = urlParams.get('orgname') || 'N/A';
    
    const timestampValue = urlParams.get('timestamp');
    if (timestampValue) {
        try {
            // Attempt to format the timestamp for better readability
            const date = new Date(timestampValue);
            document.getElementById('display-timestamp').textContent = date.toLocaleString();
        } catch (e) {
            document.getElementById('display-timestamp').textContent = timestampValue; // Fallback to raw if invalid
            console.error("Error parsing timestamp:", e);
        }
    } else {
        document.getElementById('display-timestamp').textContent = 'N/A';
    }

});