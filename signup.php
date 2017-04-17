<?
// Faig l'include de la classe MySQL
require("classes/bdMysql.php");

// Faig l'include de la classe userAccess
require("classes/userAccess.php");

$userAccess = new userAccess();

// Creo l'objecte
$bdMysql = new bdMysql();

// Connecto a la BD
$bdMysql->Connecta();

$pwd 		= $_POST['password_r'];
$ip			= $_SERVER['REMOTE_ADDR'];
$email 		= $_POST['email'];


$usuaris = $bdMysql->Query("SELECT * FROM Usuaris WHERE UsuariEmail = '".$email."'");
$numUsuaris = mysql_num_rows($usuaris);


if($numUsuaris == 0) {
	$hash = $userAccess->hashPassword( $pwd );
	$result = $bdMysql->Query("INSERT INTO Usuaris (UsuariEmail, UsuariPassword, UsuariIP, UsuariDataAlta) VALUES ('$email','$hash', '$ip', now())");

	Header( "Location: inici.php?msg=login" );
}
else {
	Header( "Location: inici.php?msg=errsign" );
}

// Desconnecto de la BD
$bdMysql->Desconnecta();

?>