

const loadNewsCatagories = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    disNewsCatagories(data.data.news_category);
}