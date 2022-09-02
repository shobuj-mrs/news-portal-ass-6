

const loadTheCatagories = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    displayTheCategories(data.data.news_category);
}

const displayTheCategories = (categories) => {
    console.log(categories);
    const categoriesContainer = document.getElementById('categories-container')
    categories.forEach(category => {
        console.log(category);

        const newCategoriesDiv = document.createElement('div');
        newCategoriesDiv.classList.add('news-category-name');
        newCategoriesDiv.innerHTML = `
        <p onclick="displayNewsCard('${category.category_id}')" class="mx-7 hover:bg-indigo-100 hover:text-indigo-600 px-2 rounded font-medium">${category.category_name}</p>
        
        `;
        categoriesContainer.appendChild(newCategoriesDiv);
    });
}

const displayNewsCard = async () => {

}


loadTheCatagories();