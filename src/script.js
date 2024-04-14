document.addEventListener('DOMContentLoaded', function() {
    // Function to fetch data from Open Library Search API
    function fetchBooks(query, type) {
        const url = `https://openlibrary.org/search.json?${type}=${query}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                displayResults(data.docs);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                document.getElementById('results-container').innerHTML = '<p>Error fetching data. Please try again.</p>';
            });
    }

    / Function to display search results
    function displayResults(books) {
        const resultsContainer = document.getElementById('results-container');
        resultsContainer.innerHTML = '';
        books.forEach(book => {
            const bookElement = document.createElement('div');
            bookElement.innerHTML = `
                <h2>${book.title}</h2>
                <p>Author: ${book.author_name}</p>
                <p>First published: ${book.first_publish_year}</p>
            `;
            resultsContainer.appendChild(bookElement);
        });
    }

    // Event listeners for form submissions
    document.getElementById('titleSearch').addEventListener('submit', function(event) {
        event.preventDefault();
        const query = document.getElementById('search-title').value;
        fetchBooks(query, 'title');
    });

    document.getElementById('authorSearch').addEventListener('submit', function(event) {
        event.preventDefault();
        const query = document.getElementById('search-author').value;
        fetchBooks(query, 'author');
    });

    document.getElementById('editionsSearch').addEventListener('submit', function(event) {
        event.preventDefault();
        const query = document.getElementById('search-editions').value;
        fetchBooks(query, 'editions');
    });

    // Function to focus the next form element
    function focusNextElement(currentElement) {
        const formElements = Array.from(document.querySelectorAll('input[type="text"], button'));
        const currentIndex = formElements.indexOf(currentElement);
        const nextIndex = currentIndex + 1 < formElements.length ? currentIndex + 1 : 0;
        formElements[nextIndex].focus();
    }