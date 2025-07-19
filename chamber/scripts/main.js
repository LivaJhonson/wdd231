// Function to get the last modified date of the document
function getLastModified() {
    const lastModifiedElement = document.getElementById('lastmodified');
    if (lastModifiedElement) {
        const lastModDate = new Date(document.lastModified);
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        lastModifiedElement.textContent = lastModDate.toLocaleDateString('en-US', options);
    }
}

// Function to set the current year in the footer
function setCurrentYear() {
    const currentYearElement = document.getElementById('currentyear');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
}

// Function to create and display a single member card/list item
const displayMember = (member) => {
    const section = document.createElement('section');
    section.classList.add('member-card');

    // Image
    const image = document.createElement('img');
    image.src = `images/${member.image}`; // Assumes images are in 'chamber/images/'
    image.alt = `${member.name} logo`;
    image.loading = 'lazy';
    image.width = 100;
    image.height = 100;

    // Name
    const h3 = document.createElement('h3');
    h3.textContent = member.name;

    // Address
    const address = document.createElement('p');
    address.textContent = member.address;
    address.classList.add('member-address');

    // Phone
    const phone = document.createElement('p');
    phone.textContent = `Phone: ${member.phone}`;
    phone.classList.add('member-phone');

    // Website (link)
    const website = document.createElement('a');
    website.href = member.website;
    website.textContent = "Visit Website";
    website.setAttribute('target', '_blank');
    website.setAttribute('rel', 'noopener noreferrer');

    // Membership Level
    const membership = document.createElement('p');
    membership.textContent = `Membership: ${member.membershipLevel.charAt(0).toUpperCase() + member.membershipLevel.slice(1)}`;
    membership.classList.add('member-membership');

    // Append elements to the section
    section.appendChild(image);
    section.appendChild(h3);
    section.appendChild(address);
    section.appendChild(phone);
    section.appendChild(website);
    section.appendChild(membership);

    // Add otherInfo if present in JSON
    if (member.otherInfo) {
        const otherInfo = document.createElement('p');
        otherInfo.textContent = member.otherInfo;
        otherInfo.classList.add('member-other-info');
        section.appendChild(otherInfo);
    }

    return section;
};

// Function to fetch members data and display them
async function getMembers() {
    const url = '../data/members.json'; // Path to your JSON file within 'chamber/data/'
    const cardsContainer = document.querySelector('.member-display');

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const members = await response.json();
        console.log("Fetched Members:", members); // Log data for debugging

        cardsContainer.innerHTML = ''; // Clear existing content

        members.forEach(member => {
            const memberElement = displayMember(member);
            cardsContainer.appendChild(memberElement);
        });

        // Set initial view to grid and activate the corresponding button
        cardsContainer.classList.add('grid-view');
        document.getElementById('grid-view-btn').classList.add('active');

    } catch (error) {
        console.error('Could not fetch members:', error);
        cardsContainer.innerHTML = '<p>Error loading member data. Please try again later.</p>';
    }
}

// --- Event Listeners for Grid/List Toggle and Header Functionality ---
document.addEventListener('DOMContentLoaded', () => {
    setCurrentYear();
    getLastModified();

    // Only try to fetch members if we are on the directory page
    // This prevents errors if directory-specific elements are not on other pages
    if (document.querySelector('.member-display')) {
        getMembers();

        const gridButton = document.getElementById('grid-view-btn');
        const listButton = document.getElementById('list-view-btn');
        const memberDisplayContainer = document.querySelector('.member-display');

        gridButton.addEventListener('click', () => {
            memberDisplayContainer.classList.remove('list-view');
            memberDisplayContainer.classList.add('grid-view');
            gridButton.classList.add('active');
            listButton.classList.remove('active');
        });

        listButton.addEventListener('click', () => {
            memberDisplayContainer.classList.remove('grid-view');
            memberDisplayContainer.classList.add('list-view');
            listButton.classList.add('active');
            gridButton.classList.remove('active');
        });
    }


    // --- Header / Navigation Functionality (from your existing structure) ---

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('show'); // Toggles the 'show' class to reveal/hide menu
            // Update ARIA attribute for accessibility
            const isExpanded = navLinks.classList.contains('show');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });

        // Close menu if a link is clicked (useful for single-page nav or just tidiness)
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('show');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // Dark Mode Toggle
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDarkMode = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDarkMode); // Save user preference
            darkModeToggle.textContent = isDarkMode ? '☀️' : '🌙'; // Change icon
            darkModeToggle.setAttribute('aria-label', isDarkMode ? 'Toggle light mode' : 'Toggle dark mode');
        });

        // Apply dark mode preference on page load
        const savedDarkMode = localStorage.getItem('darkMode');
        if (savedDarkMode === 'true') {
            document.body.classList.add('dark-mode');
            darkModeToggle.textContent = '☀️';
            darkModeToggle.setAttribute('aria-label', 'Toggle light mode');
        } else {
            // Ensure correct icon if dark mode is not active on load
            darkModeToggle.textContent = '🌙';
            darkModeToggle.setAttribute('aria-label', 'Toggle dark mode');
        }
    }
});