$( document ).ready(function() {

  var existingButtons = ["Dillon Francis", "Porter Robinson", "Kygo"];

  function CreateButtons() {

  $("#button").empty();

  for (var i = 0; i < existingButtons.length; i++) {
    
    var x = $("<button>");
    x.addClass("dj");
    x.attr("data-name", existingButtons[i]);
    x.text(existingButtons[i]);
    $("#button").append(x);
   }
  }

  //click the button and show gifs
  $(document).on("click", ".dj", function() {
    var person = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + person + "&api_key=puyG93FfDlfAJqhDSWtoReKo3qk3KpWy&limit=10";

    console.log(person);

    $.ajax({
     url: queryURL,
     method: "GET"
    })
    .then(function(response) {

      var results = response.data;
      console.log(response);

      for (var i = 0; i < results.length; i++) {

       if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

        var gifDiv = $("<div class='item'>");

        var rating = results[i].rating;

        var p = $("<p>").text("Rating: " + rating);

        var personImage = $("<img>");
      
        gifDiv.append(p);

  
        var gifImage = $("<img>");
        personImage.attr("src", results[i].images.fixed_height_still.url);
        personImage.attr("data-still", results[i].images.fixed_height_still.url);
        personImage.attr("data-animate", results[i].images.fixed_height.url);
        personImage.attr("data-state", "still");
        personImage.addClass("image");
        
        gifDiv.append(personImage);
        $("#gifs-appear-here").prepend(gifDiv);


      }
    }
  });
 });

 //click one of the gifs to pause or make it move
  $(document).on("click", ".image", function(){
    console.log(     $(this).attr("src")     );
    var movetocard = $(this).attr("src");
    $(".card-img-top").attr("src", movetocard);

    var state = $(this).attr('data-state');
              
    if ( state == 'still'){
      $(this).attr('src', $(this).data('animate'));
      $(this).attr('data-state', 'animate');
    }else{
      $(this).attr('src', $(this).data('still'));
      
      $(this).attr('data-state', 'still');
      
    }
  });
 
  //click SUBMIT to search for the dj and add button
  $(".djsearch").on("click", function(event) {

    event.preventDefault();

    var newdj = $("#input").val().trim();

    existingButtons.push(newdj);

    CreateButtons();
  });

  CreateButtons();

  });

