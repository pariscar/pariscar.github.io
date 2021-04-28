// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads and is where you should call your functions.
$(document).ready(function(){
    const $display = $('#display');

    // TODO: Call your apply function(s) here
    applyFilter(reddify);




    render($display, image);
});

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO: Create the applyFilter function here
function applyFilter(filterFunction){
    for (var r = 0; r < image.length; r++){
        for (var c = 0; c < image[r].length; c++){
            var rgbString = image[0][0];
            var rgbNumbers = rgbStringToArray(rgbString);
            filterFunction(rgbNumbers);
            //rgbNumbers[RED] = 255;
            rgbString = rgbArrayToString(rgbNumbers);
            image[0][0] = rgbString;
        }
    }
}

// TODO: Create the applyFilterNoBackground function


// TODO: Create filter functions
function reddify(array){
    array[RED] = 255;
}

// CHALLENGE code goes below here
