/*Globals*/
var nav;
var data;
var contentTemplate;
var contentTemplateNodes = [];
/**/

document.addEventListener("DOMContentLoaded", function(event) { init(); });

function init(){
  nav = getElements('#nav>li');
  data = window.myData;
  contentTemplate = getElement('#contentTemplate').content;
  
  contentTemplateNodes = [
    contentTemplate.querySelectorAll('.contentTitle')[0],
    contentTemplate.querySelectorAll('.contentImg')[0],
    contentTemplate.querySelectorAll('.contentText')[0]
  ];

  indexnav();
  addListinersTonav();
  populateTemplate(0);
  getElement("#nav>li:first-child").className = 'clicked';
}

function indexnav(){
  if(nav)
    for(var i=0; i<nav.length; i++)
      nav[i].setAttribute("item-index", i);
}

function addListinersTonav() {
  if(nav)
    for(var i = 0; i<nav.length; i++)
      nav[i].addEventListener('click', getContent);
}

function getContent(event){
  var item = event.target;
  removeSelection();
  item.className = 'clicked';
  populateTemplate(item.getAttribute('item-index'));
}

function removeSelection(){
  for(var i=0; i<nav.length; i++)
    nav[i].className = '';
}

function populateTemplate(contentItem){
  resetTemplate();
  contentTemplateNodes[0].innerHTML = data[contentItem].title;
  contentTemplateNodes[1].setAttribute('src', data[contentItem].img);
  contentTemplateNodes[1].setAttribute('alt', 'placeholder');
  contentTemplateNodes[2].innerHTML = data[contentItem].text;

  getElement('#content').appendChild(
    document.importNode(contentTemplate, true));
}

function resetTemplate(){
  var content = getElement('#content');
  while (content.hasChildNodes()) {
    content.removeChild(content.lastChild);
  }
}
/*******/
function getElement(selector) {
  return document.querySelector(selector);
}

function getElements(selector) {
  return document.querySelectorAll(selector);
}
