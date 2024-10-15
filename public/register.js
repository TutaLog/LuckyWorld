document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impedisce l'invio del form

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Invia la richiesta di registrazione al server
    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, password: password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('successMessage').style.display = 'block';
            document.getElementById('errorMessage').style.display = 'none';
        } else {
            document.getElementById('errorMessage').textContent = data.message;
            document.getElementById('errorMessage').style.display = 'block';
        }
    })
    .catch(error => {
        console.error('Errore:', error);
    });
});
