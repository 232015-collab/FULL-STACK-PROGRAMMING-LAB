$(document).ready(function () {

  $(".tab-btn").on("click", function () {
    var target = $(this).data("target");

    if ($(this).hasClass("active")) { return; }

    // Update active tab button
    $(".tab-btn").removeClass("active");
    $(this).addClass("active");

    // Smooth scroll to content area
    var scrollTarget = $("#contentArea").offset().top - $("#tabNav").outerHeight() - 20;

    $("html, body").animate({ scrollTop: scrollTarget }, 400, function () {
      // After scrolling, switch panel with animation
      $(".tab-panel.active").fadeOut(200, function () {
        $(this).removeClass("active");
        $("#" + target)
          .addClass("active")
          .hide()
          .fadeIn(350);
      });
    });
  });
});
