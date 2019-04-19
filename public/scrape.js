$(".scrapper").click(function () {
  // empty container and obtain information
  $("#articles").empty();
  $.getJSON("/articles", function (data) {
    // For each one
    for (var i = 74; i < 85; i++) {
      // Display the information on the page
      $("#articles").append(`<a href="${data[i].link}" target="_blank">Article: ${data[i].title}<br/><br/>`)

    }
  });
})