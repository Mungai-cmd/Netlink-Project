
document.addEventListener('DOMContentLoaded', function () {
    // Count-up Functionality
    let valueDisplays = document.querySelectorAll(".num");
    let interval = 4000;

    valueDisplays.forEach(display => {
        let startValue = 0;
        let endValue = parseInt(display.getAttribute("data-val"));
        let duration = Math.floor(interval / endValue);
        let counter = setInterval(function () {
            startValue += 1;
            display.textContent = startValue;
            if (startValue === endValue) {
                clearInterval(counter);
            }
        }, duration);
    });


    // Validate Passwords
    function validatePasswords() {
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirm-password');
        const messageElement = document.getElementById('message');

        if (password.value && confirmPassword.value) {
            if (password.value === confirmPassword.value) {
                messageElement.textContent = 'Passwords match!';
                messageElement.className = 'message success';
            } else {
                messageElement.textContent = 'Passwords do not match!';
                messageElement.className = 'message error';
            }
            messageElement.style.display = 'block';
        } else {
            messageElement.style.display = 'none';
        }
    }

    // Event Listeners for Form Fields
    const passwordField = document.getElementById('password');
    const confirmPasswordField = document.getElementById('confirm-password');
    if (passwordField && confirmPasswordField) {
        passwordField.addEventListener('input', validatePasswords);
        confirmPasswordField.addEventListener('input', validatePasswords);
    }


    // Login Form Validation
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function (event) {
            const email = document.getElementById('email');
            const password = document.getElementById('password');
            let valid = true;

            if (!email.value) {
                email.classList.add('error');
                valid = false;
            } else {
                email.classList.remove('error');
            }

            if (!password.value) {
                password.classList.add('error');
                valid = false;
            } else {
                password.classList.remove('error');
            }

            if (!valid) {
                event.preventDefault(); // Prevent form submission if validation fails
            }
        });
    }

    // Show and hide password toggle

    function togglePassword(){
        const password = document.getElementById("password");
        const confirmPassword = document.getElementById("confirm-password");
        const showPassword = document.getElementById("show-password");

        if(password.value && confirmPassword.value !== 0){
            password.type = 'text';
            confirmPassword.type = 'text';
            showPassword.style.display = "inline"
        }
    }

    // Product List Toggle
    const toggleButton = document.getElementById('products-toggle');
    const nestedList = document.getElementById('nested-list');
    const arrowIcon = document.getElementById('arrow-icon');

    if (toggleButton) {
        toggleButton.addEventListener('click', function (event) {
            event.preventDefault();
            if (nestedList.style.display === 'block') {
                nestedList.style.display = 'none';
                arrowIcon.classList.remove('fa-chevron-up');
                arrowIcon.classList.add('fa-chevron-down');
            } else {
                nestedList.style.display = 'block';
                arrowIcon.classList.remove('fa-chevron-down');
                arrowIcon.classList.add('fa-chevron-up');
            }
        });
    }

    // Testimonials Slide Show
    let counterSlide = 1;
    setInterval(function () {
        document.getElementById('radio' + counterSlide).checked = true;
        counterSlide++;
        if (counterSlide > 5) {
            counterSlide = 1;
        }
    }, 5000);

    // Profile Picture Dropdown
    const profileButton = document.getElementById('profile-button');
    const dropdownMenu = document.getElementById('dropdown-menu');

    if (profileButton) {
        profileButton.addEventListener('click', function () {
            dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
        });

        document.addEventListener('click', function (event) {
            if (!profileButton.contains(event.target) && !dropdownMenu.contains(event.target)) {
                dropdownMenu.style.display = 'none';
            }
        });
    }
});


document.addEventListener('DOMContentLoaded', function () {

    // Registration Form Submission
    document.getElementById('registration-form').addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);

        try {
            const response = await fetch('http://localhost:5500/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            if (response.ok) {
                alert('Registration successful');
                // Redirect or handle successful registration
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    });

    // Login Form Submission
    document.getElementById('login-form').addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);

        try {
            const response = await fetch('http://localhost:5500/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            if (response.ok) {
                localStorage.setItem('token', result.token);
                alert('Login successful');
                // Redirect or handle successful login
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    });
});




// ======================|| FAQs || ================================================================
document.addEventListener('DOMContentLoaded', () => {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionButton = item.querySelector('.faq-question');
        const answerDiv = item.querySelector('.faq-answer');
        const arrow = item.querySelector('.arrow');

        questionButton.addEventListener('click', () => {
            const isOpen = answerDiv.style.display === 'block';
            // Close all answers and reset arrows
            document.querySelectorAll('.faq-answer').forEach(answer => answer.style.display = 'none');
            document.querySelectorAll('.arrow').forEach(arrow => arrow.classList.remove('open'));

            // Toggle the clicked answer and arrow
            if (isOpen) {
                answerDiv.style.display = 'none';
                arrow.classList.remove('open');
            } else {
                answerDiv.style.display = 'block';
                arrow.classList.add('open');
            }
        });
    });
});



// ==================== || side navigational bar || ================================


document.addEventListener('DOMContentLoaded', (event) => {
    const showBtn = document.getElementById('sidebar-show-btn');
    const hideBtn = document.getElementById('sidebar-hide-btn');
    const sidebar = document.getElementById('sidebar');

    // Show the sidebar
    showBtn.addEventListener('click', () => {
        sidebar.classList.add('show'); // Add class to show sidebar
    });

    // Hide the sidebar
    hideBtn.addEventListener('click', () => {
        sidebar.classList.remove('show'); // Remove class to hide sidebar
    });
});
