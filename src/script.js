document.addEventListener('DOMContentLoaded', function () {
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
      const fragment = document.createDocumentFragment();
      books.forEach(book => {
         const bookElement = document.createElement('div');
         bookElement.innerHTML = `
                <h2>${book.title}</h2>
                <p>Author: ${book.author_name}</p>
                <p>First published: ${book.first_publish_year}</p>
            `;
         fragment.appendChild(bookElement);
      });
      resultsContainer.appendChild(fragment);
   }

   const formIds = ['titleSearch', 'authorSearch', 'editionsSearch'];
   formIds.forEach(formId => {
      document.getElementById(formId).addEventListener('submit', function (event) {
         event.preventDefault();
         const query = document.getElementById(`search-${formId.replace('Search', '')}`).value;
         fetchBooks(query, formId.replace('Search', ''));
      });
   });

   function focusElement(currentElement, direction) {
      const formElements = Array.from(document.querySelectorAll('input[type="text"], button'));
      const currentIndex = formElements.indexOf(currentElement);
      const nextIndex = (currentIndex + direction + formElements.length) % formElements.length;
      formElements[nextIndex].focus();
   }

   document.addEventListener('keydown', function (event) {
      const currentElement = document.activeElement;
      if (currentElement.tagName === 'INPUT' || currentElement.tagName === 'BUTTON') {
         switch (event.key) {
            case 'ArrowUp':
               focusElement(currentElement, -1);
               break;
            case 'ArrowDown':
               focusElement(currentElement, 1);
               break;
         }
      }
   });

   const bookQuoteImage = document.querySelector('.book-quote img');
   bookQuoteImage.addEventListener('mouseover', () => bookQuoteImage.style.transform = 'scale(1.1)');
   bookQuoteImage.addEventListener('mouseout', () => bookQuoteImage.style.transform = 'scale(1)');
});

const refreshBtn = document.getElementById("btnRefresh");
refreshBtn.addEventListener("click", () => window.location.reload());