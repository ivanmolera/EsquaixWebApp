<?
// Faig l'include de la classe userAccess
require("../classes/userAccess.php");

$ip 		= @$_SERVER["REMOTE_ADDR"];

$temporadaId= $_POST["temporadaId"];
$rondaId 	= $_POST["rondaId"];
$grupId 	= $_POST["grupId"];
$jornadaId 	= $_POST["jornadaId"];

$jugador1 	= $_POST["localPartit"];
$jugador2 	= $_POST["visitantPartit"];

// Creo l'objecte userAccess
$userAccess = new userAccess();

if( @$userAccess->checkAuth() ) {
	// Faig l'include de la classe MySQL
	require("../classes/bdMysql.php");

	// Creo l'objecte
	$bdMysql = new bdMysql();

	// Connecto a la BD
	$bdMysql->Connecta();

	$dataPartit = NULL;
	$sqlPartit = "INSERT INTO PARTITS (PartitJornadaId, PartitJugadorLocalId, PartitJugadorVisitantId, PartitRasultatId, PartitDataInici, PartitDataFinal) VALUES (".$jornadaId.", ".$jugador1.", ".$jugador2.", NULL, NULL, NULL)";

    if(isset($_POST["diaPartit"])) {
		$dataPartit = $_POST["diaPartit"];

		if(isset($_POST["diaPartit"])) {
			$dataPartit = $dataPartit . " ".$_POST["horaPartit"].":00";
		}
		else {
			$dataPartit = $dataPartit . " 19:00:00";
		}

		$sqlPartit = "INSERT INTO PARTITS (PartitJornadaId, PartitJugadorLocalId, PartitJugadorVisitantId, PartitRasultatId, PartitDataInici, PartitDataFinal) VALUES (".$jornadaId.", ".$jugador1.", ".$jugador2.", NULL, '".$dataPartit."', '".$dataPartit."')";
	}

	$result = $bdMysql->Query($sqlPartit);
	
	// Recupero l'id del partit que acabo d'insertar
	$res = $bdMysql->aQuery("SELECT @@identity AS PartitId");
	$partitId = $res["PartitId"];

	$bdMysql->Query("DELETE FROM REL_GRUPS_JUGADORS WHERE GrupJugadorJugadorId = ".$jugador1. " AND GrupJugadorGrupId = ".$grupId);
	$bdMysql->Query("DELETE FROM REL_GRUPS_JUGADORS WHERE GrupJugadorJugadorId = ".$jugador2. " AND GrupJugadorGrupId = ".$grupId);

	$bdMysql->Query("INSERT INTO REL_GRUPS_JUGADORS (GrupJugadorJugadorId, GrupJugadorGrupId) VALUES (".$jugador1. ", ".$grupId.")");
	$bdMysql->Query("INSERT INTO REL_GRUPS_JUGADORS (GrupJugadorJugadorId, GrupJugadorGrupId) VALUES (".$jugador2. ", ".$grupId.")");

	$bdMysql->Query("INSERT INTO REL_JUGADORS_PARTITS_RESULTATS (JugadorPartitResultatJugadorId, JugadorPartitResultatPartitId) VALUES (".$jugador1.", ".$partitId.")");
	$bdMysql->Query("INSERT INTO REL_JUGADORS_PARTITS_RESULTATS (JugadorPartitResultatJugadorId, JugadorPartitResultatPartitId) VALUES (".$jugador2.", ".$partitId.")");

	Header( "Location: http://".$_SERVER['HTTP_HOST']."/admin/adminJornada.php?jornadaId=".$jornadaId."&grupId=".$grupId."&rondaId=".$rondaId."&temporadaId=".$temporadaId, true, 302);
}
else
{
	Header( "Location: http://".$_SERVER['HTTP_HOST']."/index.php" );
}
?>
