/*
    File: hw4.js
    Created : November 7, 2021
    GUI Assignment: Using the jQuery Plugin/UI with Your Dynamic Table
    Description:Add on from HW 3. Using jQuery UI, add two-way binded sliders and add 
    tabs which the the current table can be added to.
    Jessica Hall, UMass Lowell Computer Science, jessica_hall1@student.uml.edu
    Copyright (c) 2021 by Jessica. All rights reserved. May be freely copied or
    excerpted for educational purposes with credit to the author.
    last updated by JH on November 15, 2021 at 1:44 PM.
    Github username: jhall00
*/

  
  

$(function(){

    //for tab id's
    var idCounter = 0

    /*I'm not using a button of type submit because it cleared the fields; I didn't want that.
    This solves that */
    $("#submit").click(function(event){
        if($("#myForm").valid()){
            $("#myForm").submit() // triggers validate again before we build table
            //set up id counter id for each tab
            idCounter++
            var id = idCounter.toString()
            id = "t" + id
            var html = buildTable()
            $("#tabs").css("display", "block") // unhide tabs panel (hidden on start to avoid ugly empty box)
            // add tab to panel
            addTab(id, html)
        }

    })

    //when x on tab is clicked
    $(document).on('click', '.ui-icon-close', function() {
        // next two lines from https://stackoverflow.com/questions/16091823/get-clicked-element-using-jquery-on-event
        var clickedElement = $(event.target);
        var liEl = clickedElement.closest('li'); // get nearest list element for tab
        deleteTab(liEl)
        $("#tabs").tabs("refresh")
    });
  

    /* When we click out of the input, call fixDecimalStart to correctly
    format number if it starts with a decimal with no 0 before it.
    */
    $("#hStart").focusout(function(event) {
        fixDecimalStart("hStart");

    });

    $("#vStart").focusout(function(event) {
        fixDecimalStart("vStart");

    });



    /*
    Form validator with jQuery
    */

    var $myForm = $("#myForm")
    //method checks if the hEnd is greater than hStart (same for vertical values)
    $.validator.addMethod('greaterThan', function(value, element, param) {
        var i = parseInt(value)
        var j = parseInt($(param).val())
        return i >= j
    }, "Value must be greater")
    //method checks if the user has entered any spaces
    $.validator.addMethod('noSpaces', function(value, element, param) {
        return value.indexOf(" ") < 0
    }, "No spaces")
    $myForm.validate({
        rules:{
            hStart: {
                required:true, //cannot be left blank
                noSpaces:true, // cannot have spaces
                number:true, // is a number
                min: -50,
                max: 50
            },
            hEnd: {
                required:true, //cannot be left blank
                noSpaces:true, // cannot have spaces
                number:true, // is a number
                min: -50,
                max: 50,
                greaterThan: $("#hStart") // hStart must be less than hEnd

            },
            vStart: {
                required:true, //cannot be left blank
                noSpaces:true, // cannot have spaces
                number:true, // is a number
                min: -50,
                max: 50
            },
            vEnd: {
                required:true, //cannot be left blank
                noSpaces:true, // cannot have spaces
                number:true, // is a number
                greaterThan: $("#vStart"), // vStart must be less than vEnd
                min: -50,
                max: 50
            }
        },
        
        messages:{
            hStart: {
                required: "This field cannot be left blank. <br>Please enter a Horizontal Start Value",
                number: "You have entered a non-number value. <br>Please enter a number.",
                noSpaces: "Spaces are not allowed. <br>Please enter an integer with no spaces.",
                max: "The Horizontal Start value is too large. <br>Please enter a number less than or equal to 50.",
                min: "The Horizontal Start value is too small. <br>Please enter a number greater than or equal to -50."
            },
            hEnd: {
                required: "This field cannot be left blank. <br>Please enter a Horizontal End Value",
                number: "You have entered a non-number value. <br>Please enter a number.",
                greaterThan: "The Horizontal End Number you have entered is smaller than the Start Number. <br>Please enter a value larger than Horizontal Start.",
                noSpaces: "Spaces are not allowed. <br>Please enter an integer with no spaces.",
                max: "The Horizontal End value is too large. <br>Please enter a number less than or equal to 50.",
                min: "The Horizontal End value is too small. <br>Please enter a number greater than or equal to -50."

            },
            vStart: {
                required: "This field cannot be left blank. <br>Please enter a Vertical Start Value",
                number: "You have entered a non-number value. <br>Please enter a number.",
                noSpaces: "Spaces are not allowed. <br>Please enter an integer with no spaces.",
                max: "The Vertical Start value is too large. <br>Please enter a number less than or equal to 50.",
                min: "The Vertical Start value is too small. <br>Please enter a number greater than or equal to -50."

            },
            vEnd: {
                required: "This field cannot be left blank. <br>Please enter a Vertical End Value",
                number: "You have entered a non-number value. <br>Please enter a number.",
                greaterThan: "The Vertical End Number you have entered is smaller than the Start Number. <br>Please enter a value larger than Vertical Start.",
                noSpaces: "Spaces are not allowed. <br>Please enter an integer with no spaces.",
                max: "The Vertical End value is too large. <br>Please enter a number less than or equal to 50.",
                min: "The Vertical End value is too small. <br>Please enter a number greater than or equal to -50."
            }
        },

        
    })

    /*
    Set up for all four sliders: set max and min values
    For all sliders, when the value changes, update the input box value to match
    If the form is valid, make the table
    */

    $("#hStartSlide").slider({
        min:-50,
        max:50,
        slide: function( event, ui ) {
            $("#hStart").val(ui.value); // set input text to slider value
            if($("#myForm").valid()){ // make table when form is valid
                $("#tableDiv").css("display", "block") //unhide table div when we change values
                buildTable()
            }
        }
    })
    $("#hEndSlide").slider({
        min:-50,
        max:50,
        slide: function( event, ui ) {
            $("#hEnd").val(ui.value); // set input text to slider value
            if($("#myForm").valid()){ // make table when form is valid
                $("#tableDiv").css("display", "block") //unhide table div when we change values
                buildTable()
            }
        }
    })
    $("#vStartSlide").slider({
        min:-50,
        max:50,
        slide: function( event, ui ) {
            $("#vStart").val(ui.value); // set input text to slider value
            if($("#myForm").valid()){ // make table when form is valid
                $("#tableDiv").css("display", "block") //unhide table div when we change values
                buildTable()
            }
        }
    })
    $("#vEndSlide").slider({
        min:-50,
        max:50,
        slide: function( event, ui ) {
            $("#vEnd").val(ui.value); // set input text to slider value
            if($("#myForm").valid()){ // make table when form is valid
                $("#tableDiv").css("display", "block") //unhide table div when we change values
                buildTable()
            }
        }
    })



    //SLIDERS
    /* Repeat for all 4 input boxes, make the initial value of the input boxes match the slider initial value
        update slider value to match when textbox changes
        and build the table if all our values are valid
    */
    var initValue
    initValue = $("#hStartSlide").slider("value");
    $("#hStart").val(initValue); // set initial value
    $("#hStart").change(function() {
        $("#hStartSlide").slider("value", $("#hStart").val()) // set slider to text Input value
        if($("#myForm").valid()){
            $("#tableDiv").css("display", "block") //unhide table div when we change values
            buildTable()
        }
      });

    initValue = $("#hEndSlide").slider("value");
    $("#hEnd").val(initValue); // set initial value
    $("#hEnd").change(function() {
        $("#hEndSlide").slider("value", $("#hEnd").val()) // set slider to text Input value
        if($("#myForm").valid()){
            $("#tableDiv").css("display", "block") //unhide table div when we change values
            buildTable()
        }
    });

    initValue = $("#vStartSlide").slider("value");
    $("#vStart").val(initValue); // set initial value
    $("#vStart").change(function() {
        $("#vStartSlide").slider("value", $("#vStart").val()) // set slider to text Input value
        if($("#myForm").valid()){
            $("#tableDiv").css("display", "block") //unhide table div when we change values
            buildTable()
        }
    });

    initValue = $("#vEndSlide").slider("value");
    $("#vEnd").val(initValue); // set initial value
    $("#vEnd").change(function() {
        $("#vEndSlide").slider("value", $("#vEnd").val()) // set slider to text Input value
        if($("#myForm").valid()){
            $("#tableDiv").css("display", "block") //unhide table div when we change values
            buildTable()
        }
    });

    //Initialize
    $("#tabs").tabs()


    $("#delete").click(function(event){ //when delete all selected button clicked
        deleteAll()
    })

    
})



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
        myHtml += "<tr><th scope=\"row\">"+i+"</th>"
            //inner loop writes product of the 2 elements in each cell in the current row
            for( var j = parseInt(hStart); j <= parseInt(hEnd); j++ ){
                myHtml += "<td>"+ j*i +"</td>"
            }
        // closes the row 
        myHtml += "</tr>"
    }
    //set everything we have just written in the HTML to our table
    table.innerHTML = myHtml
    
    return myHtml

}

/*
Function Description: Adds a tab to tabs panel
@return 
    Type: none
@parameters : id is what we will make the new tab id, html is the inner html of the table we will add
*/
function addTab(id, html){


    //get values for tab label
    var hStart = document.getElementById("hStart").value
    var hEnd = document.getElementById("hEnd").value
    var vStart = document.getElementById("vStart").value
    var vEnd = document.getElementById("vEnd").value
    var label = hStart + " " + hEnd + " " + vStart + " " + vEnd

    //set up tab li element
    var ul = document.getElementById("tabsList")
    var li = document.createElement("li")
    //add checkbox, href link, and x icon to tab
    li.innerHTML = "<input type='checkbox'id='check" + id + "'class='delBoxes'><a href=#" + id +">" + label +"</a><span class='ui-icon ui-icon-close'</span>"
    ul.appendChild(li)

    //set up tab div element for table
    var tabs = document.getElementById("tabs")
    var table = document.createElement("div")
    table.setAttribute("id", id)
    table.setAttribute("class", "myTables") // class for css styling
    table.innerHTML = "<table class='table table-bordered table-striped'>" + html + "</table>" // add table to inner html of div
    tabs.appendChild(table)

    $("#tabs").tabs("refresh");
    
}

/*
Function Description: Deletes tab from tab panel
@return 
    Type: none
@parameters : liEl of type element is the tab list element which of which the x was clicked 
*/
function deleteTab(liEl){
    var href = liEl[0].getAttribute("aria-controls") // get href value, which is div id
    var idStr = href
    liEl.remove() //remove tab li
    document.getElementById(idStr).remove() // remove tab div
}

/*
Function Description: Deletes all tabs that have checked check boxes
@return 
    Type: none
@parameters : none 
*/
function deleteAll(){
    var selected = $('.delBoxes:checkbox:checked') // get a list of all currently checked check boxes

    for(var i= 0; i< selected.length; i++){
        var li = selected[i].closest("li") // selected variable is the checkbox element, we must get the li element
        var href = li.getAttribute("aria-controls")
        var idStr = href
        li.remove() // delete the list item associated with the tab
        document.getElementById(idStr).remove() //delete the div that contains the tab content

    }
}


/*
Function Description: Fixes input if it starts with decimal and adds a zero in front
@return 
    Type: None
@parameters : el is the ID of the current element we are checking to see if user has entered a decimal point as first character of a number
*/
function fixDecimalStart(el){
   
    var curEl = document.getElementById(el).value;
    
    if(curEl[0] != 0){
    //Cases for when input starts with decimal point
        if ((curEl) < 1 && (curEl) > 0) { // if it starts with .
            document.getElementById(el).value = "0" + curEl; // add a zero in front, so .3 = 0.3
        }
        if ((curEl) < 0 && (curEl) > -1) { // if it starts with -.
            document.getElementById(el).value = "-0" + curEl.substring(1, curEl.length); // add zero after negative sign, so -.3 = -0.3
        }
    }


}



