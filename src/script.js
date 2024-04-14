document.addEventListener('DOMContentLoaded', function() {
    function fetchBooks(query, type) {
        const url = `https://openlibrary.org/search.json?q=${query}`;

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

    // Function to focus the previous form element
    function focusPreviousElement(currentElement) {
        const formElements = Array.from(document.querySelectorAll('input[type="text"], button'));
        const currentIndex = formElements.indexOf(currentElement);
        const previousIndex = currentIndex - 1 >= 0 ? currentIndex - 1 : formElements.length - 1;
        formElements[previousIndex].focus();
    }

    // Add keydown event listener to the document
    document.addEventListener('keydown', function(event) {
        const currentElement = document.activeElement;
        if (currentElement.tagName === 'INPUT' || currentElement.tagName === 'BUTTON') {
            switch (event.key) {
                case 'ArrowUp':
                    focusPreviousElement(currentElement);
                    break;
                case 'ArrowDown':
                    focusNextElement(currentElement);
                    break;
            }
        }
    });

    // Select the image within the 'book-quote' class
    const bookQuoteImage = document.querySelector('.book-quote img');

    // Function to increase the image size
    function increaseImageSize() {
        bookQuoteImage.style.transform = 'scale(1.1)'; // Increase the size by 10%
    }

    // Function to decrease the image size
    function decreaseImageSize() {
        bookQuoteImage.style.transform = 'scale(1)'; // Return to original size
    }

    // Add mouseover and mouseout event listeners to the image
    bookQuoteImage.addEventListener('mouseover', increaseImageSize);
    bookQuoteImage.addEventListener('mouseout', decreaseImageSize);
});
