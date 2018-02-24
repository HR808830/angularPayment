$(document).ready(function() {
    $(".sidetoggle").click(function() {
        $("#sidebar").toggleClass("in");
        $(".theme-body").toggleClass("left");
    });

    $(window).bind("resize", function() {
        var w = $(window).width();
        if (w <= 900) {
            $("#sidebar").removeClass("in");
            $(".theme-body").addClass("left");
        } else {
            $("#sidebar").addClass("in");
            $(".theme-body").removeClass("left");
        }
    });


    $(".list-widget li").click(function() {
        $(".list-widget li").removeClass("active");
        $(this).addClass("active");
    });
});