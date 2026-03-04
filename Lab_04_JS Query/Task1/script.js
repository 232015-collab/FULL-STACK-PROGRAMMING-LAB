$(document).ready(function () {

  function updateCount() {
    var count = $("#itemList li.list-item").length;
    $("#itemCount").text(count + (count === 1 ? " item" : " items"));
  }

  function addItem() {
    var text = $("#itemInput").val().trim();

    if (text === "") {
      $("#itemInput").addClass("input-error");
      setTimeout(function () {
        $("#itemInput").removeClass("input-error");
      }, 400);
      return;
    }

    $("#emptyMsg").hide();

    var $li = $("<li>").addClass("list-item").hide();
    var $span = $("<span>").addClass("item-text").text(text);
    var $btn = $("<button>").addClass("delete-btn").text("Delete");

    $btn.on("click", function () {
      $(this).closest("li").slideUp(250, function () {
        $(this).remove();
        updateCount();
        if ($("#itemList li.list-item").length === 0) {
          $("#emptyMsg").show();
        }
      });
    });

    $li.append($span).append($btn);
    $("#itemList").append($li);
    $li.slideDown(250);

    $("#itemInput").val("").focus();
    updateCount();
  }

  $("#addBtn").on("click", addItem);

  $("#itemInput").on("keypress", function (e) {
    if (e.which === 13) { addItem(); }
  });

  $("#clearAll").on("click", function () {
    $("#itemList li.list-item").slideUp(200, function () {
      $(this).remove();
      if ($("#itemList li.list-item").length === 0) {
        $("#emptyMsg").show();
        updateCount();
      }
    });
  });

  updateCount();
});
