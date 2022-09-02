
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
        // console.log(category);

        const newCategoriesDiv = document.createElement('div');
        newCategoriesDiv.classList.add('news-category-name');
        newCategoriesDiv.innerHTML = `
        <p onclick="loadNewsCard('${category.category_id}')" class="mx-7 hover:bg-indigo-100 hover:text-indigo-600 px-2 rounded font-medium">${category.category_name}</p>
        
        `;
        categoriesContainer.appendChild(newCategoriesDiv);
    });
}

const loadNewsCard = async (category_id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    const res = await fetch(url);
    const data = res.json();
    console.log(data);
}

const displayNewsCard = (cards) => {
    cards.forEach(card => {
        console.log(card);
    })
}

loadTheCatagories();