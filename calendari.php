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

if( isset( $_COOKIE["userID_squash"] ) ) {
	$idUsuari = $_COOKIE["userID_squash"];
}
$editable = false;

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

if($lligaPerEquips) {

	// Faig el query
	$resultGrp = $bdMysql->Query(
	"SELECT GrupId, GrupDescripcio ".
	"FROM GRUPS ".
	"WHERE GrupRondaId = ".$rondaId." ".
	"ORDER BY GrupOrdre, GrupDescripcio");
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
			<h1><?=$lang['CALENDARI_TITOL']?></h1>
			<a href="index.php" data-icon="home"><?=$lang['MENU_HOME']?></a>
		</div><!-- /header -->

		<div data-role="content" class="jqm-content">

			<br>
			<ul data-role="listview" data-inset="true" data-icon="false">
				<li data-role="divider" data-theme="b"><?=$lliga["LligaNom"]?></li>
			    <li data-role="divider" data-theme="e"><?=$temporada["TemporadaDescripcio"]?></li>
			</ul>

			<div data-role="collapsible-set" data-theme="c" data-content-theme="d" data-collapsed-icon="arrow-r" data-expanded-icon="arrow-d">
			<?
			$contGrp = 0;

			// Miro quants grups tinc
			$numRows = mysql_num_rows($resultGrp);

			// Bucle grups
			while($rowGrp = mysql_fetch_array($resultGrp))
			{
				if($grupId != $rowGrp['GrupId']) {
					$grupId = $rowGrp['GrupId'];

					if($contGrp > 0) {
						echo "</ul>";
						echo "</div>";
					}

					// Si només tinc un grup, el mostro desplegat
					if($numRows == 1) {
						echo "<div data-role=\"collapsible\" data-collapsed=\"false\">";
					}
					else {
						echo "<div data-role=\"collapsible\" data-collapsed=\"true\">";
					}
					
					// Faig el query
					$result = $bdMysql->Query(
					"SELECT LligaPerEquips, GrupDescripcio, RondaNom, RondaDataInici, RondaDataFinal, JornadaId, JornadaDataInici, JornadaDataFinal, GrupRondaId ".
					"FROM JORNADES ".
					"JOIN GRUPS ON GrupId = JornadaGrupId ".
					"JOIN RONDES ON RondaId = GrupRondaId ".
					"JOIN TEMPORADES ON TemporadaId = RondaTemporadaId ".
					"JOIN LLIGUES ON LligaId = TemporadaLligaId ".
					"WHERE RondaId = ".$rondaId." ".
					"AND GrupId = ".$grupId." ".
					"ORDER BY GrupOrdre, GrupDescripcio, JornadaOrdre");
					?>
					<h3><?=$rowGrp["GrupDescripcio"]?></h3>
					<ul data-role="listview" data-divider-theme="d">
				<?
				}
				
//////// INI INFO ROW ////////



			$linia = "";
			$jornadaId=0;
			$cont=1;

			// Bucle jornades
			while($row = mysql_fetch_array($result))
			{
				$phpdate1 = strtotime( $row['JornadaDataInici'] );
				$phpdate2 = strtotime( $row['JornadaDataFinal'] );
				$dia1  = date("d/m/y", $phpdate1);
				$dia2  = date("d/m/y", $phpdate2);
				$hora  = date("H:i", $phpdate);

				$jornadaActual = false;
				if($phpdate1 <= strtotime('today') && $phpdate2 >= strtotime('today')) {
					$jornadaActual = true;
				}

				$str = "";
				if($jornadaId != $row['JornadaId']) {
					$str = $lang['JORNADA_TITOL']." ".$cont;
					?>
					<li data-role="list-divider" <?if($jornadaActual) echo "data-theme=\"e\"";?>><?if($jornadaActual) echo "<font color=red>";?><?=$lang['JORNADA_TITOL']?> <?=$cont?>&nbsp;<font size=2>(<b><?=$dia1?></b> al <b><?=$dia2?></b>)</font><?if($jornadaActual) echo "</font>";?></li>
					<?
					$cont++;
				}
				$jornadaId = $row['JornadaId'];
				
			?>
				

			<?
						if($row['LligaPerEquips'] == 1) {

							// Faig consulta per mirar els partits d'equip
							$result2 = $bdMysql->Query(
							"SELECT PartitId, WEEKDAY(PartitDataInici) AS dia, PartitDataInici, PartitJugadorLocalId, rel1.EquipJugadorEquipId AS id1, PartitJugadorVisitantId, rel2.EquipJugadorEquipId AS id2, ".
							"(SELECT EquipDescripcio FROM EQUIPS WHERE EquipId = rel1.EquipJugadorEquipId) AS Eq1, ".
							"(SELECT EquipDescripcio FROM EQUIPS WHERE EquipId = rel2.EquipJugadorEquipId) AS Eq2 ".
							"FROM PARTITS ".
							"JOIN JORNADES ON JornadaId = PartitJornadaId ".
							"JOIN REL_EQUIPS_JUGADORS AS rel1 ON (rel1.EquipJugadorJugadorId = PartitJugadorLocalId AND rel1.EquipJugadorGrupId = JornadaGrupId) ".
							"JOIN REL_EQUIPS_JUGADORS AS rel2 ON (rel2.EquipJugadorJugadorId = PartitJugadorVisitantId AND rel2.EquipJugadorGrupId = JornadaGrupId) ".
							"WHERE PartitJornadaId = ".$row['JornadaId']." ".
							"ORDER BY PartitDataInici, PartitId");

							$linia = "";

							while($row2 = mysql_fetch_array($result2)) {
								$phpdatehora = strtotime( $row2['PartitDataInici'] );

								if($row2['PartitDataInici'] != null) {
									$horaPartit = date("H:i", $phpdatehora);
									$horaPartit = " a les ".$horaPartit."h";
								}
								else {
									$horaPartit = "<i>Horari sense determinar</i>";
								}

								$diaStr = "";
								if($row2['dia'] != null) {
									switch($row2['dia']) {
										case 0: $diaStr = "Dilluns";
											break;
										case 1: $diaStr = "Dimarts";
											break;
										case 2: $diaStr = "Dimecres";
											break;
										case 3: $diaStr = "Dijous";
											break;
										case 4: $diaStr = "Divendres";
											break;
										case 5: $diaStr = "Dissabte";
											break;
										case 6: $diaStr = "Diumenge";
											break;
									}
								}

								$horaDia = $diaStr.$horaPartit;

								if($jornadaActual) {
									$str =  "<li>".
											"<a href=\"detallJornada.php?jornadaId=".$row['JornadaId']."\">".
											"<p><strong><font color=red>".$row2['Eq1']."</font></strong> - <strong><font color=red>".$row2['Eq2']."</font></strong></p>".
											"<p>".$horaDia."</p>".
											"</a>".
											"</li>";
								}
								else{
									$str =  "<li>".
											"<a href=\"detallJornada.php?jornadaId=".$row['JornadaId']."\">".
											"<p><strong>".$row2['Eq1']."</strong> - <strong>".$row2['Eq2']."</strong></p>".
											"<p>".$horaDia."</p>".
											"</a>".
											"</li>";
								}
								if($str != $linia) {
									echo $str;
									$linia = $str;
								}
							}

							mysql_free_result($result2);

						}

				
				
				
				
			}

			mysql_free_result($result);






//////// FI INFO ROW /////////
				
				$contGrp++;
			}

			mysql_free_result($resultGrp);
			?>
				 </ul>
			   </div>
			</div>

			<br>
			<a href="index.php" data-role="button" data-theme="b" data-rel="back"><?=$lang['TORNAR']?></a>

		</div><!-- /content -->

		<?php include 'includes/footer_menu.php';?>

	</div><!-- /page -->
	</body>
	</html>
<?
}
/////////////////////////////////////////////////////////////////////////////////////////
else {

	// Faig el query
	$result = $bdMysql->Query(
	"SELECT GrupId, GrupDescripcio ".
	"FROM GRUPS ".
	"WHERE GrupRondaId = ".$rondaId." ".
	"ORDER BY GrupOrdre, GrupDescripcio");
	?>
	<!DOCTYPE html>
	<html>
	<head>
		<?php include 'includes/header_includes.php';?>
	</head>
	<body>
	<div data-role="page" class="jqm-demos jqm-demos-index">

		<?php include 'includes/header_menu.php';?>

		<div data-role="header" data-theme="d">
			<a href="#" class="jqm-navmenu-link" data-icon="grid"><?=$lang['MENU']?></a>
			<h1><?=$lang['CALENDARI_TITOL']?></h1>
			<a href="index.php" data-icon="home"><?=$lang['MENU_HOME']?></a>
		</div><!-- /header -->

		<div data-role="content" class="jqm-content">

			<ul data-role="listview" data-inset="true" data-icon="false">
				<li data-role="divider" data-theme="b"><?=$lliga["LligaNom"]?></li>
			    <li data-role="divider" data-theme="e"><?=$temporada["TemporadaDescripcio"]?></li>
			    <li data-role="divider" data-theme="c"><?=$ronda["RondaNom"]?></li>
			</ul>
			
			<form name="formResultats" action="dao/saveResultats.php" method="POST" data-ajax="false">
			<input type="hidden" name="jornadaId" value="<?=$jornadaId?>">
			<input type="hidden" name="grupId" value="<?=$grupId?>">
			<input type="hidden" name="rondaId" value="<?=$rondaId?>">

			<div data-role="collapsible-set" data-theme="c" data-content-theme="d" data-collapsed-icon="arrow-r" data-expanded-icon="arrow-d">
			<?
			$cont = 0;

			// Bucle grups
			while($row = mysql_fetch_array($result))
			{
				if($grupId != $row['GrupId']) {
					$grupId = $row['GrupId'];

					if($cont > 0) {
						echo "</ul>";
						echo "</div>";
					}
					/*
					if($cont==0) {
						echo "<div data-role=\"collapsible\" data-collapsed=\"false\">";
					}
					else {
						echo "<div data-role=\"collapsible\" data-collapsed=\"true\">";
					}
					*/
					echo "<div data-role=\"collapsible\" data-collapsed=\"true\">";
					
					
					// Faig el query
					$partits = $bdMysql->Query(
					"SELECT PartitId, WEEKDAY(PartitDataInici) AS dia, PartitDataInici, ".
					"    PartitJugadorLocalId, ".
					"    (SELECT CONCAT(JugadorNom, ' ', JugadorCognom1) FROM JUGADORS WHERE JugadorId = PartitJugadorLocalId) AS Jug1, ".
					"    (SELECT JugadorLesionat FROM JUGADORS WHERE JugadorId = PartitJugadorLocalId) AS JugLesionat1, ".
					"    PartitJugadorVisitantId, ".
					"    (SELECT CONCAT(JugadorNom, ' ', JugadorCognom1) FROM JUGADORS WHERE JugadorId = PartitJugadorVisitantId) AS Jug2, ".
					"    (SELECT JugadorLesionat FROM JUGADORS WHERE JugadorId = PartitJugadorVisitantId) AS JugLesionat2, ".
					"    rel1.EquipJugadorEquipId AS EquipLocal, ".
					"    rel2.EquipJugadorEquipId AS EquipVisitant, ".
					"	 ResultatId, ".
					"	 COALESCE(ResultatLocal, 0) AS ResultatLocal, ".
					"	 COALESCE(ResultatVisitant, 0) AS ResultatVisitant, ".
					"	 JornadaId, GrupId, RondaId, JornadaOrdre ".
					"FROM PARTITS ".
					"JOIN JORNADES ON JornadaId = PartitJornadaId ".
					"JOIN GRUPS ON GrupId = JornadaGrupId ".
					"JOIN RONDES ON RondaId = GrupRondaId ".
					"LEFT JOIN RESULTATS ON PartitRasultatId = ResultatId ".
					"LEFT JOIN REL_EQUIPS_JUGADORS AS rel1 ON (rel1.EquipJugadorJugadorId = PartitJugadorLocalId AND rel1.EquipJugadorGrupId = JornadaGrupId) ".
					"LEFT JOIN REL_EQUIPS_JUGADORS AS rel2 ON (rel2.EquipJugadorJugadorId = PartitJugadorVisitantId AND rel2.EquipJugadorGrupId = JornadaGrupId) ".
					"WHERE RondaId = ".$rondaId." ".
					"AND GrupId = ".$grupId." ".
					"ORDER BY JornadaId, PartitDataInici, rel1.EquipJugadorOrdre");

					$resultats = $bdMysql->Query("SELECT ResultatId, ResultatLocal, ResultatVisitant FROM RESULTATS WHERE ResultatLligaId = ".$lligaId);
					
				?>
					<h3><?=$row["GrupDescripcio"]?></h3>
					<ul data-role="listview" data-divider-theme="d">
				<?
				}

//////// INI INFO ROW ////////

		$linia = "";
		$jornadaId=0;
		$cont=1;

		// Bucle partits
		while($partit = mysql_fetch_array($partits))
		{
			$str = "";
			if($jornadaId != $partit['JornadaId']) {
				$str = "<li data-role=\"list-divider\"><font size=2><b>".$lang['JORNADA_TITOL']." ".$cont."</b></font></li>";
				$cont++;
			}
			$jornadaId = $partit['JornadaId'];

			if($str != $linia) {
				echo $str;
				$linia = $str;
			}

							$diaStr = "";
							if($partit['dia'] != null) {
								switch($partit['dia']) {
									case 0: $diaStr = "Dilluns";
										break;
									case 1: $diaStr = "Dimarts";
										break;
									case 2: $diaStr = "Dimecres";
										break;
									case 3: $diaStr = "Dijous";
										break;
									case 4: $diaStr = "Divendres";
										break;
									case 5: $diaStr = "Dissabte";
										break;
									case 6: $diaStr = "Diumenge";
										break;
								}
							}

			// Línia partit
			$txtPartit = "<li><table border=0 width=\"100%\">";

			// Comprovo si l'usuari esta autentificat
			if( !@$userAccess->checkAuth() ) {
				$valor  = $partit['ResultatLocal']."&nbsp;-&nbsp;".$partit['ResultatVisitant'];
 				$locals = "<font size=2><a href=\"detallJugador.php?jugadorId=".$partit["PartitJugadorLocalId"]."\" data-transition=\"flip\" data-inline=\"true\">".$partit['Jug1']."</a></font>";
 				$visitants = "<font size=2><a href=\"detallJugador.php?jugadorId=".$partit["PartitJugadorVisitantId"]."\" data-transition=\"flip\" data-inline=\"true\">".$partit['Jug2']."</a></font>";

 				if($partit['PartitDataInici'] != null) {
					$phpdatapartit = strtotime( $partit['PartitDataInici'] );
					$diapartit  = date("d/m/Y", $phpdatapartit);

					$horaPartit = date("H:i", $phpdatapartit);
					$horaPartit = "a les <b>".$horaPartit."</b>h";

					$diaHora = $diaStr." ".$diapartit. " ".$horaPartit;
				}
				else {
					$diaHora = "[ Horari sense determinar ]";
				}
				$txtPartit = $txtPartit . "<tr><td colspan=\"3\" align=\"center\"><p>".$diaHora."</p></td></tr>";
			}
			else {
			
				if($idUsuari == $partit["PartitJugadorLocalId"] || $idUsuari == $partit["PartitJugadorVisitantId"] || @$userAccess->checkCapita() || @$userAccess->checkAdminLliga($lligaId)) {
					// Mostro el boto de guardar?
					$editable = true;
					
                    $phpdatapartit = strtotime( $partit['PartitDataInici']);
                    $diapartit  = date("d/m/Y", $phpdatapartit);

                    $phpdataronda = strtotime( $ronda['RondaDataInici']);
                    $diaronda  = date("d/m/Y", $phpdataronda);

                    if($phpdatapartit < $phpdataronda) $editable = false;


					////////////////////////// COMBO RESULTATS ////////////////////
					$valor = "<select name=\"select-".$partit['PartitId']."\" id=\"select-".$partit['PartitId']."\" data-mini=\"true\" data-inline=\"true\">";

					$valor = $valor . "<option value=\"0\">0 - 0</option>";

					// Bucle resultats
					while($res = mysql_fetch_array($resultats))
					{
						if($res['ResultatId'] == $partit['ResultatId']) {
							$valor = $valor . "    <option value=\"".$res['ResultatId']."\" selected=\"selected\">".$res['ResultatLocal']." - ".$res['ResultatVisitant']."</option>";
						}
						else {
							$valor = $valor . "    <option value=\"".$res['ResultatId']."\">".$res['ResultatLocal']." - ".$res['ResultatVisitant']."</option>";
						}
					}
					$valor = $valor . "</select>";

					mysql_data_seek( $resultats, 0 );
				}
				else {
					$valor  = $partit['ResultatLocal']."&nbsp;-&nbsp;".$partit['ResultatVisitant'];
				}

				$locals = "<font size=2><a href=\"detallJugador.php?jugadorId=".$partit["PartitJugadorLocalId"]."\" data-transition=\"flip\" data-inline=\"true\">".$partit['Jug1']."</a></font>";

				$visitants = "<font size=2><a href=\"detallJugador.php?jugadorId=".$partit["PartitJugadorVisitantId"]."\" data-transition=\"flip\" data-inline=\"true\">".$partit['Jug2']."</a></font>";

				if($partit['PartitDataInici'] != null) {
					$phpdatapartit = strtotime( $partit['PartitDataInici'] );
					$diapartit  = date("d/m/Y", $phpdatapartit);

					$horaPartit = date("H:i", $phpdatapartit);
					$horaPartit = "a les <b>".$horaPartit."</b>h";

					$diaHora = $diaStr." ".$diapartit. " ".$horaPartit;

					//$txtPartit = $txtPartit . "<tr><td colspan=\"3\" align=\"center\"><input type=\"date\" name=\"date-".$partit['PartitId']."\" id=\"date-".$partit['PartitId']."\" value=\"".$diapartit."\"></td></tr>";
				}
				else {
					//$txtPartit = $txtPartit . "<tr><td colspan=\"3\" align=\"center\"><input type=\"date\" name=\"date-".$partit['PartitId']."\" id=\"date-".$partit['PartitId']."\" value=\"\"></td></tr>";
					$diaHora = "[ Horari sense determinar ]";
				}
				$txtPartit = $txtPartit . "<tr><td colspan=\"3\" align=\"center\"><p>".$diaHora."</p></td></tr>";
			}

			$partitJugat = false;
			if($partit['ResultatLocal'] != 0 || $partit['ResultatVisitant'] != 0) {
				$partitJugat = true;
			}

			$txtPartit = $txtPartit . "<tr><td width=\"40%\">".$locals;
			if($partit['JugLesionat1'] == 1 && !$partitJugat) {
				$txtPartit = $txtPartit . " <img src=\"images/lesionat.png\" width=\"12\" height=\"12\" alt=\"Lesionat\" title=\"Lesionat\"/>";
			}
			$txtPartit = $txtPartit . "</td>";
			$txtPartit = $txtPartit . "<td width=\"20%\" align=\"center\">".$valor."</td>";
			$txtPartit = $txtPartit . "<td width=\"40%\">".$visitants;
			if($partit['JugLesionat2'] == 1 && !$partitJugat) {
				$txtPartit = $txtPartit . " <img src=\"images/lesionat.png\" width=\"12\" height=\"12\" alt=\"Lesionat\" title=\"Lesionat\"/>";
			}
			$txtPartit = $txtPartit . "</td></tr>".
					   				  "</table></li>";

			echo $txtPartit;
		}

		mysql_free_result($partits);
//////// FI INFO ROW ////////


				$cont++;
			}

			mysql_free_result($result);
			?>
				 </ul>
			   </div>
			</div>
			
			<br>
			
			<?
			if( @$userAccess->checkAuth() && $editable) {
			?>
			<input type="submit" value="<?=$lang['GUARDAR']?>" name="guardar" data-theme="e" />
			<?}?>
			<a href="index.php" data-role="button" data-theme="b" data-rel="back"><?=$lang['TORNAR']?></a>

			</form>

		</div><!-- /content -->

		<?php include 'includes/footer_menu.php';?>

	</div><!-- /page -->
	</body>
	</html>
<?
}
?>
