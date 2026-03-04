$(document).ready(function () {
  let dragSrc = null;

  function updateOrder() {
    const items = [];
    $("#sortList li").each(function (i) {
      const name = $(this).find(".item-name").text();
      items.push((i + 1) + ". " + name);
    });
    $("#orderDisplay").html("<strong>Current Order:</strong> " + items.join(" → "));
  }

  function attachDragEvents() {
    $("#sortList li")
      .attr("draggable", true)
      .off("dragstart dragend dragover dragleave drop")
      .on("dragstart", function (e) {
        dragSrc = this;
        $(this).addClass("dragging");
        e.originalEvent.dataTransfer.effectAllowed = "move";
      })
      .on("dragend", function () {
        $(this).removeClass("dragging");
        $("#sortList li").removeClass("drag-over");
        updateOrder();
      })
      .on("dragover", function (e) {
        e.preventDefault();
        e.originalEvent.dataTransfer.dropEffect = "move";
        if (this !== dragSrc) {
          $("#sortList li").removeClass("drag-over");
          $(this).addClass("drag-over");
        }
        return false;
      })
      .on("dragleave", function () {
        $(this).removeClass("drag-over");
      })
      .on("drop", function (e) {
        e.stopPropagation();
        if (this !== dragSrc) {
          const $src = $(dragSrc);
          const $target = $(this);
          const srcIdx = $src.index();
          const tgtIdx = $target.index();

          if (srcIdx < tgtIdx) {
            $target.after($src);
          } else {
            $target.before($src);
          }
          attachDragEvents(); // Reattach after DOM change
        }
        return false;
      });
  }

  attachDragEvents();
  updateOrder();
});
