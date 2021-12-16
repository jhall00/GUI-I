/*
    File: hw5.js
    Created : Nov 29, 2021
    GUI Assignment: Implementing a Bit of Scrabble with Drag-and-Drop
    Description: Created a row of scrabble with corresponding bonus spaces. Used jQuery sortable for the boarb spots and for the user's rack.
    Users can drag and drop tiles to and from the rack and the board spaces. Once users submit a word, new tiles are put into the user's 
    rack. I also implemented the option for users to swap out any tiles the wish for new ones from the bag.
    Jessica Hall, UMass Lowell Computer Science, jessica_hall1@student.uml.edu
    Copyright (c) 2021 by Jessica. All rights reserved. May be freely copied or
    excerpted for educational purposes with credit to the author.
    last updated by JH on December 16, 2021 at 5:36 PM.
    Github username: jhall00
*/


// Data Structure taken from Jesse M. Heines (given in instructions document)
var ScrabbleTiles = [];
ScrabbleTiles["A"] = { "value": 1, "original_distribution": 9, "number_remaining": 9, "source": "images/Scrabble_Tiles/Scrabble_Tile_A.jpg" };
ScrabbleTiles["B"] = { "value": 3, "original_distribution": 2, "number_remaining": 2, "source": "images/Scrabble_Tiles/Scrabble_Tile_B.jpg" };
ScrabbleTiles["C"] = { "value": 3, "original_distribution": 2, "number_remaining": 2, "source": "images/Scrabble_Tiles/Scrabble_Tile_C.jpg" };
ScrabbleTiles["D"] = { "value": 2, "original_distribution": 4, "number_remaining": 4, "source": "images/Scrabble_Tiles/Scrabble_Tile_D.jpg" };
ScrabbleTiles["E"] = { "value": 1, "original_distribution": 12, "number_remaining": 12, "source": "images/Scrabble_Tiles/Scrabble_Tile_E.jpg" };
ScrabbleTiles["F"] = { "value": 4, "original_distribution": 2, "number_remaining": 2, "source": "images/Scrabble_Tiles/Scrabble_Tile_F.jpg" };
ScrabbleTiles["G"] = { "value": 2, "original_distribution": 3, "number_remaining": 3, "source": "images/Scrabble_Tiles/Scrabble_Tile_G.jpg" };
ScrabbleTiles["H"] = { "value": 4, "original_distribution": 2, "number_remaining": 2, "source": "images/Scrabble_Tiles/Scrabble_Tile_H.jpg" };
ScrabbleTiles["I"] = { "value": 1, "original_distribution": 9, "number_remaining": 9, "source": "images/Scrabble_Tiles/Scrabble_Tile_I.jpg" };
ScrabbleTiles["J"] = { "value": 8, "original_distribution": 1, "number_remaining": 1, "source": "images/Scrabble_Tiles/Scrabble_Tile_J.jpg" };
ScrabbleTiles["K"] = { "value": 5, "original_distribution": 1, "number_remaining": 1, "source": "images/Scrabble_Tiles/Scrabble_Tile_K.jpg" };
ScrabbleTiles["L"] = { "value": 1, "original_distribution": 4, "number_remaining": 4, "source": "images/Scrabble_Tiles/Scrabble_Tile_L.jpg" };
ScrabbleTiles["M"] = { "value": 3, "original_distribution": 2, "number_remaining": 2, "source": "images/Scrabble_Tiles/Scrabble_Tile_M.jpg" };
ScrabbleTiles["N"] = { "value": 1, "original_distribution": 6, "number_remaining": 6, "source": "images/Scrabble_Tiles/Scrabble_Tile_N.jpg" };
ScrabbleTiles["O"] = { "value": 1, "original_distribution": 8, "number_remaining": 8, "source": "images/Scrabble_Tiles/Scrabble_Tile_O.jpg" };
ScrabbleTiles["P"] = { "value": 3, "original_distribution": 2, "number_remaining": 2, "source": "images/Scrabble_Tiles/Scrabble_Tile_P.jpg" };
ScrabbleTiles["Q"] = { "value": 10, "original_distribution": 1, "number_remaining": 1, "source": "images/Scrabble_Tiles/Scrabble_Tile_Q.jpg" };
ScrabbleTiles["R"] = { "value": 1, "original_distribution": 6, "number_remaining": 6, "source": "images/Scrabble_Tiles/Scrabble_Tile_R.jpg" };
ScrabbleTiles["S"] = { "value": 1, "original_distribution": 4, "number_remaining": 4, "source": "images/Scrabble_Tiles/Scrabble_Tile_S.jpg" };
ScrabbleTiles["T"] = { "value": 1, "original_distribution": 6, "number_remaining": 6, "source": "images/Scrabble_Tiles/Scrabble_Tile_T.jpg" };
ScrabbleTiles["U"] = { "value": 1, "original_distribution": 4, "number_remaining": 4, "source": "images/Scrabble_Tiles/Scrabble_Tile_U.jpg" };
ScrabbleTiles["V"] = { "value": 4, "original_distribution": 2, "number_remaining": 2, "source": "images/Scrabble_Tiles/Scrabble_Tile_V.jpg" };
ScrabbleTiles["W"] = { "value": 4, "original_distribution": 2, "number_remaining": 2, "source": "images/Scrabble_Tiles/Scrabble_Tile_W.jpg" };
ScrabbleTiles["X"] = { "value": 8, "original_distribution": 1, "number_remaining": 1, "source": "images/Scrabble_Tiles/Scrabble_Tile_X.jpg" };
ScrabbleTiles["Y"] = { "value": 4, "original_distribution": 2, "number_remaining": 2, "source": "images/Scrabble_Tiles/Scrabble_Tile_Y.jpg" };
ScrabbleTiles["Z"] = { "value": 10, "original_distribution": 1, "number_remaining": 1, "source": "images/Scrabble_Tiles/Scrabble_Tile_Z.jpg" };
ScrabbleTiles["_"] = { "value": 0, "original_distribution": 2, "number_remaining": 2, "source": "images/Scrabble_Tiles/Scrabble_Tile_Blank.jpg" };



// https://stackoverflow.com/questions/46215260/reverse-is-not-a-function
jQuery.fn.reverse = function () {
    return this.pushStack(this.get().reverse(), arguments);
};

$(function () {

    var lettersArr = []
    var total = 0

    dragAndDrop(total)

    // Generate out first 7 Letters 
    for (var i = 0; i < 7; i++) {
        lettersArr.push(generateLetter())
    }

    var unique = 0
    $(".tile").each(function (index) {
        // set ID to letter it has
        $(this).attr('id', lettersArr[unique] + unique.toString())
        var imageUrl = ScrabbleTiles[lettersArr[unique]].source
        $(this).css("background-image", "url(" + imageUrl + ")")
        unique++
    });

    // Need  to keep track of letters we didn't use that are still in the rack so that we don't replace those

    $("#refill").click(function () {

        // update total
        addUp(total, "total")
        $("#currentTotal").text(0)
        //get new total
        total = $("#total")[0].textContent
        total = parseInt(total)
        dragAndDrop(total)

        lettersArr = []
        var copies = []
        var inRack = $("#rack").children()
        for (j = 0; j < inRack.length; j++) {
            var inRackLetter = $(inRack[j]).attr("id")
            //store which letters are in our rack in lettersArr, so we don't replace them
            lettersArr.push(inRackLetter.substr(0, 1))
        }

        var let = null
        //For the number of letters we we need to replace loop and generate a new letter from our bag
        for (var leftOver = lettersArr.length; leftOver < 7; leftOver++) {
            let = generateLetter()
            if (let != undefined) {
                lettersArr.push(let)
            }
        }

        // create copies for tiles in the board, so we can remove from board and put these sortable elements back in our rack 
        $(".boardSpot").each(function (index) {
            if (this.hasChildNodes()) {
                copies.push(this.children[0])
            }
            // get tile out of board
            $(this).remove(".tile");

        });
        // Put the tiles we took out of the board in our rack
        for (var k = 0; k < copies.length; k++) {
            $(copies[k]).appendTo("#rack");
        }

        // We now have an array with the letters we are going to put in the rack
        // The first portion of the array will hold whatever was leftover in our rack
        // The rest of the array is from the new letters we generated


        unique = 0
        $(".tile").each(function (index) {
            if (lettersArr[unique] != undefined) {
                // set ID to letter it has
                // Add unique to letter ID so that we don't get the same ID for two elements with the same letter
                $(this).attr('id', lettersArr[unique] + unique.toString())

                var imageUrl = ScrabbleTiles[lettersArr[unique]].source
                //set background
                $(this).css("background-image", "url(" + imageUrl + ")")
                unique++
            }
            else {
                $(this).remove()
            }
        });
        if ($("#rack").children().length == 0) {
            alert("You've used all the tiles. Click 'Restart' to begine a new game")
        }

        boardIsEmpty()

    })


    $("#swap").click(function () {
        lettersArr = []
        var copies = []
        var unique = 8
        var counter = 0
        $(".garbage").each(function (index) {
            lettersArr.push(generateLetter())
            // put current letters back in bag by increasing their number remaining
            var letter = ($(this).attr("id")).substr(0, 1)
            ScrabbleTiles[letter].number_remaining++

            // set ID to letter it has
            $(this).attr('id', lettersArr[counter] + unique.toString())
            var imageUrl = ScrabbleTiles[lettersArr[counter]].source
            $(this).css("background-image", "url(" + imageUrl + ")")
            unique++

            copies.push(this)
            $(this).remove(".tile");
            // place letters back in rack
            $(copies[counter]).appendTo("#rack");

            counter++
        });

        $(".tile").each(function (index) {
            // when we're done dealing with it take away garbage class
            $(this).removeClass("garbage");
        })
    })

    $("#restart").click(function () {

        // will be holding generated letters
        lettersArr = []

        total = 0
        var copies = []
        var unique = 0
        var counter = 0

        for (var i = 0; i < 7; i++) {
            lettersArr.push(generateLetter())
        }

        // set number in bag back to default
        for (var i = 65; i <= 90; i++) {
            ScrabbleTiles[String.fromCharCode(i)].number_remaining = ScrabbleTiles[String.fromCharCode(i)].original_distribution
        }


        $(".tile").each(function (index) {
            // put current letters back in bag by increasing their number remaining
            var letter = ($(this).attr("id")).substr(0, 1)

            // set ID to letter it has
            $(this).attr('id', lettersArr[counter] + unique.toString())
            var imageUrl = ScrabbleTiles[lettersArr[counter]].source
            $(this).css("background-image", "url(" + imageUrl + ")")
            unique++

            copies.push(this)
            $(this).remove(".tile");
            // place letters back in rack
            $(copies[counter]).appendTo("#rack");

            counter++
        });

        addUp(total, "total")
        addUp(total, "currentWord")
        boardIsEmpty()

    })
})


/*
Function Description:generates a new random letter based on probability of existing tiles
*/
function generateLetter() {
    var randoLetters = []

    // loop through ascii alphabet
    // https://stackoverflow.com/questions/8877249/generate-random-integers-with-probabilities
    for (var i = 65; i <= 90; i++) {
        for (var j = 0; j < ScrabbleTiles[String.fromCharCode(i)].number_remaining; j++) {
            // generate array with proper letter distribution to choose with weighted proabability
            randoLetters.push(String.fromCharCode(i))
        }
    }

    for (var a = 0; a < ScrabbleTiles["_"].number_remaining; a++) {
        randoLetters.push("_")
    }


    var idx = Math.floor(Math.random() * randoLetters.length)
    var chosenLetter = randoLetters[idx]

    if (chosenLetter != undefined) {
        //decrement count of chosen letter
        ScrabbleTiles[chosenLetter].number_remaining--
    }
    return chosenLetter

}


/*
Function Description: Sets up the sortables used in the program
@param 
    Name: total, Type: int, Description: The current game score total
*/
function dragAndDrop(total) {

    // in order to be able to get stuff out of the board
    $(".boardSpot").on("mousedown", function () {
        // console.log("down");
        var down = $('.boardSpot').sortable({ items: ".inRack" })
        // console.log(down);


    });

    $('#rack').sortable({ connectWith: '.droppable-area', revert: true });
    $('.boardSpot').sortable({

        connectWith: '.droppable-area',

        receive: function (ev, ui) {
            var count = $(this).children().length
            addUp(total, "currentWord")

            //get the free space to right of the right-most board space where a tile is placed
            var spaceLast = findLastUsedSpace()
            // noGaps will prevent the user from placing a tile anywhere but the next right available board spot
            noGaps(spaceLast)



            // check if board piece already has a tile in it, if so don't let that new tile in
            if (count >= 1) {
                var inside = $(this).sortable({ items: 'li:not(.inRack)' })
                // console.log(inside);

            }
            if (count >= 2) {
                $(ui.sender).sortable('cancel');
            }

            // will set up error variables if there exist gaps in word due to a middle tile being removed
            middleTileRemoved()


        },
        remove: function (ev, ui) {
            //adjust total when tile is removed


            //get the free space to right of the right-most board space where a tile is placed
            var spaceLast = findLastUsedSpace()
            // noGaps will prevent the user from placing a tile anywhere but the next right available board spot
            noGaps(spaceLast)

            // will set up error variables if there exist gaps in word due to a middle tile being removed
            middleTileRemoved()
            addUp(total, "currentWord")
            // if board is empty, function will allow a new first tile to be placed anywhere on board
            boardIsEmpty()



        },
        update: function (ev, ui) {
            // will set up error variables if there exist gaps in word due to a middle tile being removed
            middleTileRemoved()

            $(".boardSpot").each(function () {

                // check if error exists (whether submit should be prevented)
                if ($(this).hasClass("gapError")) {
                    $("#refill").addClass("disabled")
                    // show gap error message
                    $("#gap_alert").css("visibility", "visible")
                    return false
                }
                else
                    $("#refill").removeClass("disabled")
                $("#gap_alert").css("visibility", "hidden")

            })

        }

    })
    $('#garbage').sortable({
        connectWith: '.droppable-area',
        revert: true,
        receive: function (ev, ui) {
            $(ui.item[0]).addClass("garbage")
        },
        remove: function (ev, ui) {
            $(ui.item[0]).removeClass("garbage")
        }
    });


}

/*
Function Description: finds right-most open space in board (if there are tiles already on the board)
@return 
    Type: string, Description: returns id of the last space available
*/

function findLastUsedSpace() {

    var spaceLast = "space1"
    $(".boardSpot").each(function () {

        var boardChildTotal = $(this).children().length

        if (boardChildTotal == 0) {
            return
        }
        // we want to know the next free space next to right-most used space
        spaceLast = this.nextSibling.nextSibling.id
    });
    // returns space one over from right most space with tile
    return spaceLast
}

/*
Function Description: is called when a tile is removed to check if a gap error exists
*/
function middleTileRemoved() {
    var spaceLast = "space1"

    // loop through boardSpots from back
    $(".boardSpot").reverse().each(function () {

        var boardChildTotal = $(this).children().length

        // set everything back to default (black border and no gapError)
        $(this).css("border", "1px solid black")
        $(this).removeClass("gapError")

        // coming from the right, find the first space with a child
        if (boardChildTotal != 0) {
            spaceLast = this
            return false // get out of each loop
        }


    });
    var spaceFirst = "space1"


    $(".boardSpot").each(function () {
        var boardChildTotal = $(this).children().length

        // set everything back to default (black border and no gapError)
        $(this).css("border", "1px solid black")
        $(this).removeClass("gapError")

        // coming from the left, find the first space with a child
        if (boardChildTotal != 0) {
            spaceFirst = this
            return false // get out of each loop
        }


    });


    // now we have the front and back spaces of the current word on the board
    // loop through the board spaces from front letter space to last letter space to find if there exists any gaps from the user removing a tile
    for (var i = spaceFirst; i != spaceLast; i = i.nextSibling.nextSibling) {
        var id = i.id
        id = "#" + id
        // the gap spaces must allow for new tiles to be entered in order for the gap to be filled
        $(id).sortable('enable');

        // if we find an empty space, it is a gap, set errors
        if ($(i).children().length == 0) {
            $(i).css("border", "4px solid red")
            $(i).addClass("gapError")

        }
        // if it has children, it's not a gap
        else {
            $(i).css("border", "1px solid black")
            $(i).removeClass("gapError")

        }
    }

}

/*
Function Description: Checks whether the board has any tiles in it. If it's empty it sets all board spots to enabled to allow tiles to be inserted.
    Type: boolean, Description: returns true if is empty, false otherwise
*/
function boardIsEmpty() {

    var isEmpty = true
    $(".boardSpot").each(function () {

        // if just one space has a child, the board is not empty so can break out of loop
        if ((this.hasChildNodes())) {
            isEmpty = false
            return false
        }

    });
    if (isEmpty == false) {
        return false
    }

    $(".boardSpot").each(function () {
        // if the board is empty we can set every board space to be open to accept a new tile
        $(this).sortable('enable');

    });

    return true // true that board is empty
}


/*
Function Description: disable all board spots that aren't the next available board spot
@param 
    Name: acceptableSpace, Type: string, Description: The id of the element returned from findLastUsedSpace()
*/
function noGaps(acceptableSpace) {
    // if there are letters on the board, it's the subsequent space which will receive the next letter if there needs to be another
    $(".boardSpot").each(function () {

        // disable everything that's empty (non-empty shouldn't be disabled b/c then users can't take the letters out of the board again)
        // AND disable everything that's not the 'acceptableSpace'
        if (this.id != acceptableSpace && !(this.hasChildNodes())) {
            $(this).sortable('disable');
        }

        else {
            // enable the acceptableSpace and those with children to receive and move tiles around
            $(this).sortable('enable');
        }
    });
}


/*
Function Description: Checks for empty string in textbox and checks for box with only spaces and will display error message if empty
@param 
    Name: total, Type: int, Description: The overall game total score
    Name: option, Type: string, Decription: Is used to determine if we should update the current word total or the overall total
*/
function addUp(total, option) {
    var double_word = 0
    var word_total = 0

    $(".boardSpot").each(function (index) {

        // Board spots that have a tile in it
        if (this.hasChildNodes()) {
            var tileEl = this.children[0]
            var tileLetter = $(tileEl).attr("id")
            tileLetter = tileLetter.substr(0, 1)
            var tileValue = ScrabbleTiles[tileLetter].value

            // double letter value 
            if ($(this).hasClass("double_letter")) {
                tileValue *= 2
            }

            // If one space with a tile is a double word, set double count variable
            if ($(this).hasClass("double_word")) {
                double_word = double_word + 1
            }
            word_total += tileValue

        }
    });

    // if a word covers 2 double word tiles, count the word x4
    if (double_word > 0) {
        for (i = 0; i < double_word; i++) {
            word_total *= 2
        }
    }

    if (option == "total") { //update overall total
        total += word_total
        $("#total").text(total)
    }
    else {
        $("#currentTotal").text(word_total) // update current total
    }

}

