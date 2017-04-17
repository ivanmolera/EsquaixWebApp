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

if(isSet($_GET['rondaId']))
{
	$rondaId = $_GET['rondaId'];
}

$ronda = $bdMysql->aQuery("SELECT RondaId, RondaNom, RondaDataInici, RondaDataFinal FROM RONDES WHERE RondaId = ".$rondaId);
$temporada = $bdMysql->aQuery("SELECT TemporadaId, TemporadaLligaId, TemporadaNom, TemporadaDescripcio FROM TEMPORADES WHERE TemporadaId = ".$temporadaId);

$lligaPerEquips = false;

$result_aux = $bdMysql->aQuery(
"SELECT LligaPerEquips ".
"FROM LLIGUES ".
"WHERE LligaId = ".$lligaId);

$lligaPerEquips = $result_aux["LligaPerEquips"];

// Faig el query
if($lligaPerEquips) {
	$result = $bdMysql->Query(
	"SELECT GrupId, GrupDescripcio, EquipId, EquipDescripcio, ".
	"		COALESCE(SUM(JugadorPartitResultatPunts), 0) AS Punts, ".
	"       COALESCE(SUM(ResLocal.ResultatLocal), 0) - COALESCE(SUM(ResLocal.ResultatVisitant), 0) + COALESCE(SUM(ResVisitant.ResultatVisitant), 0) - COALESCE(SUM(ResVisitant.ResultatLocal), 0) AS SetsDiff, ".
    "   	COALESCE(SUM(ResLocal.ResultatLocal), 0) - COALESCE(SUM(ResLocal.ResultatVisitant), 0) AS SetsLocalDiff, ".
    "   	COALESCE(SUM(ResVisitant.ResultatVisitant), 0) - COALESCE(SUM(ResVisitant.ResultatLocal), 0) AS SetsContraDiff, ".
    "   	COALESCE(SUM(ResLocal.ResultatLocal), 0) AS SetsLocalFavor, ".
    "   	COALESCE(SUM(ResLocal.ResultatVisitant), 0) AS SetsLocalContra, ".
    "   	COALESCE(SUM(ResVisitant.ResultatVisitant), 0) AS SetsVisitantFavor, ".
    "   	COALESCE(SUM(ResVisitant.ResultatLocal), 0) AS SetsVisitantContra ".
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
	"    AND PartitJugadorVisitantId = JugadorId ".
	") ".
	"LEFT JOIN REL_JUGADORS_PARTITS_RESULTATS ON ( ".
	"    JugadorPartitResultatJugadorId = JugadorId ".
	"    AND JugadorPartitResultatPartitId = PartitId ".
	") ".
	"JOIN REL_EQUIPS_JUGADORS ON EquipJugadorJugadorId = JugadorId ".
	"JOIN EQUIPS ON EquipId = EquipJugadorEquipId ".	
	"JOIN JORNADES ON JornadaId = PartitJornadaId ".
	"JOIN GRUPS ON (GrupId = JornadaGrupId AND GrupId = EquipJugadorGrupId) ".
	"JOIN RONDES ON RondaId = GrupRondaId ".
	"JOIN TEMPORADES ON TemporadaId = RondaTemporadaId ".
	"JOIN LLIGUES ON LligaId = TemporadaLligaId ".
	"WHERE RondaId IN (".$rondaId.") ".
	"GROUP BY GrupId, GrupDescripcio, EquipId, EquipDescripcio ".
	"ORDER BY GrupId, 5 DESC, 6 DESC, 8 DESC, 7 DESC, EquipDescripcio");
}
else {
	$result = $bdMysql->Query(
	"SELECT GrupId, GrupDescripcio, JugadorId, JugadorNom, JugadorCognom1, JugadorCognom2, ".
	"		COALESCE(SUM(JugadorPartitResultatPunts), 0) AS Punts, ".
	"		COALESCE(SUM(ResLocal.ResultatLocal), 0) - COALESCE(SUM(ResLocal.ResultatVisitant), 0) + COALESCE(SUM(ResVisitant.ResultatVisitant), 0) - COALESCE(SUM(ResVisitant.ResultatLocal), 0) AS SetsDiff, ".
	"       COALESCE(SUM(ResLocal.ResultatLocal), 0) - COALESCE(SUM(ResLocal.ResultatVisitant), 0) AS SetsLocalDiff, ".
	"       COALESCE(SUM(ResVisitant.ResultatVisitant), 0) - COALESCE(SUM(ResVisitant.ResultatLocal), 0) AS SetsContraDiff, ".
	"       COALESCE(SUM(ResLocal.ResultatLocal), 0) AS SetsLocalFavor, ".
	"       COALESCE(SUM(ResLocal.ResultatVisitant), 0) AS SetsLocalContra, ".
    "	    COALESCE(SUM(ResVisitant.ResultatVisitant), 0) AS SetsVisitantFavor, ".
	"       COALESCE(SUM(ResVisitant.ResultatLocal), 0) AS SetsVisitantContra, ".
	"		COALESCE(SUM(JugadorLesionat), 0) AS JugadorLesio ".
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
	"JOIN TEMPORADES ON TemporadaId = RondaTemporadaId ".
	"JOIN LLIGUES ON LligaId = TemporadaLligaId ".
	"WHERE RondaId IN (".$rondaId.") ".
	"GROUP BY GrupId, GrupDescripcio, JugadorId, JugadorNom, JugadorCognom1, JugadorCognom2 ".
	"ORDER BY GrupId, 7 DESC, 8 DESC, 10 DESC, 9 DESC, JugadorCognom1, JugadorCognom2, JugadorNom");
}

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
		    <li data-role="divider" data-theme="c"><?=$ronda["RondaNom"]?></li>
		</ul>

		<div data-role="collapsible-set" data-theme="c" data-content-theme="d" data-collapsed-icon="arrow-r" data-expanded-icon="arrow-d">
		<?
		$conta = 1;
		$pos = 1;
		$expanded = true;
		$grupAnterior = null;
		$color = "eeeeee";
		// Bucle jornades
		while($row = mysql_fetch_array($result))
		{
			if($grupAnterior != $row["GrupId"]) {
				if($conta > 1) {
					echo "</tbody></table></div>";
				}
				$pos = 1;

				if($expanded) {
					echo "<div data-role=\"collapsible\" data-collapsed=\"false\" id=\"firstBlock\">";
					$expanded = false;
				}
				else {
					echo "<div data-role=\"collapsible\" data-collapsed=\"true\">";
				}
		?>
				<h3><?=$row["GrupDescripcio"]?></h3>

		<table data-mode="reflow" class="movie-list table-stroke">
         <thead>
           <tr>
             <?
	            echo "<td></td>";
	            echo "<th data-priority=\"1\"><b></b></th>";
             	if($lligaPerEquips) {
	            	echo "<th><b>Equip</b></th>";
             	}
             	else {
             		echo "<th><b>Jugador</b></th>";
             	}
           		echo "<th><b>PJ</b></th>";
           		echo "<th><b>PG</b></th>";
           		echo "<th><b>PP</b></th>";
           		echo "<th><b>SET</b></th>";
	            echo "<th><b>Pts</b></th>";
             ?>
           </tr>
         </thead>
         <tbody>
			<?
			}
			if($lligaPerEquips) {
				$equipId = $row['EquipId'];

				// Partits Guanyats/Perduts
				$partits = $bdMysql->Query("SELECT DISTINCT JugadorId, PartitJugadorLocalId, PartitJugadorVisitantId, ResultatPuntsTotal, ResultatPuntsLocal, ResultatPuntsVisitant, EquipJugadorEquipId ".
				"FROM PARTITS ".
				"JOIN REL_JUGADORS_PARTITS_RESULTATS ON JugadorPartitResultatPartitId = PartitId ".
				"JOIN RESULTATS ON ResultatId = JugadorPartitResultatResultatId ".
				"JOIN JUGADORS ON ( ".
				"	JugadorId = PartitJugadorLocalId ".
				"	OR JugadorId = PartitJugadorVisitantId ".
				") ".
				"JOIN REL_EQUIPS_JUGADORS ON EquipJugadorJugadorId = JugadorId ".
				"JOIN JORNADES ON JornadaId = PartitJornadaId ".
				"JOIN GRUPS ON GrupId = JornadaGrupId ".
				"JOIN RONDES ON RondaId = GrupRondaId ".
				"JOIN TEMPORADES ON TemporadaId = RondaTemporadaId ".
				"JOIN LLIGUES ON LligaId = TemporadaLligaId ".
				"WHERE RondaId IN (".$rondaId.") ".
				"AND EquipJugadorEquipId = ".$equipId." ".
				"AND EquipJugadorGrupId = ".$row['GrupId']);

				$jugats = 0;
				$guanyats = 0;
				$perduts = 0;
				$guanyats_per = 0;
				$perduts_per = 0;

				while($partit = mysql_fetch_array($partits))
				{
					$jugats++;
					$total = $partit['ResultatPuntsTotal'];

					if($partit['JugadorId'] == $partit['PartitJugadorLocalId']) {
						if($partit['ResultatPuntsLocal'] == $total) {
							$guanyats++;
						}
						else {
							$perduts++;
						}
					}
					else if($partit['JugadorId'] == $partit['PartitJugadorVisitantId']) {
						if($partit['ResultatPuntsVisitant'] == $total) {
							$guanyats++;
						}
						else {
							$perduts++;
						}
					}
				}

				$guanyats_per = ($jugats == 0) ? 0 : ($guanyats/$jugats) * 100;
				$guanyats_per = round($guanyats_per);
				$perduts_per  = ($jugats == 0) ? 0 : ($perduts/$jugats) * 100;
				$perduts_per  = round($perduts_per);

				$txt = $pos;
				$icon = "";
				if($conta == 1 && $pos == 1) {
					$icon = "<img src=\"images/medal_gold_1.png\" width=\"12\" height=\"12\"/>";
				}
				else if($conta == 2 && $pos == 2) {
					$icon = "<img src=\"images/medal_silver_1.png\" width=\"12\" height=\"12\"/>";
				}
				if($conta == 3 && $pos == 3) {
					$icon = "<img src=\"images/medal_bronze_1.png\" width=\"12\" height=\"12\"/>";
				}
				else if($conta > 2 && $pos < 3) {
					$txt = "<font color=green>".$pos."</font>";
					$icon = "<img src=\"images/handup.png\" width=\"12\" height=\"12\"/>";
				}

				$ultims = $bdMysql->aQuery(
				"SELECT COUNT(*) as num ".
				"FROM ( ".
				"	SELECT DISTINCT EquipJugadorEquipId ".
				"	FROM REL_EQUIPS_JUGADORS ".
				"	WHERE EquipJugadorGrupId = ".$row["GrupId"]. 
				") AS GRID");

				if($pos == $ultims["num"]) {
					$txt = "<font color=red>".$pos."</font>";
					$icon = "<img src=\"images/handdown.png\" width=\"12\" height=\"12\"/>";
				}
			?>
	           <tr>
            	 <td class="jugadors" style="width:12px"><?=$icon?></td>
            	 <th><?=$txt?></th>
        	     <td class="jugadors"><?=$row["EquipDescripcio"]?></td>
        	     <td class="jugadors"><?=$jugats?></td>
        	     <td class="jugadors"><?=$guanyats?></td>
        	     <td class="jugadors"><?=$perduts?></td>
    	         <td class="jugadors"><? echo ($row["SetsDiff"] > 0) ? "+".$row["SetsDiff"] : $row["SetsDiff"];?></td>
    	         <th class="title"><b><?=$row["Punts"]?></b></th>
	           </tr>
			<?
			}
			else {
				$jugadorId = $row['JugadorId'];

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
				"JOIN LLIGUES ON LligaId = TemporadaLligaId ".
				"WHERE RondaId IN (".$rondaId.") ".
				"AND JugadorPartitResultatJugadorId = ".$jugadorId." ".
				"AND JugadorId = ".$jugadorId);

				$jugats = 0;
				$guanyats = 0;
				$perduts = 0;
				$guanyats_per = 0;
				$perduts_per = 0;

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

				$guanyats_per = ($jugats == 0) ? 0 : ($guanyats/$jugats) * 100;
				$guanyats_per = round($guanyats_per);
				$perduts_per  = ($jugats == 0) ? 0 : ($perduts/$jugats) * 100;
				$perduts_per  = round($perduts_per);

				$txt = $pos;
				$icon = "";
				if($conta == 1 && $pos == 1) {
					$icon = "<img src=\"images/medal_gold_1.png\" width=\"12\" height=\"12\"/>";
				}
				else if($conta == 2 && $pos == 2) {
					$icon = "<img src=\"images/medal_silver_1.png\" width=\"12\" height=\"12\"/>";
				}
				if($conta == 3 && $pos == 3) {
					$icon = "<img src=\"images/medal_bronze_1.png\" width=\"12\" height=\"12\"/>";
				}
				else if($conta > 2 && $pos < 3) {
					$txt = "<font color=green>".$pos."</font>";
					$icon = "<img src=\"images/handup.png\" width=\"12\" height=\"12\"/>";
				}

				$ultims = $bdMysql->aQuery("SELECT COUNT(*) AS num FROM REL_GRUPS_JUGADORS WHERE GrupJugadorGrupId = ".$row["GrupId"]);
				if($pos > $ultims["num"]-2) {
					$txt = "<font color=red>".$pos."</font>";
					$icon = "<img src=\"images/handdown.png\" width=\"12\" height=\"12\"/>";
				}
			?>
	           <tr>
            	 <td class="jugadors" style="width:12px"><?=$icon?></td>
            	 <th><?=$txt?></th>
        	     <td class="jugadors"><a href="detallJugador.php?jugadorId=<?=$jugadorId?>" data-transition="flip" data-inline="true"><?=$row["JugadorNom"]?> <?=$row["JugadorCognom1"]?></a> <? if($row["JugadorLesio"] > 0) echo "<img src=\"images/lesionat.png\" width=\"10\" height=\"10\" alt=\"Lesionat\" title=\"Lesionat\"/>"; ?></td>
        	     <td class="jugadors"><?=$jugats?></td>
        	     <td class="jugadors"><?=$guanyats?></td>
        	     <td class="jugadors"><?=$perduts?></td>
        	     <td class="jugadors"><? echo ($row["SetsDiff"] > 0) ? "+".$row["SetsDiff"] : $row["SetsDiff"];?></td>
    	         <th class="title"><b><?=$row["Punts"]?></b></th>
	           </tr>
			<?
			}

			if($color == "eeeeee") {
				$color = "ffffff";
			}
			else {
				$color = "eeeeee";
			}

			$grupAnterior = $row["GrupId"];
			$conta++;
			$pos++;
		}
		echo "</tbody></table></div>";

		mysql_free_result($result);
		?>
		</div>
		
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
