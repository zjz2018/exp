
$(document).ready(function() {
    var Grids = $("table .Grid");
    if (Grids) {
        Grids.each(
            function() {
                var TitleTR = $(this).find("tr:first");
                var NotTitleTRs = $(this).find("tr:not(:first)");
                if (TitleTR) {
                    TitleTR.addClass("Title");
                }
                if (NotTitleTRs) {
                    NotTitleTRs.bind("mouseover", function() { $(this).removeClass(); $(this).addClass("GridMouseOver") });
                    NotTitleTRs.bind("mouseout", function() { $(this).removeClass(); $(this).addClass("GridMouseOut") });
                }
            }
        );
    }

//    var INPUTs = $("textarea,input[type='text'][disabled='true'],input[type='file'][disabled='true']");
//    if (INPUTs) {
//        INPUTs.each(
//        function() {
//            if ($(this).attr("disabled") == true)
//                $(this).css("background-image", "none");
//        }
//    )
//    }

});




  
