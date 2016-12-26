/*Globals*/
var NAV;
var DATA;
var CONTENT_TEMPLATE;
var CONTENT_TEMPLATE_NODES = [];
/**/

document.addEventListener("DOMContentLoaded", function(event) { init(); });

function init(){
  NAV = getElements('#nav>li');
  DATA = getJSON();
  CONTENT_TEMPLATE = getElement('#contentTemplate').content;
  CONTENT_TEMPLATE_NODES = [
    CONTENT_TEMPLATE.querySelectorAll('.contentTitle')[0],
    CONTENT_TEMPLATE.querySelectorAll('.contentImg')[0],
    CONTENT_TEMPLATE.querySelectorAll('.contentText')[0]
  ];

  indexNav();
  addListinersToNav();
  populateTemplate(0);
  getElement("#nav>li:first-child").className = 'clicked';
}

function getJSON(){
  return JSON.parse(JSON.stringify(data));
}

function indexNav(){
  if(NAV)
    for(var i=0; i<NAV.length; i++)
      NAV[i].setAttribute("item-index", i);
}

function addListinersToNav() {
  if(NAV)
    for(var i = 0; i<NAV.length; i++)
      NAV[i].addEventListener('click', getContent);
}

function getContent(event){
  var item = event.target;
  removeSelection();
  item.className = 'clicked';
  populateTemplate(item.getAttribute('item-index'));
}

function removeSelection(){
  for(var i=0; i<NAV.length; i++)
    NAV[i].className = '';
}

function populateTemplate(contentItem){
  resetTemplate();
  CONTENT_TEMPLATE_NODES[0].innerHTML = DATA[contentItem].title;
  CONTENT_TEMPLATE_NODES[1].setAttribute('src', DATA[contentItem].img);
  CONTENT_TEMPLATE_NODES[1].setAttribute('alt', 'placeholder');
  CONTENT_TEMPLATE_NODES[2].innerHTML = DATA[contentItem].text;

  getElement('#content').appendChild(
    document.importNode(CONTENT_TEMPLATE, true));
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
