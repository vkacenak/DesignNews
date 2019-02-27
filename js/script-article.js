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


const section = document.querySelector("main");
const template = document.querySelector(".article-template").content;
const imgLink = "";
const pListLink = "";
const articlesLink = "https://spreadsheets.google.com/feeds/list/1zV1J-ryAejwmZMSujMgOOb4eeO6ppNUm0lECjl495FU/od6/public/values?alt=json";
function LoadJSON(){
    fetch(articlesLink).then(result => result.json()).then(article => article.feed.entry.forEach(displayData))
}
function displayData(article) {

    const clone = template.cloneNode(true);
   if (article.gsx$id.$t == articleIds){
       console.log(article.gsx$heading.$t);
       clone.querySelector(".article-content__heading").textContent = article.gsx$heading.$t;
      
      
  
    clone.querySelector(".article-content__info").classList.add('.article__info-' + article.gsx$class.$t);
    clone.querySelector(".article-content__author").textContent = article.gsx$author.$t;
    clone.querySelector(".article__text").textContent = article.gsx$content.$t;
//      clone.querySelector(".article__img").src = imgLink + "small/" + article.gsx$image.$t + "-sm.jpg";
//     clone.querySelector(".article__img").alt = article.gsx$image.$t;
section.appendChild(clone);
   }


 /*
    clone.querySelector(".article__heading").textContent = article.gsx$heading.$t;
    clone.querySelector(".article__category").textContent = article.gsx$category.$t;
  
    clone.querySelector(".article__info").classList.add('.article__info-' + article.gsx$class.$t);
    clone.querySelector(".article__author").textContent = article.gsx$author.$t;
    clone.querySelector(".article__text").textContent = article.gsx$description.$t;*/
//      clone.querySelector(".article__img").src = imgLink + "small/" + article.gsx$image.$t + "-sm.jpg";
//     clone.querySelector(".article__img").alt = article.gsx$image.$t;
     
 
}
LoadJSON();


