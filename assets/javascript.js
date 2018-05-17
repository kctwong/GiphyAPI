$(document).ready(function() {

    var animalArray = ["dog", "cat", "rabbit"];


    console.log(animalArray);

    function displayAnimal() {


      var apiKey = "WCzgULwaOYQvBVC0T3dLKGvDaRDu0UHd";
      var animal = $(this).attr("data-name");
      var queryURL = "http://api.giphy.com/v1/gifs/search?" + "api_key=" + apiKey + "&q=" + animal + "&limit=9";


        console.log(animal);
        console.log(queryURL);

        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {

            var result = response.data;
            console.log(result);

            for (var i = 0; i < animalArray.length; i++) {
                
                var showDiv = $("<div class='col-md-4'>");
    
                var rating = result[i].rating;
                var animatedImg = result[i].images.fixed_height.url;
                var staticImg = result[i].images.fixed_height_still.url;
                var showImage = $("<img>");
                var p = $("<p>").text("Rating: " + rating);
    
                showImage.attr("src", staticImg);
                showImage.addClass("animalGIF");
                showImage.attr("data-state", "still");
                showImage.attr("data-still", staticImg);
                showImage.attr("data-animate", animatedImg);
                showDiv.append(p);
                showDiv.append(showImage);
                $("#gif-view").prepend(showDiv);
    
            }
        });
    };
    
      //Submit button click event takes search term from form input, trims and pushes to topics array, displays button
        $("#addAnimal").on("click", function(event) {
            event.preventDefault();
            var newAnimal = $("#animalInput").val().trim();
            animalArray.push(newAnimal);
            console.log(newAnimal);
            console.log(animalArray);
            $("#animalInput").val("");
            renderButtons();
          });
    
      //Function iterates through topics array to display button with array values in "myButtons" section of HTML

      function renderButtons() {
        $("#buttons-view").empty();
        for (var i = 0; i < animalArray.length; i++) {
          var a = $("<button>");
          a.addClass("btn btn-primary");
          a.attr("id", "animal");
          a.attr("data-name", animalArray[i]);
          a.text(animalArray[i]);
          $("#buttons-view").append(a);
        }
      };
      
      renderButtons();
    
      //Click event on buttons executes displayAnimal function
      $(document).on("click", "#animal", displayAnimal);
    
      //Click event on gifs executes gifSwitch function
      $(document).on("click", ".animalGIF", gifSwitch);
    
      //Function accesses "data-state" attribute and depending on status, changes image source to "data-animate" or "data-still"
      function gifSwitch() {
           var state = $(this).attr("data-state");
          if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
      }
    }
    
    });