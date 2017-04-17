<?
// Faig l'include de la classe userAccess
require("classes/userAccess.php");

// Recullo els paràmetres que m'arriben del formulari de login
$email = $_POST['login'];
$pwd = $_POST['password'];
$ip = @$_SERVER["REMOTE_ADDR"] ;

// Creo l'objecte userAccess
$userAccess = new userAccess();

// Intento fer login
if( $userAccess->Login( $email, $pwd, $ip ) == TRUE )
{
	// Faig l'include de la classe MySQL
	require("classes/bdMysql.php");

	// Creo l'objecte
	$bdMysql = new bdMysql();

	// Connecto a la BD
	$bdMysql->Connecta();

	$dataacces = date("Y-m-d H:i:s");

	$result = $bdMysql->Query("UPDATE JUGADORS SET JugadorDataAcces = '$dataacces', JugadorIP = '".$ip."' WHERE JugadorEmail = '$email'");

	Header( "Location: index.php?msg=ok" );
}
else
{
	Header( "Location: index.php?msg=error" );
}
?>
