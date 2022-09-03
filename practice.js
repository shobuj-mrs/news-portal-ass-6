const loadNavbar = () => {
    const navbarContainer = document.getElementById('navbar-default');
    navbarContainer.classList.toggle('hidden');
}

const loadNewsCatagories = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    disNewsCatagories(data.data.news_category);
}
const disNewsCatagories = (catagories) => {
    const newsCatagoriesContainer = document.getElementById('news-catagories-container');
    newsCatagoriesContainer.innerHTML = '';
    catagories.forEach(catagory => {
        //console.log(catagory);

        const newsCatagoryDiv = document.createElement('div');
        newsCatagoryDiv.classList.add('newsCatagoyName');
        newsCatagoryDiv.innerHTML = `
            <div>
                <a href="#" onclick="loadNewsCards('${catagory.category_id}'), loadCatagoryName('${catagory.category_name}')" class="text-center mx-5 font-semibold">${catagory.category_name}</a>
            <div>
        `
        newsCatagoriesContainer.appendChild(newsCatagoryDiv);
    });


}
const loadCatagoryName = (catagoryName) => {
    const foundResultContainerCatagoryName = document.getElementById('found-result-container-catagory-name');
    foundResultContainerCatagoryName.innerHTML = `<h1> ${catagoryName}</h1>`
    console.log(catagoryName);
}

// loading spinner 
const toggleLoader = isLoading => {
    const loaderSection = document.getElementById('loading');
    if (isLoading) {
        loaderSection.classList.remove('hidden')
    }
    else {
        loaderSection.classList.add('hidden')
    }
}

const loadNewsCards = async (category_id) => {
    toggleLoader(true);
    const url = `https://openapi.programming-hero.com/api/news/category/${category_id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayNewsCards(data.data);

}
const displayNewsCards = (cards) => {
    const newsCardContainer = document.getElementById('news-cards-container');
    newsCardContainer.innerHTML = '';
    //console.log(cards);
    const foundResultContainer = document.getElementById('foundresultcontainer');
    foundResultContainer.innerHTML = `<h1>${cards.length} items found for category </h1>`
    cards.forEach(card => {
        const newsCardDiv = document.createElement('div');
        newsCardDiv.classList.add('newsCard');
        newsCardDiv.innerHTML = `
            <div onclick="loadCardNewsDetails('${card._id}')" class="flex border border-2 drop-shadow-xl rounded-md flex-col lg:flex-row ">
                <div class="w-full lg:w-1/5 p-5 flex justify-center">
                    <img src=${card.thumbnail_url} alt="">
                </div>
                <div class="px-3 lg:px-5 py-3 lg:py-12 w-full lg:w-4/5">
                    <h1 class="text-xl font-bold">${card.title ? card.title : 'No Title Found'}.</h1>
                    <p class="my-4 lg:mr-10 overflow-hidden">
                        ${card.details.length > 150 ? card.details.slice(0, 300) + '...' : 'No details Found'}
                    </p>
                    <div>
                        <div class="grid grid-cols-2 ">
                            <div class="flex items-center">
                                <div>
                                    <img class="w-10 h-10 rounded-full mr-4" src=${card.author.img} alt="Image Not Found">
                                </div>
                                <div>
                                    <p class=" font-bold">
                                        ${card.author.name ? card.author.name : 'Author Name not Found!'}
                                        
                                    </p>
                                </div>
                            </div>

                            <div class="flex items-center justify-end">
                                <img class="w-6 h-6" src="images/carbon_view.png" alt="">
                                <div>
                                    <p class="ml-5 font-bold mr-14">${card.total_view ? card.total_view : 'No views'}</p>
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
        newsCardContainer.appendChild(newsCardDiv);
    });
    toggleLoader(false);

}

// news id data 
const loadCardNewsDetails = async (news_id) => {
    const url = `https://openapi.programming-hero.com/api/news/${news_id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayModalDetails(data.data[0]);

}

const displayModalDetails = (modalNews) => {
    const newsModalContainer = document.getElementById('modal-container');
    newsModalContainer.innerHTML = '';

    //console.log(modalNews);

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
                                <h3 class="text-lg font-medium leading-6 text-gray-900 py-1" id="modal-title">${modalNews.title ? modalNews.title : 'No Title Found'}</h3>
                                <div class="mt-2">
                                <p class="text-sm text-gray-500">${modalNews.details ? modalNews.details : 'No details Found'}</p>
                                </div>
                                <div class="grid grid-cols-2 pt-6">
                                    <div class="flex items-center">
                                        <div>
                                            <img class="w-10 h-10 rounded-full mr-4" src=${modalNews.author.img} alt="Image Not Found">
                                        </div>
                                        <div>
                                            <p class="font-bold flex flex-col">
                                                <div class="font-bold">
                                                    ${modalNews.author.name ? modalNews.author.name : 'Author Name not Found!'}        
                                                </div>
                                                <div class="font-bold">
                                                    ${modalNews.author.published_date ? modalNews.author.published_date : 'Date not Found!'}
                                                </div>
                                                    
                                            </p>
                                        </div>
                                    </div>

                                    <div class="flex items-center justify-end">
                                        <img class="w-6 h-6" src="images/carbon_view.png" alt="">
                                        <div>
                                            <p class="ml-5 font-bold">${modalNews.total_view ? modalNews.total_view : 'No views'}</p>
                                        </div> 
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button onclick="closeModal()" type="button" class="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm">Close</button>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            <div>
        `
    newsModalContainer.appendChild(newsModalDiv);



}
const closeModal = () => {
    const defaltModal = document.getElementById('modalContainer')
    defaltModal.classList.add('hidden');
}
// const openModal = 
// document.toggleLoader('defaultModalT').addEventListener('click', function(){
//     const defaltModal = document.getElementById('defaultModal')
//     defaltModal.classList.remove('hidden');
// })

loadNewsCatagories();