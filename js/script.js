var i;

let menuRevealed = document.querySelector(".menu-revealed");

function menuReveal() {
    menuRevealed.classList.toggle("menu-from-left");
    document.getElementById("burger-line-1").classList.toggle("transition-burger-line-1");
    document.getElementById("burger-line-2").classList.toggle("transition-burger-line-2");
    document.getElementById("burger-line-3").classList.toggle("transition-burger-line-3");
}
// SCROLL
window.onscroll = function () {
    scrollFunction()
};

function scrollFunction() {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        document.querySelector(".desktop-nav").style.height = "0";
    } else {
        document.querySelector(".desktop-nav").style.height = "10rem";
    }
}

// GET ID
const params = new URLSearchParams(location.search)
var articleID = params.get('id');


// CONST FOR DATABASE
const page = document.querySelector("main");




const articlesLink = "https://spreadsheets.google.com/feeds/list/1zV1J-ryAejwmZMSujMgOOb4eeO6ppNUm0lECjl495FU/od6/public/values?alt=json";

function LoadJSON() {
    //    fetch(articlesLink).then(result => result.json()).then(article =>  article.feed.entry.forEach(displayData)); TEMPLATE COMMAND
    fetch(articlesLink).then(result => result.json()).then(articles => Controller(articles.feed.entry));
}

function Controller(articles) {
    console.log(articles);
    // MAIN PAGE ACTIONS
    if (page.classList.contains('mainPage')) {
        console.log('Its index');

        sortPopular(articles);
        sortRecent(articles);

    }
    // CATEGORY PAGE
    if (page.classList.contains('categoryPage')) {
        console.log('Its Category');
        const categoryArticles = document.querySelector('.articles');
        for (var i = 1; i < articles.length; i++) {


             if ((document.querySelector(".articles__header__heading").textContent) === articles[i].gsx$category.$t) {
            displayData(articles[i], categoryArticles);
            };


        }
    }
    // ARTICLE PAGE
    if (page.classList.contains('articlePage')) {
        console.log('Its Single Article');

        articles.forEach(displayOneArticle);
    }
}


function sortRecent(articles) {
    var recentArticles = articles.sort(function (a, b) {
        return b.gsx$id.$t - a.gsx$id.$t
    });
    const mostRecent = document.querySelector(".mostRecent");
    console.log(recentArticles);
    for (i = 0; i < 3; i++) {
        displayData(recentArticles[i], mostRecent);
    }

}

function sortPopular(articles) {
    var popularArticles = articles.sort(function (a, b) {
        return b.gsx$popularity.$t - a.gsx$popularity.$t
    });
    const mostPopular = document.querySelector(".mostPopular");
    console.log(popularArticles);
    for (i = 0; i < 3; i++) {
        displayData(popularArticles[i], mostPopular);
    }

}


function displayData(article, place) {
    const templateArticle = document.querySelector(".article").content;
    const clone = templateArticle.cloneNode(true);


    clone.querySelector(".article__heading").textContent = article.gsx$heading.$t;
    clone.querySelector(".article__category").textContent = article.gsx$category.$t;

    clone.querySelector(".article__info").classList.add('article__info-' + article.gsx$class.$t);
    clone.querySelector(".article__author").textContent = article.gsx$author.$t;
    clone.querySelector(".article__text").textContent = article.gsx$description.$t;
    clone.querySelector(".article-home img").src = ("img/articles/" + article.gsx$image.$t);
    clone.querySelector(".article-home img").alt = article.gsx$image.$t;
    let articleID = 'articleID-' + article.gsx$id.$t;
    var articleHome = clone.querySelector('.article-home');

    articleHome.addEventListener('click', passID);
    clone.querySelector('.article-home').id = articleID;

    function passID() {
        console.log('PASS');
        window.location.replace('article.html' + '?id=' + article.gsx$id.$t, "");
    }
    place.appendChild(clone);
    document.body.classList.add('loaded');
}




function displayOneArticle(article) {
    const oneArticle = document.querySelector(".articlePage");
    const templateOneArticle = document.querySelector(".article-template").content;
    const clone = templateOneArticle.cloneNode(true);
  
    if (article.gsx$id.$t == articleID) {
        console.log(article.gsx$heading.$t);
        clone.querySelector(".article-content__heading").textContent = article.gsx$heading.$t;


        clone.querySelector(".article-content__info").classList.add('article-content__info-' + article.gsx$class.$t);
        document.querySelector(".articles__header").classList.add('header_' + article.gsx$class.$t);
        document.querySelector(".articles__header__heading").textContent = article.gsx$category.$t;
        clone.querySelector(".article-content__author").textContent = article.gsx$author.$t;
        clone.querySelector(".article-content__date").textContent = article.gsx$date.$t;
        clone.querySelector(".article-content__text").innerHTML = article.gsx$content.$t;
        clone.querySelector(".article-content img").src = ("img/articles/" + article.gsx$image.$t);
        clone.querySelector(".article-content img").alt = article.gsx$image.$t;

        oneArticle.appendChild(clone);
        
    }
    document.body.classList.add('loaded');
}
LoadJSON();

//SEARCH BTN

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


// LOADING LOAD
