// Register functionality
document.getElementById("registerForm")?.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (name && email && password && confirmPassword) {
        // Check if passwords match
        if (password === confirmPassword) {
            // Hash password (for future security - placeholder here)
            const hashedPassword = btoa(password); // Using base64 encoding as a placeholder (not secure)

            // Save user data in localStorage
            const user = { name, email, password: hashedPassword };
            localStorage.setItem("user", JSON.stringify(user));
            alert("Registration successful! You can now log in.");
            // Redirect to login page
            window.location.href = "login.html"; // Automatically redirect to the login page after registration
        } else {
            alert("Passwords do not match. Please try again.");
        }
    } else {
        alert("Please fill all fields correctly.");
    }
});

// Login functionality
document.getElementById("loginForm")?.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const storedUser = JSON.parse(localStorage.getItem("user"));

    // Check if the user exists and credentials match
    if (storedUser && storedUser.email === email && storedUser.password === btoa(password)) { // Use btoa to decode the hashed password
        alert(`Welcome, ${storedUser.name}!`);
        // Set a session or flag to indicate user is logged in
        localStorage.setItem("loggedIn", "true");
        // Redirect to profile page after login
        window.location.href = "profile.html"; // Redirect to profile page
    } else {
        alert("Invalid email or password. Please try again.");
    }
});

// Check if the user is logged in before allowing access to the home page or 'Get Started' button
document.getElementById("getStartedButton")?.addEventListener("click", function () {
    const loggedIn = localStorage.getItem("loggedIn");

    if (loggedIn === "true") {
        window.location.href = "profile.html"; // Redirect to profile page if logged in
    } else {
        window.location.href = "register.html"; // Redirect to registration page if not logged in
    }
});

// Check for login status on the homepage
window.addEventListener("load", function () {
    const loggedIn = localStorage.getItem("loggedIn");

    // If the user is logged in, the 'Get Started' button redirects to the profile page
    const getStartedButton = document.querySelector(".hero .btn");
    if (loggedIn === "true" && getStartedButton) {
        getStartedButton.addEventListener("click", function () {
            window.location.href = "profile.html";
        });
    }
});

// Join this Skill functionality
document.querySelectorAll(".join-skill-btn").forEach((button) => {
    button.addEventListener("click", function () {
        if (this.textContent === "Join this Skill") {
            this.textContent = "You Joined this Skill";
            this.classList.add("joined"); // Optionally, add a class to style joined buttons
        } else {
            this.textContent = "Join this Skill";
            this.classList.remove("joined"); // Remove the joined class when unjoining
        }
    });
});

// Carousel Functionality with Auto-slide and Indicator
let currentIndex = 0;
const slides = document.querySelectorAll('.carousel-slide');
const totalSlides = slides.length;
const nextButton = document.getElementById('nextButton');
const prevButton = document.getElementById('prevButton');

// Show the current slide based on index
function showSlide(index) {
    if (index >= totalSlides) {
        currentIndex = 0; // If we're at the last image, go back to the first one
    } else if (index < 0) {
        currentIndex = totalSlides - 1; // If we're at the first image, go to the last one
    }

    // Move the carousel to the correct image
    const offset = -currentIndex * 100; // Shift images according to the index
    document.querySelector('.carousel').style.transform = `translateX(${offset}%)`;

    // Update carousel indicators (optional, if you want visual feedback on current slide)
    const indicators = document.querySelectorAll('.carousel-indicator');
    indicators.forEach((indicator, idx) => {
        indicator.classList.remove('active');
        if (idx === currentIndex) {
            indicator.classList.add('active');
        }
    });
}

// Event listeners for carousel navigation
nextButton?.addEventListener('click', () => {
    currentIndex++;
    showSlide(currentIndex);
});

prevButton?.addEventListener('click', () => {
    currentIndex--;
    showSlide(currentIndex);
});

// Auto slide functionality (optional)
setInterval(() => {
    currentIndex++;
    showSlide(currentIndex);
}, 3000); // Slide every 3 seconds

// Show the first image initially
showSlide(currentIndex);

// Logout functionality (clearing session on logout)
document.getElementById("logoutBtn")?.addEventListener("click", function () {
    localStorage.removeItem("loggedIn"); // Remove login status
    window.location.href = "login.html"; // Redirect to login page
});

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".join-skill-btn").forEach((button) => {
        button.addEventListener("click", function () {
            if (this.textContent.trim() === "Join this Skill") {
                this.textContent = "You Joined this Skill";
                this.classList.add("joined");
            } else {
                this.textContent = "Join this Skill";
                this.classList.remove("joined");
            }
        });
    });
});
