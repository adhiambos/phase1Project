// Wait for the DOM to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', function () {
   // Function to fetch books from OpenLibrary based on a query
   function fetchBooks(query, type) {
      // Construct the URL for the fetch request
      const url = `https://openlibrary.org/search.json?q=${query}`;

      // Fetch the data from the URL
      fetch(url)
         .then(response => response.json()) 
         .then(data => {
            // Display the fetched books
            displayResults(data.docs);
         })
         .catch(error => {
            console.log("not found");
         
            console.error('Error fetching data:', error);
            document.getElementById('results-container').innerHTML = '<p>Error fetching data. Please try again.</p>';
         });
   }

   

   // Function to display the fetched books in the results container
   function displayResults(books) {
      const resultsContainer = document.getElementById('results-container');
      resultsContainer.innerHTML = ''; 
      const fragment = document.createDocumentFragment(); // Create a document fragment for efficient DOM manipulation
      books.forEach(book => {
         const bookElement = document.createElement('div'); 
         bookElement.innerHTML = `
                <h2>${book.title}</h2>
                <p>Author: ${book.author_name}</p>
                <p>First published: ${book.first_publish_year}</p>
            `;
         fragment.appendChild(bookElement); // Append the book div to the fragment
      });
      resultsContainer.appendChild(fragment); // Append the fragment to the results container
   }

   // Array of form IDs to attach event listeners to
   const formIds = ['titleSearch', 'authorSearch', 'editionsSearch'];
   formIds.forEach(formId => {
      // Attach a submit event listener to each form
      document.getElementById(formId).addEventListener('submit', function (event) {
         event.preventDefault(); // Prevent the default form submission
         // Get the query from the corresponding input field
         const query = document.getElementById(`search-${formId.replace('Search', '')}`).value;
         // Fetch books based on the query
         fetchBooks(query, formId.replace('Search', ''));
      });
   });

   // Function to focus on the next or previous form element based on the direction
   function focusElement(currentElement, direction) {
      const formElements = Array.from(document.querySelectorAll('input[type="text"], button')); // Get all form elements
      const currentIndex = formElements.indexOf(currentElement); // Find the current element's index
      const nextIndex = (currentIndex + direction + formElements.length) % formElements.length; // Calculate the next index
      formElements[nextIndex].focus(); // Focus on the next element
   }

   // Attach a keydown event listener to the document to handle arrow key navigation
   document.addEventListener('keydown', function (event) {
      const currentElement = document.activeElement; // Get the currently focused element
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

   // Attach mouseover and mouseout event listeners to the book quote image to scale it
   const bookQuoteImage = document.querySelector('.book-quote img');
   bookQuoteImage.addEventListener('mouseover', () => bookQuoteImage.style.transform = 'scale(1.1)'); // Scale up on mouseover
   bookQuoteImage.addEventListener('mouseout', () => bookQuoteImage.style.transform = 'scale(1)'); // Scale down on mouseout
});

// Attach a click event listener to the refresh button to reload the page
const refreshBtn = document.getElementById("btnRefresh");
refreshBtn.addEventListener("click", () => window.location.reload());
