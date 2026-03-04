$(document).ready(function () {

  var captions = [
    "Architecture",
    "Forest",
    "Coastline",
    "City",
    "Desert"
  ];

  var $imgs  = $(".main-img");
  var $thumbs = $(".thumb-item");
  var total   = $imgs.length;
  var current = 0;
  var animating = false;

  // Build dots
  for (var i = 0; i < total; i++) {
    (function (idx) {
      $("<button>")
        .addClass("dot" + (idx === 0 ? " active" : ""))
        .attr("aria-label", "Go to image " + (idx + 1))
        .on("click", function () { goTo(idx); })
        .appendTo("#dotContainer");
    })(i);
  }

  function goTo(index) {
    if (animating || index === current) { return; }
    animating = true;

    var prev = current;
    current  = (index + total) % total;

    // Fade main image
    $imgs.eq(prev).fadeOut(300, function () {
      $imgs.eq(current).fadeIn(350);
      animating = false;
    });

    // Caption: chain fadeOut -> text update -> fadeIn
    $("#captionText").fadeOut(150, function () {
      $(this).text(captions[current]).fadeIn(200);
    });

    // Counter
    $("#counterText").text((current + 1) + " / " + total);

    // Dots
    $(".dot").removeClass("active").eq(current).addClass("active");

    // Thumbnails
    $thumbs.removeClass("active").eq(current).addClass("active");
  }

  // Thumbnail click
  $thumbs.on("click", function () {
    goTo(parseInt($(this).data("index")));
  });

  $("#prevBtn").on("click", function () { goTo(current - 1); });
  $("#nextBtn").on("click", function () { goTo(current + 1); });

  // Keyboard navigation
  $(document).on("keydown", function (e) {
    if (e.key === "ArrowLeft")  { goTo(current - 1); }
    if (e.key === "ArrowRight") { goTo(current + 1); }
  });
});
