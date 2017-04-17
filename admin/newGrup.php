<?
// Faig l'include de la classe userAccess
require("../classes/userAccess.php");

// Creo l'objecte userAccess
$userAccess = new userAccess();

// Comprovo si l'usuari esta autentificat
if( @$userAccess->checkAuth() ) {
	// Faig l'include de la classe MySQL
	require("../classes/bdMysql.php");

	// Creo l'objecte
	$bdMysql = new bdMysql();

	// Connecto a la BD
	$bdMysql->Connecta();

	$bdMysql->Query( "INSERT INTO GRUPS (GrupRondaId, GrupDescripcio, GrupOrdre) VALUES (".$_POST["rondaId"].", '".$_POST["nomGrup"]."', ".$_POST["ordreGrup"].")" );

	// Desconnecto de la BD
	$bdMysql->Desconnecta();

	Header("Location: http://".$_SERVER['HTTP_HOST']."/admin/adminRonda.php?temporadaId=".$_POST["temporadaId"]."&rondaId=".$_POST["rondaId"], true, 302);
}
else
{
	Header( "Location: http://".$_SERVER['HTTP_HOST']."/index.php" );
}
?>