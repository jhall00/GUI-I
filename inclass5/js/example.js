//ADD NEW ITEM TO END OF LIST
var ul = document.getElementsByTagName('ul')[0];

var li = document.createElement("li");
li.appendChild(document.createTextNode("cream"));
ul.appendChild(li);


// ADD NEW ITEM START OF LIST

var newFirst = document.createElement('li') ;
newFirst.appendChild(document.createTextNode('kale'));
ul.insertBefore(newFirst, ul.firstChild);


// ADD A CLASS OF COOL TO ALL LIST ITEMS
var items = document.getElementsByTagName("li")
for (var i = 0; i < items.length; i++) {
    items[i].setAttribute('class', 'cool');
}

// ADD NUMBER OF ITEMS IN THE LIST TO THE HEADING

var heading = document.getElementsByTagName('h2')[0];
var num = document.createElement('p') ;
var totalItems = items.length ;
num.textContent = totalItems
num.style.display = "inline"
num.style.borderRadius = "50px"
heading.appendChild(num)

