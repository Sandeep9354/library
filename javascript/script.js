// Main Heading Text
const text = "Welcome to the School ";
const text_2 = "Library";

// Subheading Text Options
const subTexts = [
  "Explore, discover, and manage your ",
  "Borrow and return books easily at ",
  "Get recommendations and discover new ",
];
const subTexts_2 = [" books!", "our library!", "genres!"];

let index = 0;
function typeText() {
  if (index < text.length) {
    document.getElementById("typing-text").textContent += text.charAt(index);
    index++;
    setTimeout(typeText, 100);
  } else {
    typeText2();
  }
}

let index2 = 0;
function typeText2() {
  if (index2 < text_2.length) {
    document.getElementById("typing-text-2").textContent +=
      text_2.charAt(index2);
    index2++;
    setTimeout(typeText2, 100);
  } else {
    document.getElementById("cursor").style.display = "none";
    typeSubText(); // Start typing subheading after main heading finishes
  }
}

let subIndex = 0;
let subIndex2 = 0;
let currentSubIndex = 0;
let isErasing = false;

function typeSubText() {
  if (!isErasing) {
    // Typing Effect
    if (subIndex < subTexts[currentSubIndex].length) {
      document.getElementById("sub-typing-text").textContent +=
        subTexts[currentSubIndex].charAt(subIndex);
      subIndex++;
      setTimeout(typeSubText, 50);
    } else if (subIndex2 < subTexts_2[currentSubIndex].length) {
      document.getElementById("sub-typing-text-2").textContent +=
        subTexts_2[currentSubIndex].charAt(subIndex2);
      subIndex2++;
      setTimeout(typeSubText, 50);
    } else {
      setTimeout(eraseSubText, 1500); // Pause before erasing
    }
  }
}

function eraseSubText() {
  isErasing = true;

  if (subIndex2 > 0) {
    document.getElementById("sub-typing-text-2").textContent = subTexts_2[
      currentSubIndex
    ].substring(0, subIndex2 - 1);
    subIndex2--;
    setTimeout(eraseSubText, 30);
  } else if (subIndex > 0) {
    document.getElementById("sub-typing-text").textContent = subTexts[
      currentSubIndex
    ].substring(0, subIndex - 1);
    subIndex--;
    setTimeout(eraseSubText, 30);
  } else {
    isErasing = false;
    currentSubIndex = (currentSubIndex + 1) % subTexts.length;
    setTimeout(typeSubText, 500); // Start typing next sentence after a short delay
  }
}

window.onload = () => {
  setTimeout(typeText, 500); // Start typing after delay
};
// Scroll left
document.querySelector(".left-btn").addEventListener("click", () => {
  document.querySelector(".featured-books").scrollBy({
    left: -200,
    behavior: "smooth",
  });
});

// Scroll right
document.querySelector(".right-btn").addEventListener("click", () => {
  document.querySelector(".featured-books").scrollBy({
    left: 200,
    behavior: "smooth",
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const list = document.getElementById("announcement-list");
  const announcements = document.querySelectorAll(".announcement-card");
  let speed = 1; // Adjust scrolling speed
  let scrollPosition = 0;
  let isScrolling = true;

  // Duplicate announcements for smooth infinite scrolling
  announcements.forEach((announcement) => {
    let clone = announcement.cloneNode(true);
    list.appendChild(clone);
  });

  function scroll() {
    if (isScrolling) {
      scrollPosition += speed;
      let scrollHeight = list.scrollHeight / 2; // Half since it's duplicated

      if (scrollPosition >= scrollHeight) {
        scrollPosition = 0;
        list.style.transition = "none"; // Reset without flicker
        list.style.transform = `translateY(0)`;
      } else {
        list.style.transition = "transform 0.03s linear";
        list.style.transform = `translateY(-${scrollPosition}px)`;
      }
    }
    requestAnimationFrame(scroll);
  }

  // Start scrolling
  scroll();

  // Handle click to stop/start scrolling
  list.addEventListener("click", () => {
    isScrolling = !isScrolling; // Toggle scrolling state
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const booksList = document.querySelector(".books-list");
  let scrollSpeed = 1;
  let scrollInterval;

  function startAutoScroll() {
    scrollInterval = setInterval(() => {
      booksList.scrollLeft += scrollSpeed;
      if (
        booksList.scrollLeft >=
        booksList.scrollWidth - booksList.clientWidth
      ) {
        booksList.scrollLeft = 0;
      }
    }, 20);
  }

  function stopAutoScroll() {
    clearInterval(scrollInterval);
  }

  booksList.addEventListener("mouseenter", stopAutoScroll);
  booksList.addEventListener("mouseleave", startAutoScroll);

  startAutoScroll();
});
// Function to open/close sliding panel
function toggleProfilePanel() {
  const panel = document.getElementById("profile-panel");
  const overlay = document.getElementById("overlay");
  panel.classList.toggle("open");
  overlay.classList.toggle("show");
}

// Function to switch to Display Settings
function showDisplaySettings() {
  const panelContent = document.getElementById("profile-panel-content");

  panelContent.innerHTML = `
       <button class="close-btn" onclick="toggleProfilePanel()">✖</button>
       <h3 class="panel-title"><a href="#"><i class="fa-solid fa-cogs slide-icon options-icons"></i> Settings</a></h3>
       <div class="profile-links">
           <!-- Theme Toggle -->
           <div class="setting-item-option">
               <div class="toggle-container">
                   <label class="toggle-status" id="toggle-status">Light Mode</label>
                   <div class="toggle">
                       <div class="toggle-switch">
                           <input type="checkbox" id="theme-toggle" onchange="toggleTheme()">
                           <label for="theme-toggle"></label>
                       </div>
                   </div>
               </div>
           </div>

           <!-- Auto Theme Toggle -->
           <div class="setting-item-option">
               <label>
                   <input type="checkbox" id="auto-theme-toggle" onchange="toggleAutoTheme()"> Auto Theme (Follow System)
               </label>
           </div>

         

           <a href="#" onclick="showInitialOptions()">
               <i class="fa-solid fa-arrow-left"></i> Back
           </a>
       </div>
    `;

  loadTheme(); // Ensure theme is loaded properly
  loadLanguage(); // Ensure language is loaded properly
}

// Function to restore initial options
function showInitialOptions() {
  const panelContent = document.getElementById("profile-panel-content");

  panelContent.innerHTML = `
        <button class="close-btn" onclick="toggleProfilePanel()">✖</button>
        <div class="profile-header">
            <img src="profile.jpg" alt="User">
            <h3 class="">John Doe</h3>
            <p class="sliding-pannel-mail">johndoe@gmail.com</p>
        </div>
        <div class="profile-links">
            <a href="#" onclick="showProfileSettings()"><i class="fa-solid fa-user""></i> Profile</a>
            <a href="#" onclick="showDisplaySettings()"><i class="fa-solid fa-cogs"></i> Settings</a>
            <a href="#"><i class="fa-solid fa-book"></i> My Books</a>
            <a href="#"><i class="fa-solid fa-sign-out-alt"></i> Logout</a>
        </div>
    `;
}

// 🌙 Toggle Light and Dark Mode
function toggleTheme() {
  const body = document.body;
  const toggleStatus = document.getElementById('toggle-status');
  const themeToggle = document.getElementById('theme-toggle');

  if (themeToggle.checked) {
    body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
    toggleStatus.innerHTML = 'Dark Mode ';
  } else {
    body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
    toggleStatus.innerHTML = 'Light Mode ';
  }

  // Disable auto-theme if user manually changes theme
  localStorage.setItem('auto-theme', 'disabled');
  document.getElementById('auto-theme-toggle').checked = false;
}

// 🌍 Auto Theme Based on System Settings
function toggleAutoTheme() {
  const autoThemeToggle = document.getElementById('auto-theme-toggle');
  
  if (autoThemeToggle.checked) {
    localStorage.setItem('auto-theme', 'enabled');
    applySystemTheme(); // Apply system theme immediately
  } else {
    localStorage.setItem('auto-theme', 'disabled');
  }
}

function applySystemTheme() {
  const body = document.body;
  const toggleStatus = document.getElementById('toggle-status');
  const themeToggle = document.getElementById('theme-toggle');

  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
    themeToggle.checked = true;
    toggleStatus.innerHTML = 'Dark Mode ';
  } else {
    body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
    themeToggle.checked = false;
    toggleStatus.innerHTML = 'Light Mode ';
  }
}

// 🌟 Load Theme Based on System First, Then User Preference
function loadTheme() {
  const autoTheme = localStorage.getItem('auto-theme');

  if (autoTheme === null) {
    // First time: Apply system theme by default
    applySystemTheme();
    localStorage.setItem('auto-theme', 'enabled'); // Enable auto theme by default
    document.getElementById('auto-theme-toggle').checked = true;
  } else if (autoTheme === 'enabled') {
    applySystemTheme();
    document.getElementById('auto-theme-toggle').checked = true;
  } else {
    // Apply saved user preference
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      document.body.classList.add('dark-mode');
      document.getElementById('theme-toggle').checked = true;
      document.getElementById('toggle-status').innerHTML = 'Dark Mode ';
    } else {
      document.body.classList.remove('dark-mode');
      document.getElementById('theme-toggle').checked = false;
      document.getElementById('toggle-status').innerHTML = 'Light Mode ';
    }
  }
}

// Load theme and language when the page loads
document.addEventListener('DOMContentLoaded', () => {
  loadTheme(); // Auto apply system theme on first load
});

