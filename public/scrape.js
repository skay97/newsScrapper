$(".scrapper").click(function () {
  // empty container and obtain information
  $("#articles").empty();
  $.getJSON("/articles", function (data) {
    // For each one
    for (var i = 208; i < 215; i++) {
      // Display the information on the page
      $("#articles").append(
        `<div class="card">
        <h5 class="card-title text-center">Article</h5>
        <div class="card-body"> <a href="${data[i].link}" target="_blank"> ${data[i].title} </div>
        </div><br>`
      )
    }
  });
})