// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads and is where you should call your functions.
$(document).ready(function(){
    const $display = $('#display');

    // TODO: Call your apply function(s) here
    //applyFilter(reddify);
    applyFilterNoBackground(reddify);
    //applyFilterNoBackground(filterFunction);
    //applyFilter(decreaseBlue);
    //applyFilter(increaseGreenByBlue);


    render($display, image);
});

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO: Create the applyFilter function here
function applyFilter(filterFunction){
    for (var r = 0; r < image.length; r++){
        for (var c = 0; c < image[r].length; c++){
            var rgbString = image[r][c];
            var rgbNumbers = rgbStringToArray(rgbString);
            filterFunction(rgbNumbers);
            rgbString = rgbArrayToString(rgbNumbers);
            image[r][c] = rgbString;
        }
    }
}

// TODO: Create the applyFilterNoBackground function
function applyFilterNoBackground(filterFunction){
    for (var r = 0; r < image.length; r++){
        for (var c = 0; c < image[r].length; c++){
            var rgbString = image[r][c];
            if (image[r][c] === image[0][0]){
                
            }
            var rgbNumbers = rgbStringToArray(rgbString);
            filterFunction(rgbNumbers);
            rgbString = rgbArrayToString(rgbNumbers);
            image[r][c] = rgbString;
        }
    }
}

// TODO: Create filter functions
function reddify(array){
    array[RED] = 255;
}

function blueify(array){
    array[BLUE] = 255;
}

function greenify(array){
    array[GREEN] = 255;
}

function decreaseBlue(array){
    var blue = array[BLUE];
    var adjBlue = blue - 100;
    var endBlue = Math.max(0, adjBlue);
    array[BLUE] = endBlue;
}

function increaseGreenByBlue(array){
    var blue = array[BLUE];
    var green = array[GREEN];
    var adjGreen = blue + green;
    var endGreen = Math.min(adjGreen, 255);
    array[GREEN] = endGreen;
}

// CHALLENGE code goes below here
