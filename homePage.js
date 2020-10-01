// Animate div to enlarge with mouse hover.
$(document).ready(function() {
    $(".winterCollectionDiv").hover(function() {
        $("#winterCollectionH").animate({ fontSize: '40px' }, 'slow');
        $(".winterCollectionP").animate({ fontSize: '19px' }, 'slow');
    }, function() {
        $("#winterCollectionH").animate({ fontSize: '35px' }, 'slow');
        $(".winterCollectionP").animate({ fontSize: '17px' }, 'slow');
    });
});