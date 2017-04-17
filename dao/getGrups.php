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

if(isset($params['lligaId'])) {
	$lligaId = $params['lligaId'];
}
////////////////////////////

if(isset($_GET["lligaId"])) {
	$lligaId = $_GET["lligaId"];
}

$lligaPerEquips = false;

$query = "SELECT GrupId, GrupDescripcio ".
	"FROM GRUPS ".
	"JOIN LLIGUES ON LligaId = GrupLligaId ".
	"WHERE LligaId = ".$lligaId." ".
	"ORDER BY GrupDescripcio";

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

$bdMysql->Desconnecta();
?>
