let menuRevealed = document.querySelector(".menu-revealed");

function menuReveal() {
    menuRevealed.classList.toggle("menu-from-left");
    document.getElementById("burger-line-1").classList.toggle("transition-burger-line-1");
    document.getElementById("burger-line-2").classList.toggle("transition-burger-line-2");
    document.getElementById("burger-line-3").classList.toggle("transition-burger-line-3");
}

const params = new URLSearchParams(location.search)
var articleIds = params.get('id');
console.log(articleIds);

const section = document.querySelector(".articles");
const index = document.querySelector(".articles-home");
const template = document.querySelector(".article").content;
const imgLink = "";
const pListLink = "";
const articlesLink = "https://spreadsheets.google.com/feeds/list/1zV1J-ryAejwmZMSujMgOOb4eeO6ppNUm0lECjl495FU/od6/public/values?alt=json";

function LoadJSON() {

    fetch(articlesLink).then(result => result.json()).then(article => article.feed.entry.forEach(displayData));
    fetch(articlesLink).then(result => result.json()).then(articles => sortData(articles.feed.entry));

}


function sortData(articles) {
    console.log(articles);
    var sortedArticles = articles.sort(function (a, b) {
        return b.gsx$popularity.$t - a.gsx$popularity.$t
    });
    console.log(sortedArticles);
    sortedArticles.forEach(displayDataIndex);
}


function displayData(article) {
    const clone = template.cloneNode(true);


    clone.querySelector(".article__heading").textContent = article.gsx$heading.$t;
    clone.querySelector(".article__category").textContent = article.gsx$category.$t;
    clone.querySelector(".article__info").classList.add('article__info-' + article.gsx$class.$t);
    clone.querySelector(".article__author").textContent = article.gsx$author.$t;
    clone.querySelector(".article__text").textContent = article.gsx$description.$t;
    clone.querySelector(".article-home img").src = ("../img/articles/" + article.gsx$image.$t);
    clone.querySelector(".article-home img").alt = article.gsx$image.$t;
    // SETS ID FOR EVERY ARTICLE    
    let articleID = 'articleID-' + article.gsx$id.$t;
    clone.querySelector('.article-home').id = articleID;
    clone.querySelector('.article-home').addEventListener('click', passID);

    function passID() {
        window.location.replace('article.html' + '?id=' + article.gsx$id.$t, "");
    }
    if ((document.querySelector(".articles__header__heading").textContent) === (article.gsx$category.$t)) {
        section.appendChild(clone);
    };



}

LoadJSON();


let searchButton = document.querySelector(".searchButton");
let searchInput = document.querySelector(".search");
let subscribeButton = document.querySelector(".button-subscribe")
let x = window.matchMedia("(max-width: 700px)");

function SearchReveal() {
    if (x.matches) { // If media query matches
        document.getElementById("logo").classList.toggle("logoSearchDissapear");
        searchInput.classList.toggle("searchInputAppear");
    } else {
        subscribeButton.classList.toggle("subscribeButtonMargin");
        searchInput.classList.toggle("searchInputAppear");
    }

}


document.body.classList.add('loaded');

