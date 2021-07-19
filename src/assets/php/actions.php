<?php 
  header("Access-Control-Allow-Origin: *");

  define('DATABASE_USER', "root");
  define('DATABASE_PASSWORD', "1234");
  define('DATABASE_HOST', "localhost");
  define('DATABASE_NAME', "todo");

  $dbc = @mysqli_connect(DATABASE_HOST, DATABASE_USER, DATABASE_PASSWORD, DATABASE_NAME) OR die("Couldn't Connect to MySQL" . mysqli_connect_error());

  mysqli_set_charset($dbc, "utf8");

  if (isset($_GET["validateEmail"]) && $_GET["validateEmail"] == "validateEmail") {

    $email = $_GET["email"];
    
    $validateEmailQuery = "SELECT user_id FROM users WHERE user_email = '$email'";

    $validateEmailQueryResult = @mysqli_query($dbc, $validateEmailQuery);

    $validateEmailQueryArray = mysqli_fetch_array($validateEmailQueryResult, MYSQLI_ASSOC);

    echo json_encode($validateEmailQueryArray);
  }

  if (isset($_GET["validateUsername"]) && $_GET["validateUsername"] == "validateUsername") {
    $username = $_GET["username"];

    $validateUsernameQuery = "SELECT user_id FROM users WHERE user_username = '$username'";

    $validateUsernameQueryResult = @mysqli_query($dbc, $validateUsernameQuery);

    $validateUsernameQueryArray = mysqli_fetch_array($validateUsernameQueryResult, MYSQLI_ASSOC);

    echo json_encode($validateUsernameQueryArray);
  }
?>