// navber toggle by default
const loadNavbarDefault = () => {
    const navbarPart = document.getElementById('navbar-default');
    navbarPart.classList.toggle('hidden');
}

// load the categories name with API
const loadDataCatagories = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    displayDataCategories(data.data.news_category);
}

const displayDataCategories = (categories) => {
    // console.log(categories);

    const categoriesContainer = document.getElementById('categories-container')
    categories.forEach(category => {
        // console.log(category);

        const newCategoriesDiv = document.createElement('div');
        newCategoriesDiv.classList.add('news-category-name');
        newCategoriesDiv.innerHTML = `
        <p onclick="loadNewsCard('${category.category_id}')" class="mx-6 hover:bg-indigo-100 hover:text-indigo-600 px-2 rounded font-medium">${category.category_name}</p>
        `;
        categoriesContainer.appendChild(newCategoriesDiv);
    });
}
// load data news category name
const loadCatagoryName = (catagoryName) => {
    const foundResultNewsCatagoryName = document.getElementById('found-result-news-catagory-name');
    foundResultNewsCatagoryName.innerHTML = `<h1> ${catagoryName}</h1>`
    console.log(catagoryName);
}

// loading the  spinner  part
const toggleLoader = isLoading => {
    const loaderSection = document.getElementById('loading');
    if (isLoading) {
        loaderSection.classList.remove('hidden')
    }
    else {
        loaderSection.classList.add('hidden')
    }
}


// load the news categories id section 
const loadNewsCard = async (category_id) => {
    toggleLoader(true);

    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    const res = await fetch(url);
    const data = await res.json();
    loadDisplayNews(data.data);
}

// load the news card section
const loadDisplayNews = (cards) => {
    const newsCardContainer = document.getElementById('news-card-container');
    newsCardContainer.innerHTML = '';

    const resultFound = document.getElementById('found-result-container');
    resultFound.innerHTML = `
    <div class="container mx-auto">
    <div class="bg-white p-2 my-2 ">
       <h1 class="text-3xl text-indigo-500">${cards.length} News items found for this category!!! </h1>
    </div>
    <div class="flex items-center justify-between my-8">
    <div>
        <span class="font-normal">Sort<span class="font-semibold"> By View : </span></span>
      <button class=" bg-white font-normal px-2 py-1 rounded text-[#ABADC6] ">Default <i class="fa-solid fa-chevron-down ml-4"></i></button>
    </div>


    <div>

    <button class="bg-[#5D5FEF] px-2 py-1 text-white rounded text-normal ">Today's Pick</button>
    <button class="border border-[#5D5FEF] rounded px-2 py-1 text-[#5D5FEF] text-normal">Trend</button>

    </div>
    </div>
    </div>
    `;

    cards.forEach(card => {
        // console.log(card);

        const newCardDiv = document.createElement('div');
        newCardDiv.classList.add('newsCard');
        newCardDiv.innerHTML = `
        <div class="flex border border-2 drop-shadow-xl rounded-md flex-col lg:flex-row ">
            <div class="w-2/5 p-5">
            <img src=${card.image_url} alt="">
            </div>
            <div class="p-5 w-3/5">
                <h1 class="text-2xl font-bold">${card.title ? card.title : 'Title is Not Found Here'}.</h1>
                <p class="my-4 font-italic hover:font-not-italic mr-10 overflow-hidden">
                    ${card.details.length > 100 ? card.details.slice(0, 400) + '...' : 'Details is Not Found Here'}
                </p>
                <div class="flex items-end">
                    <div class="grid items-center grid-cols-4">
                       <div>
                            <div class="flex items-center">
                                <div>
                                    <img class="w-10 h-10 rounded-full mr-4" src=${card.author.img} alt="Image is Not Found Here">
                                </div>
                            <div>
                                <p class=" font-semibold text-indigo-500">
                                    ${card.author.name ? card.author.name : 'Author Name  is not Found!'}
                                </p>
                               
                       </div>
                   </div>
                       </div>

                        <img src="images/carbon_view.png" alt="">
                        <div class="flex">
                            <span><i class="fa-solid fa-eye"></i></span>
                            <p class="ml-5 font-bold">${card.total_view ? card.total_view : 'View Data is Not Found'}</p>
                        </div> 
                        <div>
                        <span onclick="loadCardNewsDetails('${card._id}')"  class="mx-20 text-blue-500 hover:bg-indigo-100 px-3 rounded"><i class="fa-solid fa-arrow-right"></i></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        `;
        newsCardContainer.appendChild(newCardDiv);
    })

    toggleLoader(false);
}

//load the news id data dynamically
const loadCardNewsDetails = async (news_id) => {
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayModalDetails(data.data[0]);
}

// display the news modal details 

const displayModalDetails = (modalNews) => {
    const newsModalContainer = document.getElementById('modal-container');
    newsModalContainer.innerHTML = '';

    // console.log(modalNews);

    const newsModalDiv = document.createElement('div');
    newsModalDiv.classList.add('modalnews');
    newsModalDiv.innerHTML = `
            <div>
                <div id="modalContainer" class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                
                    <div class="fixed inset-0 z-10 overflow-y-auto">
                    <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div class="sm:flex sm:items-start">
                            
                            <div class="mt-3 text-center sm:mt-0 sm:text-left">
                                <img src=${modalNews.image_url} alt="">
                                <h3 class="text-lg font-medium leading-6 text-gray-900 py-1" id="modal-title">${modalNews.title ? modalNews.title : 'Title is Not Found here'}</h3>
                                <div class="mt-2">
                                <p class="text-sm text-gray-500">${modalNews.details ? modalNews.details : 'News details is not Found here'}</p>
                                </div>
                                <div class="grid grid-cols-2 pt-6">
                                    <div class="flex items-center">
                                        <div>
                                            <img class="w-10 h-10 rounded-full mr-4" src=${modalNews.author.img} alt=" Image is  Not Found here">
                                        </div>
                                        <div>
                                            <p class="font-bold flex flex-col">
                                                <div class="font-bold">
                                                    ${modalNews.author.name ? modalNews.author.name : 'Author Name is not Found here!'}        
                                                </div>
                                                <div class="font-bold">
                                                    ${modalNews.author.published_date ? modalNews.author.published_date : 'Date is not Found!'}
                                                </div>
                                                    
                                            </p>
                                        </div>
                                    </div>

                                    <div class="flex items-center justify-end">
                                    <span><i class="fa-solid fa-eye"></i></span>
                                        <div>
                                            <p class="ml-5 font-bold">${modalNews.total_view ? modalNews.total_view : 'View Data is Not Found'}</p>
                                        </div> 
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button onclick="closeModal()" type="button" class="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"><i class="fa-solid fa-xmark"></i></button>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            <div>
        `;
    newsModalContainer.appendChild(newsModalDiv);
}

// modal close section 
const closeModal = () => {
    const defaltModal = document.getElementById('modalContainer')
    defaltModal.classList.add('hidden');
}


loadDataCatagories();