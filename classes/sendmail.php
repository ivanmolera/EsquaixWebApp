<?php

require_once "Mail.php";

$from = "info@guessandwine.com";
$to = "ivan.molera@gmail.com";
$subject = "Hi!";
$body = "Hi,\n\nHow are you?";

$host = "ssl://smtp.gmail.com";
$port = "465";
$username = "info@guessandwine.com";  //<> give errors
$password = "guessandwine123dd";

$headers = array ('From' => $from,
  'To' => $to,
  'Subject' => $subject);
$smtp = Mail::factory('smtp',
  array ('host' => $host,
    'port' => $port,
    'auth' => true,
    'username' => $username,
    'password' => $password));

$mail = $smtp->send($to, $headers, $body);

if (PEAR::isError($mail)) {
	echo("<p>" . $mail->getMessage() . "</p>");
} else {
	echo("<p>Message successfully sent!</p>");
}

?>  <!-- end of php tag-->