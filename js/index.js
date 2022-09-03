
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
    const data = await res.json();
    displayNewsCard(data.data);
}

const displayNewsCard = (cards) => {
    const newsCardContainer = document.getElementById('news-card-comtainer');
    newsCardContainer.innerHTML = '';

    cards.forEach(card => {
        console.log(card);
        const newCardDiv = document.createElement('div');
        newCardDiv.classList.add('newsCard');
        newCardDiv.innerHTML = `
        <div onclick="loadNewsDetails('${card._id}')" class="flex border border-2 drop-shadow-xl rounded-md ">
            <div class="w-2/5 p-5">
            <img src=${card.image_url} alt="">
            </div>
            <div class="p-5 w-3/5">
                <h1 class="text-xl font-bold">${card.title ? card.title : 'Title is Not Found Here'}.</h1>
                <p class="my-4 mr-10 overflow-hidden">
                    ${card.details.length > 150 ? card.details.slice(0, 300) + '...' : 'Details is Not Found Here'}
                </p>
                <div class="flex items-end">
                    <div class="grid items-center grid-cols-2">
                        <div class="flex items-center">
                            <div>
                                <img class="w-10 h-10 rounded-full mr-4" src=${card.author.img} alt="Image is Not Found Here">
                            </div>
                            <div>
                                <p class=" font-bold">
                                    ${card.author.name ? card.author.name : 'Author Name not Found!'}
                                </p>
                            </div>
                        </div>

                        <img src="images/carbon_view.png" alt="">
                        <div>
                            <p class="ml-5 font-bold">${card.total_view ? card.total_view : 'No view Data found'}</p>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
        
        `
        newsCardContainer.appendChild(newCardDiv);
    })
}
const loadNewsDetails = async (news_id) => {
    const url = `https:openapi.programming-hero.com/api/news/${news_id};`
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.data[0]);

}

loadTheCatagories();