<?php include 'includes/common.php';?>
<?
// Faig l'include de la classe userAccess
require("classes/userAccess.php");

$userAccess = new userAccess();

// Faig l'include de la classe MySQL
require("classes/bdMysql.php");

// Creo l'objecte
$bdMysql = new bdMysql();

// Connecto a la BD
$bdMysql->Connecta();

$temporada = $bdMysql->aQuery("SELECT TemporadaId, TemporadaLligaId, TemporadaNom, TemporadaDescripcio FROM TEMPORADES WHERE TemporadaId = ".$temporadaId);

$rondes = $bdMysql->Query(
	"SELECT RondaId, GrupId ".
	"FROM GRUPS ".
	"JOIN RONDES ON RondaId = GrupRondaId ".
	"WHERE RondaTemporadaId = ".$temporadaId." ".
	"ORDER BY RondaId, GrupOrdre");

$ultimaronda = 0;

while($ronda = mysql_fetch_array($rondes))
{
	$rondaId = $ronda["RondaId"];
	$grupId = $ronda["GrupId"];
	
	if($ultimaronda != $rondaId) {
		$count = $bdMysql->aQuery(
		"SELECT COUNT(*) AS Jugadors ".
		"FROM ( ".
		"    SELECT * ".
		"    FROM JUGADORS ".
		"    JOIN REL_GRUPS_JUGADORS ON GrupJugadorJugadorId = JugadorId ".
		"    JOIN GRUPS ON GrupId = GrupJugadorGrupId ".
		"    WHERE GrupRondaId = ".$rondaId." ".
		"    GROUP BY GrupRondaId, JugadorId ".
		") AS GRID");

		$punts = $count["Jugadors"];
	}

	// Faig el query
	$jugadors = $bdMysql->Query(
	"SELECT JugadorId, JugadorNom, JugadorCognom1, JugadorCognom2, ".
	"		COALESCE(SUM(JugadorPartitResultatPunts), 0) AS Punts, ". 
	"		COALESCE(SUM(ResLocal.ResultatLocal), 0) - COALESCE(SUM(ResLocal.ResultatVisitant), 0) + COALESCE(SUM(ResVisitant.ResultatVisitant), 0) - COALESCE(SUM(ResVisitant.ResultatLocal), 0) AS SetsDiff, ".
	"       COALESCE(SUM(ResLocal.ResultatLocal), 0) - COALESCE(SUM(ResLocal.ResultatVisitant), 0) AS SetsLocalDiff, ".
	"       COALESCE(SUM(ResVisitant.ResultatVisitant), 0) - COALESCE(SUM(ResVisitant.ResultatLocal), 0) AS SetsContraDiff, ".
	"       COALESCE(SUM(ResLocal.ResultatLocal), 0) AS SetsLocalFavor, ".
	"       COALESCE(SUM(ResLocal.ResultatVisitant), 0) AS SetsLocalContra, ".
    "	    COALESCE(SUM(ResVisitant.ResultatVisitant), 0) AS SetsVisitantFavor, ".
	"       COALESCE(SUM(ResVisitant.ResultatLocal), 0) AS SetsVisitantContra ".
	"FROM JUGADORS ".
	"JOIN PARTITS ON ( ".
	"    PartitJugadorLocalId = JugadorId ".
	"    OR PartitJugadorVisitantId = JugadorId ".
	") ".
	"LEFT JOIN RESULTATS AS ResLocal ON ( ".
	"    ResLocal.ResultatId = PartitRasultatId ".
	"    AND PartitJugadorLocalId = JugadorId ".
	") ".
	"LEFT JOIN RESULTATS AS ResVisitant ON ( ".
	"    ResVisitant.ResultatId = PartitRasultatId ".
	"    AND PartitJugadorVisitantId = JugadorId  ".
	") ".
	"LEFT JOIN REL_JUGADORS_PARTITS_RESULTATS ON ( ".
	"    JugadorPartitResultatJugadorId = JugadorId ".
	"    AND JugadorPartitResultatPartitId = PartitId ".
	") ".
	"JOIN JORNADES ON JornadaId = PartitJornadaId ".
	"JOIN GRUPS ON GrupId = JornadaGrupId ".
	"JOIN RONDES ON RondaId = GrupRondaId ".
	"WHERE RondaId = ".$rondaId." ".
	"AND GrupId = ".$grupId." ".
	"AND RondaDataFinal < NOW() ".
	"GROUP BY JugadorId, JugadorNom, JugadorCognom1, JugadorCognom2 ".
	"ORDER BY 5 DESC, 6 DESC, 7 DESC, 8 DESC, 9 DESC, 11 DESC, JugadorCognom1, JugadorCognom2, JugadorNom");
	
	
	while($jugador = mysql_fetch_array($jugadors))
	{
		if($classificacio[$jugador["JugadorId"]] != null) {
			$classificacio[$jugador["JugadorId"]] = $classificacio[$jugador["JugadorId"]] + $punts;
		}
		else {
			$classificacio[$jugador["JugadorId"]] = $punts;
		}

		$punts--;
	}
	
	$ultimaronda = $rondaId;
}

arsort($classificacio);
?>
<!DOCTYPE html>
<html>
<head>
	<?php include 'includes/header_includes.php';?>
</head>
<body>
<div data-role="page" class="jqm-demos jqm-demos-index">

	<?php include 'includes/header_menu.php';?>

	<div data-role="header" data-theme="d" data-position="fixed" data-fullscreen="true">
		<a href="#" class="jqm-navmenu-link" data-icon="grid"><?=$lang['MENU']?></a>
        <h1><?=$lang['CLASS_TITOL']?></h1>
		<a href="index.php" data-icon="home"><?=$lang['MENU_HOME']?></a>
	</div><!-- /header -->

	<div data-role="content" class="jqm-content">

		<br>
		<ul data-role="listview" data-inset="true" data-icon="false">
			<li data-role="divider" data-theme="b"><?=$lliga["LligaNom"]?></li>
		    <li data-role="divider" data-theme="e"><?=$temporada["TemporadaDescripcio"]?></li>
		</ul>

		<table data-role="table" data-mode="columntoggle" class="movie-list ui-body-d ui-shadow table-stripe ui-responsive" data-column-btn-theme="b" data-column-btn-text="<?=$lang['RKG_COL']?>">
         <thead>
           <tr class="ui-bar-d">
             <?
	            echo "<th data-priority=\"1\"><b>".$lang['RKG_POSICIO']."</b></th>";
          		echo "<th><b>".$lang['RKG_JUGADOR']."</b></th>";
          		echo "<th data-priority=\"2\"><b>".$lang['RKG_JUGATS']."</b></th>";
           		echo "<th data-priority=\"3\"><b>".$lang['RKG_GUANYATS']."</b></th>";
           		echo "<th data-priority=\"4\"><b>".$lang['RKG_PERDUTS']."</b></th>";
	            echo "<th data-priority=\"5\"><b>".$lang['RKG_SUM']."</b></th>";
             ?>
           </tr>
         </thead>
         <tbody>
		<?
		$pos = 1;
		$keys = array_keys($classificacio);

		// Bucle jornades
		for($i=0;$i<count($keys);$i++)
		{
		?>
         
			<?
				$jugadorId = $keys[$i];
				
				$row = $bdMysql->aQuery("SELECT JugadorId, JugadorNom, JugadorCognom1, JugadorCognom2 FROM JUGADORS WHERE JugadorId = ".$jugadorId);

				// Partits Guanyats/Perduts
				$partits = $bdMysql->Query("SELECT PartitJugadorLocalId, PartitJugadorVisitantId, ResultatPuntsTotal, ResultatPuntsLocal, ResultatPuntsVisitant ".
				"FROM PARTITS ".
				"JOIN REL_JUGADORS_PARTITS_RESULTATS ON JugadorPartitResultatPartitId = PartitId ".
				"JOIN RESULTATS ON ResultatId = JugadorPartitResultatResultatId ".
				"JOIN JUGADORS ON ( ".
				"	JugadorId = PartitJugadorLocalId ".
				"	OR JugadorId = PartitJugadorVisitantId ".
				") ".
				"JOIN JORNADES ON JornadaId = PartitJornadaId ".
				"JOIN GRUPS ON GrupId = JornadaGrupId ".
				"JOIN RONDES ON RondaId = GrupRondaId ".
				"JOIN TEMPORADES ON TemporadaId = RondaTemporadaId ".
				"WHERE TemporadaId = ".$temporadaId." ".
				"AND JugadorPartitResultatJugadorId = ".$jugadorId." ".
				"AND JugadorId = ".$jugadorId);

				$jugats = 0;
				$guanyats = 0;
				$perduts = 0;

				while($partit = mysql_fetch_array($partits))
				{
					$jugats++;
					$total = $partit['ResultatPuntsTotal'];

					if($jugadorId == $partit['PartitJugadorLocalId']) {
						if($partit['ResultatPuntsLocal'] >= ($total/2)) {
							$guanyats++;
						}
						else {
							$perduts++;
						}
					}
					else if($jugadorId == $partit['PartitJugadorVisitantId']) {
						if($partit['ResultatPuntsVisitant'] >= ($total/2)) {
							$guanyats++;
						}
						else {
							$perduts++;
						}
					}
				}
			?>
	           <tr>
            	 <th><?=$pos?></th>
        	     <td class="jugadors"><a href="detallJugador.php?jugadorId=<?=$jugadorId?>" data-transition="flip" data-inline="true"><?=$row["JugadorNom"]?> <?=$row["JugadorCognom1"]?></a></td>
        	     <td class="jugadors"><?=$jugats?></td>
        	     <td class="jugadors"><?=$guanyats?></td>
        	     <td class="jugadors"><?=$perduts?></td>
    	         <td class="jugadors"><b><?=$classificacio[$keys[$i]]?></b></td>
	           </tr>
			<?
			$pos++;
		}
		?>
		 </tbody>
		</table>

		<br>
		<a href="index.php" data-role="button" data-theme="b" data-rel="back"><?=$lang['TORNAR']?></a>

	</div><!-- /content -->

	<script>
    	$('#firstBlock').trigger('expand');
	</script>

	<?php include 'includes/footer_menu.php';?>

</div><!-- /page -->
</body>
</html>
