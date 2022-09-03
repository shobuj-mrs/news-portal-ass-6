
const loadNewsCatagories = async() =>{
    const url = https://openapi.programming-hero.com/api/news/categories;
    const res = await fetch(url);
    const data = await res.json();
    disNewsCatagories(data.data.news_category);
}
const disNewsCatagories = (catagories) =>{
    const newsCatagoriesContainer = document.getElementById('news-catagories-container');
    newsCatagoriesContainer.innerHTML = '';
    catagories.forEach(catagory => {
        //console.log(catagory);

        const newsCatagoryDiv = document.createElement('div');
        newsCatagoryDiv.classList.add('newsCatagoyName');
        newsCatagoryDiv.innerHTML = `
            <div>
                <a href="#" onclick="loadNewsCards('${catagory.category_id}')" class="text-center mx-9 font-semibold">${catagory.category_name}</a>
            <div>
        `
        newsCatagoriesContainer.appendChild(newsCatagoryDiv);
    });
    

}
const loadNewsCards = async(category_id) =>{
    const url = https://openapi.programming-hero.com/api/news/category/${category_id};
    const res = await fetch(url);
    const data = await res.json();
    displayNewsCards(data.data);
}
const displayNewsCards = (cards) =>{
    const newsCardContainer = document.getElementById('news-cards-container');
    newsCardContainer.innerHTML = '';
    cards.forEach(card => {
        //console.log(card);
        const newsCardDiv = document.createElement('div');
        newsCardDiv.classList.add('newsCard');
        newsCardDiv.innerHTML = `
            <div onclick="loadCardNewsDetails('${card._id}')" class="flex border border-2 drop-shadow-xl rounded-md ">
                <div class="w-2/5 p-5">
                    <img src=${card.image_url} alt="">
                </div>
                <div class="p-5 w-3/5">
                    <h1 class="text-xl font-bold">${card.title ? card.title : 'No Title Found'}.</h1>
                    <p class="my-4 mr-10 overflow-hidden">
                        ${card.details.length > 150 ? card.details.slice(0,300) +'...' : 'No details Found'}
                    </p>
                    <div class="flex items-end">
                        <div class="grid items-center grid-cols-2">
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

                            <img src="images/carbon_view.png" alt="">
                            <div>
                                <p class="ml-5 font-bold">${card.total_view ? card.total_view : 'No view Data found'}</p>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        `
        newsCardContainer.appendChild(newsCardDiv);
    });
}
const loadCardNewsDetails = async(news_id) =>{
    const url = https://openapi.programming-hero.com/api/news/${news_id};
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.data[0]);

}
const displayModalDetails = 


loadNewsCatagories();
