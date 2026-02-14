// =============================
// Hamburger toggle
// =============================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Mobile dropdown toggle
document.querySelectorAll('.dropdown .dropbtn').forEach(btn => {
  btn.addEventListener('click', e => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      btn.parentElement.classList.toggle('active');
    }
  });
});

// Close mobile menu when clicking a regular link (not dropdown parent)
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', (e) => {
    const parent = link.parentElement;
    if (window.innerWidth <= 768 && !parent.classList.contains('dropdown')) {
      navLinks.classList.remove('open');
      document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('active'));
    }
  });
});


// =============================
// Particles.js Neon Background
// =============================
particlesJS('particles-js', {
  particles: {
    number: { value: window.innerWidth < 768 ? 30 : 80 },
    color: { value: "#00ffff" },
    shape: { type: "circle" },
    opacity: { value: 0.5, random: true },
    size: { value: 3, random: true },
    line_linked: { enable: true, distance: 150, color: "#00ffff", opacity: 0.4, width: 1 },
    move: { enable: true, speed: 2 }
  },
  interactivity: {
    detect_on: 'window',
    events: {
      onhover: { enable: true, mode: "grab" },
      onclick: { enable: true, mode: "attract" }
    },
    modes: {
      grab: { distance: 140, line_linked: { opacity: 0.7 } },
      push: { particles_nb: 4 },
      attract: { distance: 150, duration: 0.4 }
    }
  },
  retina_detect: true
});




// =============================
// FAQ Toggle with Glow
// =============================
document.querySelectorAll(".faq-question").forEach((question) => {
  question.addEventListener("click", () => {
    const item = question.parentElement;

    // Collapse all others
    document.querySelectorAll(".faq-item").forEach(faq => {
      if (faq !== item) {
        faq.classList.remove("active");
        faq.querySelector(".faq-icon").textContent = "+";
      }
    });

    // Toggle current
    item.classList.toggle("active");
    const icon = question.querySelector(".faq-icon");
    icon.textContent = item.classList.contains("active") ? "−" : "+";
  });
});

// Open first FAQ by default
const firstFaq = document.querySelector(".faq-item");
if (firstFaq) {
  firstFaq.classList.add("active");
  const firstIcon = firstFaq.querySelector(".faq-icon");
  if (firstIcon) firstIcon.textContent = "−";
}

// =============================
// Contact Form (Cloudflare + Brevo)
// =============================
const contactForm = document.querySelector('.contact-form');
const formPopup = document.getElementById('form-popup');

if (contactForm && formPopup) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = {
      name: contactForm.name.value.trim(),
      email: contactForm.email.value.trim(),
      subject: contactForm.subject.value.trim(),
      message: contactForm.message.value.trim()
    };

    try {
      const response = await fetch('/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        formPopup.textContent = "Message Sent! Thank you for contacting us. We will reach out shortly.";
        formPopup.classList.add('show');
        contactForm.reset();
      } else {
        formPopup.textContent = "Failed to send message. Please try again.";
        formPopup.classList.add('show');
      }

    } catch (error) {
      formPopup.textContent = "Error sending message. Please try again.";
      formPopup.classList.add('show');
    }

    setTimeout(() => formPopup.classList.remove('show'), 4000);
  });
}

// Open new tab for all download links//
document.addEventListener("DOMContentLoaded", function() {
  const downloadLinks = document.querySelectorAll('a.button[href^="http"]'); // only external links

  downloadLinks.forEach(link => {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
  });
});
// Dynamic copyright year//
document.addEventListener("DOMContentLoaded", () => {
  const startYear = 2015;
  const currentYear = new Date().getFullYear();
  const yearText = currentYear > startYear ? `${startYear} - ${currentYear}` : startYear;
  const footer = document.getElementById("footer-text");
  if (footer) {
    footer.innerHTML = `${yearText} © Homecoming Gaming – All rights reserved`;
  }
});
/* ------------------------------
   COOKIE BANNER
--------------------------------*/

document.addEventListener("DOMContentLoaded", () => {
  const banner = document.getElementById("cookie-banner");
  const acceptBtn = document.getElementById("accept-cookies");
  const declineBtn = document.getElementById("decline-cookies");

  // Show banner only once per session
  if (!sessionStorage.getItem("cookieChoice")) {
    banner.classList.add("show");
  }

  const handleChoice = (choice) => {
    sessionStorage.setItem("cookieChoice", choice);
    banner.classList.remove("show");
  };

  acceptBtn.addEventListener("click", () => handleChoice("accepted"));
  declineBtn.addEventListener("click", () => handleChoice("declined"));
});
