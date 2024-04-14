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