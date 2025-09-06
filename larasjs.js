document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const formData = new FormData();
  formData.append("firstName", document.getElementById("firstName").value);
  formData.append("lastName", document.getElementById("lastName").value);
  formData.append("mobile", document.getElementById("mobile").value);
  formData.append("eventName", document.getElementById("eventName").value);
  formData.append("message", document.getElementById("message").value);

  // Popup show
  showPopup(`Thank you, ${document.getElementById("firstName").value}! We received your request for ${document.getElementById("eventName").value}.`);

  fetch("https://script.google.com/macros/s/AKfycbxB8mr7mSHiYNHFNF00wjNQeOsLsjxmrqqIBl5ltXwfATJS_yVTdUbIw3GNHUk3QEwS/exec", {
    method: "POST",
    body: formData
  })
  .then(res => res.text())
  .then(msg => {
    console.log("✅ Form submitted successfully: " + msg);
    document.getElementById("contactForm").reset();
    document.getElementById("responseMsg").innerText = "✅ Your response has been saved!";
  })
  .catch(err => {
    console.error("❌ Error: " + err);
    showPopup("❌ Error submitting form. Please try again.");
  });
});

// Popup
function showPopup(message) {
  let popup = document.createElement("div");
  popup.className = "popup-message";
  popup.innerText = message;
  document.body.appendChild(popup);

  setTimeout(() => {
    popup.style.opacity = "0";
    setTimeout(() => popup.remove(), 500);
  }, 3000);
}
