// slidedown div when mouse hovers over.
$(document).ready(function() {
    $(".productDetailsList").hide();
    $(".productDetails").hover(function() {
        $(".productDetailsList").css("color", "rosybrown").slideDown(1000);
    }, function() {
        $(".productDetailsList").hide("slow");
    });

    $("#imageZoomIcon").hide();
    $("#myImg").hover(function() {
        $("#imageZoomIcon").fadeIn();
    }), function() {
        $("#imageZoomIcon").fadeOut();
    }
});

// Enlarge image when image is clicked on.
// Get the modal //
var modal = document.getElementById("myModal");

//Getting the image and insert it inside the modal
var img = document.getElementById("myImg");
var modalImg = document.getElementById("img01");
var captionText = document.getElementById("caption");
img.onclick = function() {
    modal.style.display = "block";
    modalImg.src = this.src;
    captionText.innerHTML = this.alt;
}



//Get the <span> element that closes the modal          
var span = document.getElementsByClassName("close")[0];

//When the user clicks on <span> (x), close the modal          
span.onclick = function() {
    modal.style.display = "none";
}