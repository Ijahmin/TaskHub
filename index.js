// Create a "close" button and append it to each list item \u00D7
var myNodelist = document.getElementsByClassName("box");
var i;
for (i = 0; i < myNodelist.length; i++) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u2713");
    span.className = "confirm";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);

    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
}

// Click on a confirm button to hide the current list item
var confirm = document.getElementsByClassName("confirm");
var i;
for (i = 0; i < confirm.length; i++) {
    confirm[i].onclick = function() {
        var div = this.parentElement;
        div.style.display = "none";
    }
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
        var div = this.parentElement;
        div.style.display = "none";
    }
}

// Create a new list item when clicking on the "Add" button
function newElement() {
    // Create new div to place task in
    var boxDiv = document.createElement("div");
    boxDiv.className = "box";

    // Get values from input
    var taskValue = document.getElementById("taskInput").value;
    var descValue = document.getElementById("descriptionInput").value;
    var timeValue = document.getElementById("timeInput").value;
    var colorValue = document.getElementById("colorInput").value;
    if (taskValue === '') {
        alert("You must give a task name!");
        return;
    } else if (descValue === '') {
        alert("You must give a task description!");
        return;
    } else if (timeValue === '') {
        alert("You must give an approximate task time!");
        return;
    }

    // Assign point value and length of box
    var points = timeValue * 500;
    var gridSpan;
    if (timeValue < 2) {
        gridSpan = 1;
    } else if (timeValue > 10) {
        gridSpan = 5;
    } else {
        gridSpan = Math.floor(timeValue / 2);
    }

    // Add task to box
    var boxTask = document.createElement("Div");
    boxTask.className = "boxTask";
    var boxContent = document.createElement("Div");
    boxContent.className = "boxContent";
    var boxPoints = document.createElement("Div");
    boxPoints.className = "boxPoints";
    var taskP = document.createElement("p");
    var descP = document.createElement("p");
    var timeP = document.createElement("p");
    var pointsP = document.createElement("p");
    var taskT = document.createTextNode(taskValue);
    var descT = document.createTextNode("Description: " + descValue);
    var timeT = document.createTextNode("Estimated Time: " + timeValue + " hrs");
    var pointsT = document.createTextNode(points);
    taskP.appendChild(taskT);
    descP.appendChild(descT);
    timeP.appendChild(timeT);
    pointsP.appendChild(pointsT);
    boxTask.appendChild(taskP);
    boxContent.appendChild(descP);
    boxContent.appendChild(timeP);
    boxPoints.appendChild(pointsP)
    boxDiv.appendChild(boxTask);
    boxDiv.appendChild(boxContent);
    boxDiv.appendChild(boxPoints);

    // Style new task
    boxTask.style.background = colorValue;
    boxTask.style.fontSize = (8 * gridSpan / 10) + "vw";
    boxContent.style.fontSize = (6 * gridSpan / 10) + "vw";
    boxPoints.style.fontSize = (8 * gridSpan / 10) + "vw";
    boxDiv.style.background = colorValue;
    boxDiv.style.border = "4px solid " + LightenDarkenColor(colorValue, -40);
    boxDiv.style.gridColumn = "span " + (gridSpan);
    boxDiv.style.gridRow = "span " + (gridSpan);

    // Reset inputs
    document.getElementById("taskInput").value = "";
    document.getElementById("descriptionInput").value = "";
    document.getElementById("timeInput").value = "";

    // Add delete and confirm buttons
    var span1 = document.createElement("SPAN");
    var txt1 = document.createTextNode("\u2713");
    span1.className = "confirm";
    span1.style.fontSize = (12 * gridSpan / 10) + "vw";
    span1.appendChild(txt1);
    boxDiv.appendChild(span1);

    var span2 = document.createElement("SPAN");
    var txt2 = document.createTextNode("\u00D7");
    span2.className = "close";
    span2.style.fontSize = (7 * gridSpan / 10) + "vw";
    span2.appendChild(txt2);
    boxDiv.appendChild(span2);

    // Add to page
    document.getElementById("myBoxes").appendChild(boxDiv);

    // Remove task on delete/confirm and add points if needed
    var i;
    for (i = 0; i < confirm.length; i++) {
        confirm[i].onclick = function() {
            var div1 = this.parentElement;
            div1.style.display = "none";
            document.getElementById("points").innerHTML = parseInt(document.getElementById("points").innerHTML) + points;
        }
    }

    var i;
    for (i = 0; i < close.length; i++) {
        close[i].onclick = function() {
            var div1 = this.parentElement;
            div1.style.display = "none";
        }
    }

    // Create new random (light) color for next task
    document.getElementById("colorInput").value = getRandomColor();
}

// Function to lighten/darken a hex color (from https://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors)
function LightenDarkenColor(col, amt) {
    var usePound = false;
    if ( col[0] == "#" ) {
        col = col.slice(1);
        usePound = true;
    }

    var num = parseInt(col,16);

    var r = (num >> 16) + amt;

    if ( r > 255 ) r = 255;
    else if  (r < 0) r = 0;

    var b = ((num >> 8) & 0x00FF) + amt;

    if ( b > 255 ) b = 255;
    else if  (b < 0) b = 0;
    
    var g = (num & 0x0000FF) + amt;

    if ( g > 255 ) g = 255;
    else if  ( g < 0 ) g = 0;

    return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
}

function getRandomColor() {
    var letters = 'BCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
}

// Show the dropdown menu to add a task
function showAddDropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu
window.onclick = function(event) {
    if (event.target.matches('.addBtn')) {
        var options = document.getElementsByClassName("addDropdownContent");
        var i;
        for (i = 0; i < options.length; i++) {
            var openOption = options[i];
            if (openOption.classList.contains('show')) {
                openOption.classList.remove('show');
            }
        }
    }
}