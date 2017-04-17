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

	$dataInici 	= "NOW()";
	$dataFi 	= "NULL";

	if(isset($_POST["dataInici"]) && $_POST["dataInici"] != "") {
		$dataInici = "'".$_POST["dataInici"]."'";
	}

	if(isset($_POST["dataFi"]) && $_POST["dataFi"] != "") {
		$dataFi = "'".$_POST["dataFi"]."'";
	}

	$bdMysql->Query( "INSERT INTO RONDES (RondaNom, RondaTemporadaId, RondaDataInici, RondaDataFinal) VALUES ('".$_POST["nomRonda"]."', ".$_POST["temporadaId"].", ".$dataInici.", ".$dataFi.")" );

	// Desconnecto de la BD
	$bdMysql->Desconnecta();

	Header("Location: http://".$_SERVER['HTTP_HOST']."/admin/adminTemporada.php?lligaId=".$_POST["lligaId"]."&temporadaId=".$_POST["temporadaId"], true, 302);
}
else
{
	Header( "Location: http://".$_SERVER['HTTP_HOST']."/index.php" );
}
?>