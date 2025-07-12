// scripts/course.js
document.addEventListener('DOMContentLoaded', () => {
    // Provided Course List Array
    const courses = [
        {
            subject: 'CSE',
            number: 110,
            title: 'Introduction to Programming',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
            technology: [
                'Python'
            ],
            completed: true 
        },
        {
            subject: 'WDD',
            number: 130,
            title: 'Web Fundamentals',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
            technology: [
                'HTML',
                'CSS'
            ],
            completed: true 
        },
        {
            subject: 'CSE',
            number: 111,
            title: 'Programming with Functions',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
            technology: [
                'Python'
            ],
            completed: true 
        },
        {
            subject: 'CSE',
            number: 210,
            title: 'Programming with Classes',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
            technology: [
                'C#'
            ],
            completed: true 
        },
        {
            subject: 'WDD',
            number: 131,
            title: 'Dynamic Web Fundamentals',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
            technology: [
                'HTML',
                'CSS',
                'JavaScript'
            ],
            completed: true 
        },
        {
            subject: 'WDD',
            number: 231,
            title: 'Frontend Web Development I',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
            technology: [
                'HTML',
                'CSS',
                'JavaScript'
            ],
            completed: false 
        }
    ];

    const coursesContainer = document.getElementById('courses-container');
    const totalCreditsSpan = document.getElementById('total-credits');
    const filterButtons = document.querySelectorAll('.filter-button');

    // Function to display courses and update total credits
    function displayCourses(filteredCourses) {
        coursesContainer.innerHTML = ''; // Clear existing course cards
        let currentCredits = 0;

        if (filteredCourses.length === 0) {
            coursesContainer.innerHTML = '<p>No courses found for this filter.</p>';
            if (totalCreditsSpan) {
                totalCreditsSpan.textContent = '0'; // Reset credits if no courses
            }
            return; // Exit the function if no courses to display
        }

        filteredCourses.forEach(course => {
            const courseCard = document.createElement('div');
            courseCard.classList.add('course-card');

            // Add 'completed' class if the course is completed
            if (course.completed) {
                courseCard.classList.add('completed');
            }

            // Populate the card with course data
            courseCard.innerHTML = `
                <h3>${course.subject} ${course.number}: ${course.title}</h3>
                <p><strong>Credits:</strong> ${course.credits}</p>
                <p>${course.description}</p>
                <p><strong>Technologies:</strong> ${course.technology.join(', ')}</p>
                <p class="completion-status">${course.completed ? '<em>Status: Completed</em>' : '<em>Status: In Progress</em>'}</p>
            `;
            coursesContainer.appendChild(courseCard);

            // Add credits to the running total for displayed courses
            currentCredits += course.credits;
        });

        // Update total credits shown on the page
        if (totalCreditsSpan) {
            totalCreditsSpan.textContent = currentCredits;
        }
    }

    // Initial load: Display all courses
    displayCourses(courses);

    // Add event listeners to filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const filterType = event.target.id; // Get the ID of the clicked button (e.g., 'filter-all')
            let filteredCourses = [];

            // Remove 'active-filter' class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active-filter'));
            // Add 'active-filter' class to the currently clicked button
            event.target.classList.add('active-filter');

            // Apply the appropriate filter
            switch (filterType) {
                case 'filter-all':
                    filteredCourses = courses; // Show all courses
                    break;
                case 'filter-wdd':
                    filteredCourses = courses.filter(course => course.subject === 'WDD');
                    break;
                case 'filter-cse':
                    filteredCourses = courses.filter(course => course.subject === 'CSE');
                    break;
                default:
                    filteredCourses = courses; // Default to showing all courses
            }
            // Re-display courses based on the filter
            displayCourses(filteredCourses);
        });
    });
});