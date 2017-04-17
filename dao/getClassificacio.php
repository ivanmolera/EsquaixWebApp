<?
// Faig l'include de la classe MySQL
require("../classes/bdMysql.php");

// Creo l'objecte
$bdMysql = new bdMysql();

// Connecto a la BD
$bdMysql->Connecta();

//////////////////////////
$ph = fopen("php://input", "rb");
while (!feof($ph))
{
	$post .= fread($ph, 4096);
}
fclose($ph);

$params = json_decode($post, true);
 
//var_dump($params);
//$params = var_export($params, true);

$lligaId = $params['lligaId'];
$grupId = $params['grupId'];
////////////////////////////

if(isset($_GET["lligaId"])) {
	$lligaId = $_GET["lligaId"];
}

if(isset($_GET["grupId"])) {
	$grupId = $_GET["grupId"];
}

$lligaPerEquips = false;

$result_aux = $bdMysql->aQuery(
"SELECT LligaPerEquips ".
"FROM LLIGUES ".
"WHERE LligaId = ".$lligaId);

$lligaPerEquips = $result_aux["LligaPerEquips"];

// Faig el query
if($lligaPerEquips) {
	$query = "SELECT GrupId, GrupDescripcio, EquipId, EquipDescripcio, COALESCE(SUM(JugadorPartitResultatPunts), 0) AS Punts ".
	"FROM JUGADORS ".
	"JOIN PARTITS ON ( ".
	"    PartitJugadorLocalId = JugadorId ".
	"    OR PartitJugadorVisitantId = JugadorId ".
	") ".
	"LEFT JOIN REL_JUGADORS_PARTITS_RESULTATS ON ( ".
	"    JugadorPartitResultatJugadorId = JugadorId ".
	"    AND JugadorPartitResultatPartitId = PartitId ".
	") ".
	"JOIN REL_EQUIPS_JUGADORS ON EquipJugadorJugadorId = JugadorId ".
	"JOIN EQUIPS ON EquipId = EquipJugadorEquipId ".
	"JOIN JORNADES ON JornadaId = PartitJornadaId ".
	"JOIN RONDES ON RondaId = JornadaRondaId ".
	"JOIN GRUPS ON RondaGrupId = GrupId ".
	"JOIN LLIGUES ON LligaId = GrupLligaId ".
	"WHERE LligaId = ".$lligaId." ".
	"AND GrupId = ".$grupId." ".
	"GROUP BY GrupId, GrupDescripcio, EquipId, EquipDescripcio ".
	"ORDER BY GrupId, 5 DESC, EquipDescripcio";
}
else {
	$query = "SELECT GrupId, GrupDescripcio, JugadorId, JugadorNom, JugadorCognom1, JugadorCognom2, COALESCE(SUM(JugadorPartitResultatPunts), 0) AS Punts ".
	"FROM JUGADORS ".
	"JOIN PARTITS ON ( ".
	"    PartitJugadorLocalId = JugadorId ".
	"    OR PartitJugadorVisitantId = JugadorId ".
	") ".
	"LEFT JOIN REL_JUGADORS_PARTITS_RESULTATS ON ( ".
	"    JugadorPartitResultatJugadorId = JugadorId ".
	"    AND JugadorPartitResultatPartitId = PartitId ".
	") ".
	"JOIN REL_EQUIPS_JUGADORS ON EquipJugadorJugadorId = JugadorId ".
	"JOIN EQUIPS ON EquipId = EquipJugadorEquipId ".
	"JOIN JORNADES ON JornadaId = PartitJornadaId ".
	"JOIN RONDES ON RondaId = JornadaRondaId ".
	"JOIN GRUPS ON RondaGrupId = GrupId ".
	"JOIN LLIGUES ON LligaId = GrupLligaId ".
	"WHERE LligaId = ".$lligaId." ".
	"AND GrupId = ".$grupId." ".
	"GROUP BY GrupId, GrupDescripcio, JugadorId, JugadorNom, JugadorCognom1, JugadorCognom2 ".
	"ORDER BY GrupId, 7 DESC, JugadorCognom1, JugadorCognom2, JugadorNom";
}

$result = $bdMysql->Query($query);
if($result != null) {
	$nbrows = mysql_num_rows($result);
}

if($nbrows>0){
	while($row = mysql_fetch_array($result, MYSQL_ASSOC))
	{
		$row_set[] = $row;
	}
	$jsonresult = json_encode($row_set);

	echo "{".
  		 "	\"success\": 1,".
		 "	\"msg\": \"\",".
  		 "	\"data\": ".$jsonresult.
		 "}";
} else {
		echo "{".
  		 "	\"success\": 0,".
		 "	\"msg\": \"No hi ha resultats\",".
  		 "	\"data\": {".
		 "	}".
		 "}";
}

//$bdMysql->Desconnecta();
?>
