$(document).ready(function () {
  let currentPage = 1;
  const perPage = 5;

  function fetchPosts(page, append) {
    $("#loader").fadeIn(200);
    const start = (page - 1) * perPage + 1;

    $.ajax({
      url: "https://jsonplaceholder.typicode.com/posts",
      data: { _start: (page - 1) * perPage, _limit: perPage },
      success: function (data) {
        $("#loader").fadeOut(200, function () {
          if (!append) {
            $("#postList").empty();
          }

          $.each(data, function (i, post) {
            const $li = $("<li>").addClass("post-item").hide();
            $li.append($("<div>").addClass("post-id").text("Post #" + post.id));
            $li.append($("<div>").addClass("post-title").text(post.title));
            $li.append($("<div>").addClass("post-body").text(post.body));
            $("#postList").append($li);
            $li.delay(i * 80).slideDown(300);
          });

          const total = currentPage * perPage;
          $("#statusBar").text("Showing " + total + " of 100 posts");
          $("#loadMoreBtn").show();
          if (total >= 100) $("#loadMoreBtn").hide();
        });
      },
      error: function () {
        $("#loader").fadeOut(200);
        alert("Failed to load posts. Check your internet connection.");
      }
    });
  }

  $("#loadBtn").on("click", function () {
    currentPage = 1;
    fetchPosts(currentPage, false);
  });

  $("#loadMoreBtn").on("click", function () {
    currentPage++;
    fetchPosts(currentPage, true);
  });

  $("#clearBtn").on("click", function () {
    $("#postList").empty();
    $("#loadMoreBtn").hide();
    $("#statusBar").text("");
    currentPage = 1;
  });
});
