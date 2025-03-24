const API_KEY = '9d8cd71dff1949a5b6eb35a0f999776a';  // Replace with your actual API key

window.onload = function() {
    const searchButton = document.getElementById('search-btn');
    const ingredientInput = document.getElementById('ingredient-input');
    const resultsDiv = document.getElementById('results');

    // Check if resultsDiv is actually found
    if (!resultsDiv) {
        console.error("Results div not found!");
        return;  // Exit if the div doesn't exist
    }

    // Event listener for search button
    searchButton.addEventListener('click', function() {
        const ingredients = ingredientInput.value.trim();
        console.log('Ingredients entered:', ingredients);  // Log ingredients
        if (ingredients) {
            fetchRecipes(ingredients);
        } else {
            alert('Please enter ingredients!');
        }
    });

    // Function to fetch recipes from the Spoonacular API
    function fetchRecipes(ingredients) {
        const encodedIngredients = encodeURIComponent(ingredients);  // Encode ingredients
        const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodedIngredients}&number=5&apiKey=${API_KEY}`;
        console.log('Fetching recipes from URL:', url);  // Log the full API URL

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('API Response:', data);  // Log the API response for debugging
                displayRecipes(data);
            })
            .catch(error => {
                console.error('Error fetching recipes:', error);
                alert('Sorry, something went wrong while fetching recipes.');
            });
    }

    // Function to display the fetched recipes
    function displayRecipes(recipes) {
        resultsDiv.innerHTML = '';  // Clear any previous results

        if (recipes.length === 0) {
            resultsDiv.innerHTML = '<p>No recipes found. Try different ingredients.</p>';
            return;
        }

        recipes.forEach(recipe => {
            const recipeCard = document.createElement('div');
            recipeCard.classList.add('recipe-card');
            
            const recipeTitle = document.createElement('h3');
            recipeTitle.textContent = recipe.title;
            
            const recipeImage = document.createElement('img');
            recipeImage.src = recipe.image;
            recipeImage.alt = recipe.title;
            recipeImage.style.width = '100%';
            recipeImage.style.height = 'auto';
            
            const recipeLink = document.createElement('a');
            recipeLink.href = `https://spoonacular.com/recipes/${recipe.title.replace(/\s+/g, '-').toLowerCase()}-${recipe.id}`;
            recipeLink.textContent = 'View Recipe';
            recipeLink.target = '_blank';

            recipeCard.appendChild(recipeImage);
            recipeCard.appendChild(recipeTitle);
            recipeCard.appendChild(recipeLink);

            resultsDiv.appendChild(recipeCard);
        });
    }
};
