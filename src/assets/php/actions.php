<?php 
  session_start();

  header("Access-Control-Allow-Origin: *");
      // header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
      // header('Access-Control-Max-Age: 1000');
      // header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

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
    die;
  }

  if (isset($_GET["loginUser"]) && $_GET["loginUser"] == "loginUser") {

    $user_email = $_GET["user_email"];
    $user_password = $_GET["user_password"];

    $loginUserQuery = "SELECT user_email, user_name, user_password FROM users WHERE user_email = '$user_email' AND user_password = SHA2('$user_password', 512)";

    $loginUserQueryResult = @mysqli_query($dbc, $loginUserQuery);

    $loginUserQueryArray = mysqli_fetch_array($loginUserQueryResult, MYSQLI_ASSOC);

    echo json_encode($loginUserQueryArray);
    die;
  }

  if (isset($_GET["registerUser"]) && $_GET["registerUser"] == "registerUser") {
    $user_name = $_GET["user_name"];
    $user_email = $_GET["user_email"];
    $user_password = $_GET["user_password"];

    $userData = array(
      "user_name" => $user_name,
      "user_email" => $user_email,
      "user_password" => $user_password
    );

    $registerUserQuery = "INSERT INTO users (user_name, user_email, user_password, user_registration_date) VALUES ('$user_name', '$user_email', SHA2('$user_password', 512), NOW())";

    $registerUserQueryResult = @mysqli_query($dbc, $registerUserQuery);  

    echo json_encode(mysqli_error($dbc));
    die;
  }
?>