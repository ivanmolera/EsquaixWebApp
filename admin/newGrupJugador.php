<?
// Faig l'include de la classe userAccess
require("../classes/userAccess.php");

// Creo l'objecte userAccess
$userAccess = new userAccess();

// Comprovo si l'usuari esta autentificat
if( @$userAccess->checkAuth() ) {

	if( (isset($_POST["grupId"]) && $_POST["grupId"] != "") && (isset($_POST["jugadorId"]) && $_POST["jugadorId"] != "") ) {

		// Faig l'include de la classe MySQL
		require("../classes/bdMysql.php");

		// Creo l'objecte
		$bdMysql = new bdMysql();

		// Connecto a la BD
		$bdMysql->Connecta();

		$bdMysql->Query( "INSERT INTO REL_GRUPS_JUGADORS (GrupJugadorGrupId, GrupJugadorJugadorId) VALUES (".$_POST["grupId"].", ".$_POST["jugadorId"].")" );

		// Desconnecto de la BD
		$bdMysql->Desconnecta();
	}

	Header("Location: http://".$_SERVER['HTTP_HOST']."/admin/adminGrup.php?lligaId=".$_POST["lligaId"]."&temporadaId=".$_POST["temporadaId"]."&rondaId=".$_POST["rondaId"]."&grupId=".$_POST["grupId"], true, 302);
}
else
{
	Header( "Location: http://".$_SERVER['HTTP_HOST']."/index.php" );
}
?>