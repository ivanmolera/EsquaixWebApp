<?
// Faig l'include de la classe userAccess
require("../classes/userAccess.php");

$ip 		= @$_SERVER["REMOTE_ADDR"];
$jornadaId 	= $_POST["jornadaId"];
$grupId 	= $_POST["grupId"];
$rondaId 	= $_POST["rondaId"];

// Creo l'objecte userAccess
$userAccess = new userAccess();

if( @$userAccess->checkAuth() ) {
	// Faig l'include de la classe MySQL
	require("../classes/bdMysql.php");

	// Creo l'objecte
	$bdMysql = new bdMysql();

	// Connecto a la BD
	$bdMysql->Connecta();

	foreach($_POST as $key => $value) {
	    if (strpos($key, 'select-') === 0) {
    		
    			$partitId = substr($key, strpos($key, '-')+1, strlen($key));
    			
    			$local    = $_POST["local-".$partitId];
    			$visitant = $_POST["visitant-".$partitId];
    			$dataPartit = NULL;
    			if(isset($_POST["date-".$partitId])) {
	    			$dataPartit = $_POST["date-".$partitId];
	    			$dataPartit = $dataPartit . " 19:00:00";
	    		}

    			$query1 = "UPDATE PARTITS SET PartitJugadorLocalId = ".$local.",  PartitJugadorVisitantId = ".$visitant." WHERE PartitId = ".$partitId;
				$bdMysql->Query($query1);

			if($value != 0) {
    			$query2 = "UPDATE PARTITS SET PartitRasultatId = ".$value." WHERE PartitId = ".$partitId;
				$bdMysql->Query($query2);

				$jugadors = $bdMysql->aQuery("SELECT PartitJugadorLocalId, PartitJugadorVisitantId FROM PARTITS WHERE PartitId = ".$partitId);
				$resultat = $bdMysql->aQuery("SELECT ResultatLocal, ResultatVisitant, ResultatPuntsLocal, ResultatPuntsVisitant FROM RESULTATS WHERE ResultatId = ".$value);

				$bdMysql->Query("DELETE FROM REL_JUGADORS_PARTITS_RESULTATS WHERE JugadorPartitResultatPartitId = ".$partitId);

				$bdMysql->Query("INSERT INTO REL_JUGADORS_PARTITS_RESULTATS (JugadorPartitResultatJugadorId, JugadorPartitResultatPartitId, JugadorPartitResultatResultatId, JugadorPartitResultatPunts) VALUES (".$jugadors["PartitJugadorLocalId"].", ".$partitId.", ".$value.", ".$resultat["ResultatPuntsLocal"].")");
				$bdMysql->Query("INSERT INTO REL_JUGADORS_PARTITS_RESULTATS (JugadorPartitResultatJugadorId, JugadorPartitResultatPartitId, JugadorPartitResultatResultatId, JugadorPartitResultatPunts) VALUES (".$jugadors["PartitJugadorVisitantId"].", ".$partitId.", ".$value.", ".$resultat["ResultatPuntsVisitant"].")");
			}
			else {
    			$query2 = "UPDATE PARTITS SET PartitRasultatId = NULL WHERE PartitId = ".$partitId;
				$bdMysql->Query($query2);

				$bdMysql->Query("DELETE FROM REL_JUGADORS_PARTITS_RESULTATS WHERE JugadorPartitResultatPartitId = ".$partitId);
			}
    	}
	}
	if($jornadaId != null && $jornadaId != '') {
		Header( "Location: http://".$_SERVER['HTTP_HOST']."/detallJornada.php?jornadaId=".$jornadaId, true, 302);
	}
	else {
		Header( "Location: http://".$_SERVER['HTTP_HOST']."/calendari.php?rondaId=".$rondaId, true, 302);
	}
	//Header( "Location: ../detallJornada.php?jornadaId=".$jornadaId );
	//http_redirect("../detallJornada.php?jornadaId=".$jornadaId);
}
else
{
	Header( "Location: http://".$_SERVER['HTTP_HOST']."/index.php" );
}
?>
