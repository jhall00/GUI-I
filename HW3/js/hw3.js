/*
    File: hw3.js
    Created : October 14, 2021
    GUI Assignment: Creating an Interactive Dynamic Table
    Description: Create a dynamic table based on 4 user inputs for the horizontal and 
    vertical axes start and end points. Style it appropriately. 
    Jessica Hall, UMass Lowell Computer Science, jessica_hall1@student.uml.edu
    Copyright (c) 2021 by Jessica. All rights reserved. May be freely copied or
    excerpted for educational purposes with credit to the author.
    last updated by JH on Ocotber 21, 2021 at 3:59 PM.
    Github username: jhall00
*/


//When submit is clicked
document.getElementById("submit").onclick = function(event){

    /*Each time sumbit is clicked before the new table is produced, style is set to hidden
     so we don't see empty scrollable div if invalid user inputs are given*/
    var tableDiv = document.getElementById("tableDiv");
    tableDiv.style.display = "none";   

    //See if input is valid
    var isValid = validateInput();
    if(isValid==false){
        return;
    }

    //unhide div (it is hidden before sumbit is clicked and shown once user enters appropriate values and clicks sumbit)
    tableDiv.style.display = "block";

    buildTable();
}

/*
Function Description: Builds a dynamic table dependant on user inputs
*/
function buildTable(){

    var table =document.getElementById("multTable");
    // Will use to write inside of table's HTML further down
    table.innerHTML = "";
    var myHtml = "";

    //Get user input
    var hStart = document.getElementById("hStart").value;
    var hEnd = document.getElementById("hEnd").value;
    var vStart = document.getElementById("vStart").value;
    var vEnd = document.getElementById("vEnd").value;

    //Sets up first row of horizontal headers
    myHtml += "<thead><tr><th scope=\"col\"></th>"
    for( var i = parseInt(hStart); i <= parseInt(hEnd); i++ ) {
        myHtml += "<th scope=\"col\">" + i+ "</th>"
    }
    //Closes that row and thead in the html
    myHtml += "</tr> </thead>"

    //Outer loop allows vertical header to be written as the first element of each row
    for( var i = parseInt(vStart); i <= parseInt(vEnd); i++ ) {
        //Vertical header
        myHtml += "<tr><th scope=\"row\">"+i+"</th>";
            //inner loop writes product of the 2 elements in each cell in the current row
            for( var j = parseInt(hStart); j <= parseInt(hEnd); j++ ){
                myHtml += "<td>"+ j*i +"</td>"
            }
        // closes the row 
        myHtml += "</tr>";
    }
    //set everything we have just written in the HTML to our table
    table.innerHTML = myHtml;

}


/*
Function Description: Checks id user input is valid
@return 
    Type: boolean, Description: returns true if input is valid, returns false otherwise
*/
function validateInput(){
    var hStart = document.getElementById("hStart").value;
    var hEnd = document.getElementById("hEnd").value;
    var vStart = document.getElementById("vStart").value;
    var vEnd = document.getElementById("vEnd").value;

    var error = document.getElementById("error");
    error.innerHTML = "";


    //Cases for when input starts with decimal point
    if((hStart) < 1 && (hStart) > 0){
        document.getElementById("hStart").value = "0"+ hStart;
    }
    if((hStart) < 0 && (hStart) > -1){
        document.getElementById("hStart").value = "-0"+ hStart.substring(1,hStart.length);
    }

    if((hEnd) < 1 && (hEnd) > 0){
        document.getElementById("hEnd").value = "0"+ hEnd;
    }
    if((hEnd) < 0 && (hEnd) > -1){
        document.getElementById("hEnd").value = "-0"+ hEnd.substring(1,hEnd.length);
    }

    if((vStart) < 1 && (vStart) > 0){
        document.getElementById("vStart").value = "0"+ vStart;
    }
    if((vStart) < 0 && (vStart) > -1){
        document.getElementById("vStart").value = "-0"+ vStart.substring(1,vStart.length);
    }

    if((vEnd) < 1 && (vEnd) > 0){
        document.getElementById("vEnd").value = "0"+ vEnd;
    }
    if((vEnd) < 0 && (vEnd) > -1){
        document.getElementById("vEnd").value = "-0"+ vEnd.substring(1,vEnd.length);
    }

    //If what is entered into textbox is not a number, display error message
    if((isNaN(hStart) == true) ||(isNaN(hEnd) == true) || (isNaN(vStart) == true) || (isNaN(vEnd) == true)){
        error.innerHTML = "One value you have entered is not a number. Please enter a number for each of the 4 values above.";
        return false;
    }

    //Checks if user has left textbox emmpty
    var e1 =checkEmpty(hStart, "Horizontal Start Number");
    var e2 = checkEmpty(hEnd, "Horizontal End Number");
    var e3 = checkEmpty(vStart, "Vertical Start Number");
    var e4 = checkEmpty(vEnd, "Vertical End Number");
    
    /*
    If any of the above calls return true, this means textbox was empty so we abort after error
    message was displayed
    */
    if(e1 == true||e2 == true||e3 == true||e4 == true){
        return false;
    }

    //Find difference
    var hLength = hEnd - hStart;
    var vLength = vEnd - vStart;

    //This set of if statements check to see if the range of the numbers entered is too big and will take to long to calculate
    // If input has a range bigger than 200 error is sent
    if(vLength > 200){
        error.innerHTML = "Too wide of a rage of numbers for Vertical Numbers. Enter numbers with a difference of 200 or less.";
        return false;
    }
    if(hLength > 200){
        error.innerHTML = "Too wide of a rage of numbers for Horizontal Numbers. Enter numbers with a difference of 200 or less.";
        return false;
    }

    //Checks that the start number for both the verical and horizontal axes should be smaller than the ending number
    if(parseInt(hStart) > parseInt(hEnd)){
        error.innerHTML = "Horizontal starting number should be less than the ending number. Please try again.";
        return false;
    }
    if(parseInt(vStart) > parseInt(vEnd)){
        error.innerHTML = "Vertical starting number should be less than the ending number. Please try again.";
        return false;
    }
    return true;
}



/*
Function Description: Checks for empty string in textbox and checks for box with only spaces and will display error message if empty
@param 
    Name: str, Type: string, Description: The string that the user entered into the form (which needs to checked)
    Name: label, Type: string, Decription: The corresponding label of the form label is passed so it can be specified in the error statement.
@return 
    Type: boolean, Description: returns true if string is empty, returns false otherwise
*/
function checkEmpty(str, label){
    // https://stackoverflow.com/questions/10261986/how-to-detect-string-which-contains-only-spaces/50971250

    //repeatedly finds any spaces in the string and deletes them
    //if it ends up being length 0 that means it was full of of spaces, so we display an error
    if (!str.replace(/\s/g, '').length) {
        var error = document.getElementById("error");
        error.innerHTML = "Error: " + label + " is empty. Please enter a number";
        return true;
    }
    return false;
}