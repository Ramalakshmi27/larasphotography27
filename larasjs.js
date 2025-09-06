document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const data = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    mobile: document.getElementById("mobile").value,
    eventName: document.getElementById("eventName").value,
    message: document.getElementById("message").value
  };

  // Show success message in popup
  showPopup(`Thank you, ${data.firstName}! We received your request for ${data.eventName}.`);

  // Send data to Google Script
  fetch("https://script.google.com/macros/s/AKfycbwrKrzy5lihHRih_GFYD-lixvFUVDbCYBQkMHjQeMq87l_FJ9pSqS0Tab_IJEv36MKy/exec", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(res => res.text())
  .then(msg => {
    console.log("✅ Form submitted successfully: " + msg);
    document.getElementById("contactForm").reset();
  })
  .catch(err => {
    console.error("❌ Error: " + err);
    showPopup("Error submitting form. Please try again.");
  });
});

// 🔹 Popup Function
function showPopup(message) {
  let popup = document.createElement("div");
  popup.className = "popup-message";
  popup.innerText = message;
  document.body.appendChild(popup);

  // Auto fade-out after 3 seconds
  setTimeout(() => {
    popup.style.opacity = "0";
    setTimeout(() => popup.remove(), 500);
  }, 3000);
}
