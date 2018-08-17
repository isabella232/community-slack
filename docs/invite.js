function validEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,})+$/;
  return regex.test(email);
}
$( document ).ready(function() {
  function lambdaURL() {
    var url = AWS_LAMBDA_PROD_URL;
    if (window.location.hash === "#dev") {
      url = AWS_LAMBDA_DEV_URL;
    }
    if (url === undefined) {
      throw("URL is undefined");
    }
    return url;
  }
  $.ajaxSetup({
    url: lambdaURL(),
    type: "POST",
    crossDomain: true,
    dataType: "json",
    contentType: "application/json",
    xhrFields: {
      withCredentials: true
    },
    success: function (response) {
      var resp = JSON.parse(response)
      if (resp.ok) {
        $( "#errorMessage" ).text('Now check your email!');
      }
      else if (resp.error == 'already_in_team') {
        $( "#errorMessage" ).html("You've already joined this team! Please log in at <a href=\"" + SLACK_TEAM_URL + "\">" + SLACK_TEAM_URL + "</a>");
      }
      else if (resp.error == 'already_invited') {
        $( "#errorMessage" ).html("You're already invited! Please check your email.");
      }
      else {
        $( "#errorMessage" ).text("Error submitting '" + resp.error + "'");
      }
    }
  });
  $( "#slackLoginLink" ).attr("href", SLACK_TEAM_URL);
  // email input form handler
  $( "#inputEmail" ).on( "focus", function() {
    $( "#inputEmail" ).attr( "style", "" )
    $( "#errorMessage" ).text( "" )
  });
  $( "#inputForm" ).submit(function( event ) {
    // prevent default action
    event.preventDefault();
    // get value from field
    var email = $( "#inputEmail" ).val()
    // check value is not empty
    if (email == '' || !validEmail(email) ) {
      $( "#inputEmail" ).attr( "style", "border: 1px solid #f00" );
      $( "#errorMessage" ).text( "This '" + email + "' doesn't look like a valid email, please try again...");
    }
    /*
     * TODO check value looks like an email address
     */
    else {
      // CORS REST call to to lambda service
      var json = {
        email : email
      }
      if (SLACK_CHANNEL_IDS != '') {
        json.channel = SLACK_CHANNEL_IDS
      }
      $( "#errorMessage" ).text('Sending...');
      $.ajax({
        data: JSON.stringify(json),
        error: function (xhr, errStatus) {
          console.log('ERROR:' + JSON.stringify(xhr));
          $( "#inputEmail" ).attr( "style", "border: 1px solid #f00" )
          $( "#errorMessage" ).text( "Error! '" + errStatus + "'")
        }
      });
    }
  });
});