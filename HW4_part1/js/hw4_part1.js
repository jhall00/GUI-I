/*
File: hw4.js
Created : November 3, 2021
GUI Assignment: Using the jQuery Plugin/UI with Your Dynamic Table
Description: Add on from HW 3. Using jQuery, I added validation functionality to 
my table inputs.
Jessica Hall, UMass Lowell Computer Science, jessica_hall1@student.uml.edu
Copyright (c) 2021 by Jessica. All rights reserved. May be freely copied or
excerpted for educational purposes with credit to the author.
updated by JH on November 22, 2021 at 1:12 PM.
Github username: jhall00

*/





$(function(){
    
    /*I'm not using a button of type submit because it cleared the fields; I didn't want that.
    This solves that */
    $("#submit").click(function(event){
        if($("#myForm").valid()){
            $("#myForm").submit()
        }
    })

    //When form is successfully submitted
    $( "#myForm" ).submit(function( event ) {

        buildTable();
        $("#tableDiv").css("display", "block") //unhide table
    })


    /* When we click out of the input, call fixDecimalStart to correctly
    format number if it starts with a decimal with no 0 before it.
    */
    $("#hStart").focusout(function(event) {
        fixDecimalStart("hStart");
        // validate the hEnd when we click out of hStart to ensure hStart isn't now greater
        if($("#hEnd").val() !== ""){ //don't validate it if we haven't entered anything in hEnd yet
            $("#hEnd").valid()
        }

    });

    $("#vStart").focusout(function(event) {
        fixDecimalStart("vStart");
        // validate the vEnd when we click out of hStart to ensure vStart isn't now greater
        if($("#vEnd").val() !== ""){ //don't validate it if we haven't entered anything in hEnd yet
            $("#vEnd").valid()
        }
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

    // validate the form
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
                greaterThan: $("#vStart"),
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
    Function Description: Builds a dynamic table dependant on user inputs
    */
    function buildTable(){

        // var table =document.getElementById("multTable");
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


})


