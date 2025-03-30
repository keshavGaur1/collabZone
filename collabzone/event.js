function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const menuBtn = document.getElementById("menu-btn");
  const closeBtn = document.getElementById("close-btn");

  // Toggle sidebar visibility
  const isOpen = sidebar.classList.toggle("open");

  // Set button visibility accordingly
  menuBtn.style.display = isOpen ? "none" : "block";
  closeBtn.style.display = isOpen ? "block" : "none";

  // Save sidebar state in local storage (to prevent unwanted behavior on page reload)
  // localStorage.setItem("sidebarOpen", isOpen);
}

// // Ensure sidebar is closed on page load (or restore state from localStorage)
// window.onload = function () {
//   const sidebar = document.getElementById("sidebar");
//   const menuBtn = document.getElementById("menu-btn");
//   const closeBtn = document.getElementById("close-btn");

//   const isOpen = localStorage.getItem("sidebarOpen") === "true";

//   if (isOpen) {
//     sidebar.classList.add("open");
//     menuBtn.style.display = "none";
//     closeBtn.style.display = "block";
//   } else {
//     sidebar.classList.remove("open");
//     menuBtn.style.display = "block";
//     closeBtn.style.display = "none";
//   }
// };
