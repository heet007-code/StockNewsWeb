document.addEventListener('DOMContentLoaded', function() {
    // Fetching and displaying stock news
    const newsContainer = document.getElementById('newsContainer');
    if (newsContainer) {
        fetch('/getStockNews')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.articles && data.articles.length > 0) {
                data.articles.forEach(article => {
                    const articleElement = document.createElement('div');
                    articleElement.innerHTML = `
                        <h2><a href="${article.url}" target="_blank">${article.title}</a></h2>
                        <p>${article.description}</p>
                    `;
                    newsContainer.appendChild(articleElement);
                });
            } else {
                newsContainer.innerHTML = '<p>No news found.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching news:', error);
            newsContainer.innerHTML = '<p>Error loading news.</p>';
        });
    }

    // Fetching and displaying GPT suggestions
    const topPicksContainer = document.getElementById('todaysTopPicks');
    if (topPicksContainer) {
        fetch('/getGptSuggestions')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(suggestions => {
            const list = document.createElement('ul');
            suggestions.forEach(suggestion => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `<strong>${suggestion.ticker}</strong>: ${suggestion.advice}`;
                list.appendChild(listItem);
            });
            topPicksContainer.appendChild(list);
        })
        .catch(error => {
            console.error('Error fetching GPT suggestions:', error);
            topPicksContainer.innerHTML = '<p>Error loading suggestions.</p>';
        });
    }
});
