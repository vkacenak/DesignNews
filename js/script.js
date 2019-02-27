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
const template = document.querySelector(".article").content;
const imgLink = "";
const pListLink = "";
const articlesLink = "https://spreadsheets.google.com/feeds/list/1zV1J-ryAejwmZMSujMgOOb4eeO6ppNUm0lECjl495FU/od6/public/values?alt=json";
function LoadJSON(){

fetch(articlesLink).then(result => result.json()).then(article => article.feed.entry.forEach(displayData))

}
function displayData(article) {
    const clone = template.cloneNode(true);
    
 
    clone.querySelector(".article__heading").textContent = article.gsx$heading.$t;
    clone.querySelector(".article__category").textContent = article.gsx$category.$t;
  
    clone.querySelector(".article__info").classList.add('.article__info-' + article.gsx$class.$t);
    clone.querySelector(".article__author").textContent = article.gsx$author.$t;
    clone.querySelector(".article__text").textContent = article.gsx$description.$t;
//      clone.querySelector(".article__img").src = imgLink + "small/" + article.gsx$image.$t + "-sm.jpg";
//     clone.querySelector(".article__img").alt = article.gsx$image.$t;
        // SETS ID FOR EVERY ARTICLE    
        let articleID = 'articleID-' + article.gsx$id.$t; 
        clone.querySelector('.article-home').id = articleID;  
 clone.querySelector('.article-home').addEventListener('click', passID);
 function passID(){
    window.open('article.html'+'?id='+ article.gsx$id.$t,"");
}

    section.appendChild(clone);
}
LoadJSON();







