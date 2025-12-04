    document.addEventListener('DOMContentLoaded', () => {

    const quoteElement = document.getElementById('api-quote');

    // verifica se a API_KEY existe, se a variável não foi definida
    if (typeof API_KEY === 'undefined' ||  API_KEY === "") {
        quoteElement.innerHTML = '<em>Configure a API_KEY para ver frases.</em>';
        return;
    }


    const url = 'https://api.api-ninjas.com/v1/quotes';

    fetch(url, {
        method: 'GET',
        headers: { 'X-Api-Key': API_KEY }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na resposta da API');
            }
            return response.json();
        })
        .then(data => {
            // Pega a primeira frase da lista
            const citacao = data[0].quote;
            const autor = data[0].author;

            // Atualiza o HTML
            quoteElement.innerHTML = `"${citacao}" <br><small>- ${autor}</small>`;
        })
        .catch(error => {
            console.error('Erro:', error);
            quoteElement.innerText = 'Não foi possível carregar a curiosidade.';
        });
});