document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impedisce il refresh della pagina

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Invia la richiesta di login al server
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, password: password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Reindirizza alla pagina principale se il login ha successo
            window.location.href = 'index.html';
        } else {
            // Mostra un errore se il login fallisce
            document.getElementById('errorMessage').style.display = 'block';
        }
    })
    .catch(error => {
        console.error('Errore:', error);
    });
});
