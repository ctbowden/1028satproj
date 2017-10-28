// submit button click 
    $("#submit").on("click", function() {


      // variables from user form
      var searchTerms = $("#search-term").val().trim(); // trims off any extra spaces
      var numRecs = $("#number-records").val();
      var startYr = $("#start-year").val();
      var endYr = $("#end-year").val();

      // var searchTerms = "students";
      // var numRecs = "5";
      // var startYr = "1990";
      // var endYr = "2017";


      var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
      url += '?' + $.param({
        'api-key': "babba147adde41188b44821e6031ebab",
        'q': searchTerms,
        'begin_date': startYr+"0101",
        'end_date': endYr+"1231",
      });

    // console.log(url);

      $.ajax({
          url: url,
          method: "GET"
        })
        .done(function(response) {

          var results = response.response.docs;

          // console.log(results);

          for (var i = 0; i < numRecs; i++) {
            
            var articleDiv = $("<div class='item'>");

            var article = results[i];

            // console.log(article);
            // heading - title
            var title = article.headline.main;
            console.log(title);
            // p - byline
            var author = article.byline.original;
            console.log(author);
            // p - section name
            var section = article.section_name;
            console.log(section);
            // p - date
            var datePub = article.pub_date;
            console.log(datePub);
            // a tag - link
            var sourceLink = article.web_url;
            console.log(sourceLink);

            var headingElem = $("<h2>");
            
            var spanNum = $("<span>");
            spanNum.addClass("badge");
            spanNum.text(i+1);


            headingElem.text(title);
            headingElem.prepend(spanNum);

            var pAuthor = $("<p>");
            pAuthor.text(author);

            var pSection = $("<p>");
            pSection.text("Section: " + section);

            var pDatePub = $("<p>");
            pDatePub.text(datePub);

            var pLink = $("<a>");
            pLink.attr("href", sourceLink);
            pLink.text(sourceLink);


            articleDiv.append(headingElem);
            articleDiv.append(pAuthor);
            articleDiv.append(pSection);
            articleDiv.append(pDatePub);
            articleDiv.append(pLink);
            $("#info").append(articleDiv);


            // var p = $("<p>").text("Rating: " + rating);

            // var personImage = $("<img>");
            // personImage.attr("src", results[i].images.fixed_height.url);

            // gifDiv.prepend(p);
            // gifDiv.prepend(personImage);

            // $("#gifs-appear-here").prepend(gifDiv);
          }
        });
    });

     $("#clear").on("click", function() {

      $("#info").empty();

    });