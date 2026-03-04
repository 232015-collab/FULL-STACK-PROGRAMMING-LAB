$(document).ready(function () {

  let fontSize = 20;
  const colors = ["#e74c3c", "#6c63ff", "#27ae60", "#e67e22", "#2980b9", "#8e44ad"];
  const bgColors = ["#ffeaa7", "#dfe6e9", "#a29bfe", "#fd79a8", "#55efc4", "#81ecec"];
  let colorIdx = 0, bgIdx = 0;

  $(".btn-font-up").on("click", function () {
    fontSize = Math.min(fontSize + 4, 48);
    $("#styledText").animate({ fontSize: fontSize + "px" }, 300);
  });

  $(".btn-font-down").on("click", function () {
    fontSize = Math.max(fontSize - 4, 10);
    $("#styledText").animate({ fontSize: fontSize + "px" }, 300);
  });

  $(".btn-color").on("click", function () {
    colorIdx = (colorIdx + 1) % colors.length;
    $("#styledText").css("color", colors[colorIdx])
      .fadeOut(150).fadeIn(150);
  });

  $(".btn-bg").on("click", function () {
    bgIdx = (bgIdx + 1) % bgColors.length;
    $(".preview-box").css("background", bgColors[bgIdx]);
  });

  $(".btn-bold").on("click", function () {
    const isBold = $("#styledText").css("font-weight") === "700" ||
                   $("#styledText").css("font-weight") === "bold";
    $("#styledText").css("font-weight", isBold ? "normal" : "bold");
    $(this).text(isBold ? "Toggle Bold" : "Bold ✓");
  });

  $(".btn-italic").on("click", function () {
    const isItalic = $("#styledText").css("font-style") === "italic";
    $("#styledText").css("font-style", isItalic ? "normal" : "italic");
    $(this).text(isItalic ? "Toggle Italic" : "Italic ✓");
  });

  $(".btn-highlight").on("click", function () {
    const current = $("#styledText").css("background-color");
    $("#styledText")
      .css("background", current === "rgba(0, 0, 0, 0)" || current === "transparent" ? "#fff176" : "transparent")
      .css("padding", "4px 8px").css("border-radius", "4px");
  });

  $(".btn-shadow").on("click", function () {
    const current = $("#styledText").css("text-shadow");
    const hasShadow = current !== "none" && current !== "";
    $("#styledText").css("text-shadow", hasShadow ? "none" : "3px 3px 8px rgba(0,0,0,0.3)");
    $(this).text(hasShadow ? "Add Shadow" : "Shadow ✓");
  });

  $(".btn-reset").on("click", function () {
    fontSize = 20;
    colorIdx = 0; bgIdx = 0;
    $("#styledText")
      .css({ "font-size": "20px", "font-weight": "normal", "font-style": "normal",
             "color": "#333", "background": "transparent", "text-shadow": "none",
             "padding": "0", "border-radius": "0" })
      .fadeOut(200).fadeIn(300);
    $(".preview-box").css("background", "#fafafa");
    $(".btn-bold").text("Toggle Bold");
    $(".btn-italic").text("Toggle Italic");
    $(".btn-shadow").text("Add Shadow");
  });
});
