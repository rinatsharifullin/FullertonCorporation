//Define variables
var position = (localStorage.getItem('sliderPosition') == null) ? 100 : parseInt(window.localStorage.getItem('sliderPosition')) - 100;  //Read slider position when reloading or reopening page
console.log(position);
var delay;                                                              //Delay between images in slider
var myTimer;                                                            //Set timer variable

$(document).ready(function(){
    $('#banner-img').css('transition', 'none');                         //Remove transition to move slider immediately to start position
    $('#banner-img').css('transform', 'translate(-' + (position) + '%)').delay(10).queue(function(){     //Move to start position and delay starting slider to finish move
        mySlider(position);                                             //Run slider
        $(this).dequeue();                                              //Resume all other functions
    });
    
    
    
    // Click button to display image
    $('#buttons').click(function(e){
        var positionClick;                                              //Variable to identify image position
        switch(e.target.id){                                            //Extract clicked button id
            case 'first': positionClick=100; break;                     //Select futton and assign position
            case 'second': positionClick=200; break;
            case 'third': positionClick=300; break;
            case 'fourth': positionClick=400; break;
            // case 'fifth': positionClick=400; break;
        }
        buttonClick(positionClick);                                     //Run image positioning function
    })
    
    // Hover over image to stop slide and zoom in
    $('#banner-img img').hover(function(e){
        $(this).css('transition', 'transform 2s ease-in-out');          //Mouse enter, activate transition
        clearTimeout(myTimer);                                          //Stop sliding
        $(this).css('transform', 'scale(1.1)')                          //Zoom in
    }, function(e){                                                     //Mouse leave
        $(this).css('transform', 'scale(1)')                            //Zoom out
        myTimer = setTimeout(mySlider,delay, position);                 //Restart timer
    });
    
    // Display mobile menu
    $('#mobile-icon').click(function(){
        $('nav').css('display', 'flex');
    });
    
    // Hide mobile menu
    $('#x-icon').click(function(){
        $('nav').css('display', 'none');
    });
    // On resizing window mobile navigation menu need to be hidden, but desktop nav menu must be visible, otherwise impossible to reach desktop nav menu
    $(window).resize(function(){                //Using resize event
        if($(window).outerWidth(true)>1000){     //On increasing window make menu visible
            $('nav').css('display', 'flex');
        }else{
            $('nav').css('display', 'none');                 //On shrinking window size, hide mobile menu
        }
    });

    // Set up arrow for transition
    $('#arrow').css({ 'position': 'fixed', 'right': 30 +'px', 'bottom': -50+'px', 'transition': 'bottom ease 1s'});

    // Trigger arrow behaviour on scroll
    $(document).scroll(function(){
        //Calculate position of top window from 0 to 10
        var position =Math.round( (10/ ($(document).height() - $(window).height()))*$(document).scrollTop());
        //If position over 2, show arrow
        if (position > 2){
            $('#arrow').css('bottom', 30+'px')          //Show arrow
        }else{
            $('#arrow').css('bottom', -50+'px')         //Hide arrow
        }
    });

    //Click on arrow bring document to top
    $('#arrow').click(function(){
        $(document).scrollTop(0);
    });

    
});


// Slide images
function mySlider(positionSlide){
    delay = 5000;                                                       //Function duration
    clearButtonsColour();                                               //Discolour all button
    $('#banner-img').css('transition', 'transform 2s ease-in-out');   //Restart transition smooth
    if (positionSlide > 400) {                                          //On last image start again
        positionSlide = position = 0;                                   //Initial position of slider
        delay = 0;                                                      //On restart run function without delay
        $('#banner-img').css('transition', 'none');                     //Remove transition to scroll back images without animation
    };
    $('#banner-img').css('transform', 'translate(-' + positionSlide + '%)'); //Move images on define position
    $('#buttons p:nth-child(' + positionSlide/100  + ')').css('color', 'rgba(255, 0, 0, 0.5)');//Colour button
    position+=100;                                                      //Step to next image position in percents
    localStorage.setItem('sliderPosition', position);                   //Remember current position in permanent storage
    myTimer = setTimeout(mySlider,delay, position);                     //Run function again with new position value
    
}

//Discolour all button
function clearButtonsColour(){
    $('#buttons p').css('color', 'inherit');                            //All p in buttons container colour to default
}

// Image positioning function
function buttonClick(positionClikMe){
    delay = 10000;                                                       //Delay for next slide start
    clearTimeout(myTimer);                                              //Stop slider
    clearButtonsColour();                                               //Discolour all buttons
    $('#banner-img').css('transform', 'translate(-' + positionClikMe + '%)'); //Move to our image
    $('#buttons p:nth-child(' + positionClikMe/100  + ')').css('color', 'rgba(255, 0, 0, 0.5)');   //Colour our button
    position = positionClikMe;                                          //Remember global position value
myTimer = setTimeout(mySlider,delay, positionClikMe);                   //Resume slider
}