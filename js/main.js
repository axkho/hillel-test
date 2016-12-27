document.addEventListener("DOMContentLoaded", function(event) { init(); });

function init(){
  indexnav();
  addListinersTonav();
  populateTemplate(0);
  getElement("#nav>li:first-child").className = 'clicked';
}

function indexnav(){
  if(getNav())
    for(var i=0; i<getNav().length; i++)
      getNav()[i].setAttribute("item-index", i);
}

function addListinersTonav() {
  if(getNav())
    for(var i = 0; i<getNav().length; i++)
      getNav()[i].addEventListener('click', getContent);
}

function getContent(event){
  var item = event.target;
  removeSelection();
  item.classList.add('clicked');
  populateTemplate(item.getAttribute('item-index'));
}

function removeSelection(){
  for(var i=0; i<getNav().length; i++)
    getNav()[i].classList.remove('clicked');
}

function populateTemplate(contentItem){
  resetTemplate();

  var template = getTemplate();
  var title = template.querySelectorAll('.contentTitle')[0];
  var img = template.querySelectorAll('.contentImg')[0];
  var text = template.querySelectorAll('.contentText')[0];

  title.innerHTML = window.myData[contentItem].title;
  img.setAttribute('src', window.myData[contentItem].img);
  img.setAttribute('alt', 'placeholder');
  text.innerHTML = window.myData[contentItem].text;

  getElement('#content').appendChild(
    document.importNode(template, true));
}

function resetTemplate(){
  var content = getElement('#content');
  while (content.hasChildNodes()) {
    content.removeChild(content.lastChild);
  }
}
/***/
/*******/
function getElement(selector) {
  return document.querySelector(selector);
}
function getElements(selector) {
  return document.querySelectorAll(selector);
}
function getNav() {
  return getElements('#nav>li');
}
function getTemplate() {
  return getElement('#contentTemplate').content;
}
