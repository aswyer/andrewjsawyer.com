$(document).ready(function() {
    var factor = 2.5;
    var height = 0;
    var width = 0;

    sizeUpdate();

    $( "body" ).mousemove(function( event ) {
        var yFactor = -1 * (event.pageY - height/2)
        var xFactor =  -1 * (event.pageX - width/2)

        var movementStrength = (((xFactor*xFactor)/width+(yFactor*yFactor)/height)/36) * factor

        console.log("rotate3d(" + xFactor + ", " + yFactor + ", 0, " + movementStrength + "deg")
        $("#bgImg").css("transform", "rotate3d(" + xFactor + ", " + yFactor + ", 0, " + movementStrength + "deg) ");
        
        
    });

    $( "body" ).mouseleave(function() {
        console.log("mouseleave");
        
        $("#bgImg").addClass("animate").delay(500).queue(function(next) {
            $(this).removeClass("animate");
            $("#bgImg").css("transform", "rotate(0)");
            next();
        });

      });

    $( window ).resize(function() {
        sizeUpdate();
    });

    function sizeUpdate() {
        height = $(window).height();
        width = $(window).width();

        if (width > 1920) {
            factor = 1;
        } else if (width > 3840) {
            factor = 0.5;
        }
    }
});