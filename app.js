document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
  
    loginForm.addEventListener('submit', handleLogin);
    signupForm.addEventListener('submit', handleSignup);
  });
  
  function handleLogin(event) {
    event.preventDefault();
    const loginUsername = document.getElementById('login-username').value;
    const loginPassword = document.getElementById('login-password').value;
  
    // Assuming the data is stored in a JSON file named "users.json"
    fetch('users.json')
      .then((response) => response.json())
      .then((data) => {
        const user = data.find(
          (user) =>
            user.username === loginUsername && user.password === loginPassword
        );
  
        if (user) {
          alert('Login successful!');
        } else {
          alert('Invalid username or password. Please try again.');
        }
      })
      .catch((error) => console.error('Error loading users:', error));
  
    // Clear input fields after submission
    document.getElementById('login-username').value = '';
    document.getElementById('login-password').value = '';
  }
  
  function handleSignup(event) {
    event.preventDefault();
    const signupUsername = document.getElementById('signup-username').value;
    const signupPassword = document.getElementById('signup-password').value;
  
    // Assuming the data is stored in a JSON file named "users.json"
    fetch('users.json')
      .then((response) => response.json())
      .then((data) => {
        // Check if the username already exists
        const userExists = data.some((user) => user.username === signupUsername);
  
        if (userExists) {
          alert('Username already exists. Please choose a different one.');
        } else {
          // Add the new user to the data array
          data.push({
            username: signupUsername,
            password: signupPassword,
          });
  
          // Update the JSON file with the new user data
          fetch('users.json', {
            method: 'PUT', // Use 'POST' if 'PUT' is not supported by your server
            body: JSON.stringify(data),
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then((response) => response.json())
            .then(() => {
              alert('Sign up successful! You can now log in.');
            })
            .catch((error) => console.error('Error updating users:', error));
        }
      })
      .catch((error) => console.error('Error loading users:', error));
  
    // Clear input fields after submission
    document.getElementById('signup-username').value = '';
    document.getElementById('signup-password').value = '';
  }
  