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

$lligaPerEquips = false;

$result_aux = $bdMysql->aQuery(
"SELECT LligaPerEquips ".
"FROM LLIGUES ".
"WHERE LligaId = ".$lligaId);

$lligaPerEquips = $result_aux["LligaPerEquips"];

$jornadaId = $_GET["jornadaId"];

$temporada = $bdMysql->aQuery("SELECT TemporadaId, TemporadaLligaId, TemporadaNom, TemporadaDescripcio FROM TEMPORADES WHERE TemporadaId = ".$temporadaId);
$jornada = $bdMysql->aQuery("SELECT JornadaOrdre FROM JORNADES WHERE JornadaId = ".$jornadaId);

if($lligaPerEquips) {
// Faig el query
$result = $bdMysql->Query(
"SELECT PartitId, WEEKDAY(PartitDataInici) AS dia, PartitDataInici, ".
"    PartitJugadorLocalId, ".
"    (SELECT CONCAT(JugadorNom, ' ', JugadorCognom1) FROM JUGADORS WHERE JugadorId = PartitJugadorLocalId) AS Jug1, ".
"    PartitJugadorVisitantId, ".
"    (SELECT CONCAT(JugadorNom, ' ', JugadorCognom1) FROM JUGADORS WHERE JugadorId = PartitJugadorVisitantId) AS Jug2, ".
"    rel1.EquipJugadorEquipId AS EquipLocal, ".
"    rel2.EquipJugadorEquipId AS EquipVisitant, ".
"    (SELECT EquipDescripcio FROM EQUIPS WHERE EquipId = rel1.EquipJugadorEquipId) AS Eq1, ".
"    (SELECT EquipDescripcio FROM EQUIPS WHERE EquipId = rel2.EquipJugadorEquipId) AS Eq2, ".
"	 ResultatId, ".
"	 COALESCE(ResultatLocal, 0) AS ResultatLocal, ".
"	 COALESCE(ResultatVisitant, 0) AS ResultatVisitant, ".
"	 JornadaGrupId ".
"FROM PARTITS ".
"JOIN JORNADES ON JornadaId = PartitJornadaId ".
"LEFT JOIN RESULTATS ON PartitRasultatId = ResultatId ".
"LEFT JOIN REL_EQUIPS_JUGADORS AS rel1 ON (rel1.EquipJugadorJugadorId = PartitJugadorLocalId AND rel1.EquipJugadorGrupId = JornadaGrupId) ".
"LEFT JOIN REL_EQUIPS_JUGADORS AS rel2 ON (rel2.EquipJugadorJugadorId = PartitJugadorVisitantId AND rel2.EquipJugadorGrupId = JornadaGrupId) ".
"WHERE PartitJornadaId = ".$jornadaId." ".
"ORDER BY Eq1, Eq2, rel1.EquipJugadorOrdre");

$resultats = $bdMysql->Query("SELECT ResultatId, ResultatLocal, ResultatVisitant FROM RESULTATS WHERE ResultatLligaId = ".$lligaId);
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
        <h1><?=$lang['JORNADA_TITOL']?></h1>
		<a href="index.php" data-icon="home"><?=$lang['MENU_HOME']?></a>
	</div><!-- /header -->

	<div data-role="content" class="jqm-content">

		<br>
		<ul data-role="listview" data-inset="true" data-icon="false">
			<li data-role="divider" data-theme="b"><?=$lliga["LligaNom"]?></li>
		    <li data-role="divider" data-theme="e"><?=$temporada["TemporadaDescripcio"]?></li>
		    <li data-role="divider" data-theme="c"><?=$lang['JORNADA_TITOL']?> <?=$jornada["JornadaOrdre"]?></li>
		</ul>

		<form name="formResultats" action="dao/saveResultats.php" method="POST" data-ajax="false">
			<input type="hidden" name="jornadaId" value="<?=$jornadaId?>">

		<ul data-role="listview" data-inset="true" data-divider-theme="d">
		<?
		$mostraBotoGuardar = false;
		$linia = "";
		// Bucle partits
		while($partit = mysql_fetch_array($result))
		{
			$str = "<li data-role=\"list-divider\"><font size=2><b>".$partit['Eq1']."</b></font> <font size=2>&nbsp;-&nbsp;</font> <font size=2><b>".$partit['Eq2']."</b></font></li>";

			if($str != $linia) {
				echo $str;
				$linia = $str;
			}

			// Comprovo si l'usuari esta autentificat
			if( !@$userAccess->checkAuth() ) {
				$valor  = $partit['ResultatLocal']."&nbsp;-&nbsp;".$partit['ResultatVisitant'];
				
				if($partit["PartitJugadorLocalId"] > 0) {
	 				$locals = "<font size=2><a href=\"detallJugador.php?jugadorId=".$partit["PartitJugadorLocalId"]."\" data-transition=\"flip\" data-inline=\"true\">".$partit['Jug1']."</a></font>";
	 			}
	 			else {
 					$locals = "<font size=2>".$partit['Jug1']."</font>";
	 			}
 				
 				if($partit["PartitJugadorVisitantId"] > 0) {
 					$visitants = "<font size=2><a href=\"detallJugador.php?jugadorId=".$partit["PartitJugadorVisitantId"]."\" data-transition=\"flip\" data-inline=\"true\">".$partit['Jug2']."</a></font>";
 				}
 				else {
 					$visitants = "<font size=2>".$partit['Jug2']."</font>";
 				}
			}
			else {
				if(@$userAccess->checkCapitaEquip($partit["JornadaGrupId"], $partit['EquipLocal']) || @$userAccess->checkCapitaEquip($partit["JornadaGrupId"], $partit['EquipVisitant']) || @$userAccess->checkCapita()) {
					$mostraBotoGuardar = true;
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

					if($partit["EquipLocal"] != null && (@$userAccess->checkCapitaEquip($partit["JornadaGrupId"], $partit['EquipLocal']) || @$userAccess->checkCapita())) {
						////////////////////////// COMBO LOCALS ////////////////////
						$jugadorsLocals    = $bdMysql->Query("SELECT JugadorId, CONCAT(JugadorNom, ' ', JugadorCognom1) AS JugadorNom FROM JUGADORS JOIN REL_EQUIPS_JUGADORS ON EquipJugadorJugadorId = JugadorId WHERE EquipJugadorEquipId = ".$partit["EquipLocal"]." AND EquipJugadorGrupId = ".$partit["JornadaGrupId"]." ORDER BY EquipJugadorOrdre");

						$locals = "<select name=\"local-".$partit['PartitId']."\" id=\"local-".$partit['PartitId']."\" data-mini=\"true\" data-inline=\"true\">";

						// Bucle resultats
						while($local = mysql_fetch_array($jugadorsLocals))
						{
							if($local['JugadorId'] == $partit['PartitJugadorLocalId']) {
								$locals = $locals . "    <option value=\"".$local['JugadorId']."\" selected=\"selected\">".$local['JugadorNom']."</option>";
							}
							else {
								$locals = $locals . "    <option value=\"".$local['JugadorId']."\">".$local['JugadorNom']."</option>";
							}
						}
						$locals = $locals . "</select>";

						mysql_data_seek( $jugadorsLocals, 0 );
					}
					else {
						$locals = "<select name=\"local-".$partit['PartitId']."\" id=\"local-".$partit['PartitId']."\" data-mini=\"true\" data-inline=\"true\">";
						$locals = $locals . "    <option value=\"".$partit['PartitJugadorLocalId']."\" selected=\"selected\">".$partit['Jug1']."</option>";
						$locals = $locals . "</select>";
					}

					if($partit["EquipVisitant"] != null && (@$userAccess->checkCapitaEquip($partit["JornadaGrupId"], $partit['EquipVisitant']) || @$userAccess->checkCapita())) {
						////////////////////////// COMBO VISITANTS ////////////////////
						$jugadorsVisitants = $bdMysql->Query("SELECT JugadorId, CONCAT(JugadorNom, ' ', JugadorCognom1) AS JugadorNom FROM JUGADORS JOIN REL_EQUIPS_JUGADORS ON EquipJugadorJugadorId = JugadorId WHERE EquipJugadorEquipId = ".$partit["EquipVisitant"]." AND EquipJugadorGrupId = ".$partit["JornadaGrupId"]." ORDER BY EquipJugadorOrdre");

						$visitants = "<select name=\"visitant-".$partit['PartitId']."\" id=\"visitant-".$partit['PartitId']."\" data-mini=\"true\" data-inline=\"true\">";

						// Bucle resultats
						while($visitant = mysql_fetch_array($jugadorsVisitants))
						{
							if($visitant['JugadorId'] == $partit['PartitJugadorVisitantId']) {
								$visitants = $visitants . "    <option value=\"".$visitant['JugadorId']."\" selected=\"selected\">".$visitant['JugadorNom']."</option>";
							}
							else {
								$visitants = $visitants . "    <option value=\"".$visitant['JugadorId']."\">".$visitant['JugadorNom']."</option>";
							}
						}
						$visitants = $visitants . "</select>";

						mysql_data_seek( $jugadorsVisitants, 0 );
					}
					else {
						$visitants = "<select name=\"visitant-".$partit['PartitId']."\" id=\"visitant-".$partit['PartitId']."\" data-mini=\"true\" data-inline=\"true\">";
						$visitants = $visitants . "    <option value=\"".$partit['PartitJugadorVisitantId']."\" selected=\"selected\">".$partit['Jug2']."</option>";
						$visitants = $visitants . "</select>";
					}
				}
				else {
					$valor  = $partit['ResultatLocal']."&nbsp;-&nbsp;".$partit['ResultatVisitant'];

					// Miro que no sigui WO					
					if($partit["PartitJugadorLocalId"] > 0) {
	 					$locals = "<font size=2><a href=\"detallJugador.php?jugadorId=".$partit["PartitJugadorLocalId"]."\" data-transition=\"flip\" data-inline=\"true\">".$partit['Jug1']."</a></font>";
	 				}
	 				else {
	 					$locals = "<font size=2>".$partit['Jug1']."</font>";
	 				}

	 				// Miro que no sigui WO
	 				if($partit["PartitJugadorVisitantId"] > 0) {
 						$visitants = "<font size=2><a href=\"detallJugador.php?jugadorId=".$partit["PartitJugadorVisitantId"]."\" data-transition=\"flip\" data-inline=\"true\">".$partit['Jug2']."</a></font>";
 					}
	 				else {
	 					$visitants = "<font size=2>".$partit['Jug2']."</font>";
	 				}
				}
			}

			// Línia partit
			$txtPartit = "<li><table border=0 width=\"100%\">";

 			if($partit['PartitDataInici'] != null) {
				$phpdatapartit = strtotime( $partit['PartitDataInici'] );
				$diapartit  = date("d/m/Y", $phpdatapartit);

				$horaPartit = date("H:i", $phpdatapartit);
				$horaPartit = "a les <b>".$horaPartit."</b>h";

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

				$diaHora = $diaStr." ".$diapartit. " ".$horaPartit;
			}
			else {
				$diaHora = "[ Horari sense determinar ]";
			}
			$txtPartit = $txtPartit . "<tr><td colspan=\"3\" align=\"center\"><p>".$diaHora."</></td></tr>";

			$txtPartit = $txtPartit .  "<tr><td width=\"40%\">".$locals."</td>".
					   "<td width=\"20%\" align=\"center\">".$valor."</td>".
					   "<td width=\"40%\">".$visitants."</td></tr>".
					   "</table></li>";

			echo $txtPartit;
		}

		mysql_free_result($result);
		?>
		</ul>

		<?
		if( @$userAccess->checkAuth() && $mostraBotoGuardar ) {
		?>
		<input type="submit" value="<?=$lang['GUARDAR']?>" name="guardar" data-theme="e" />
		<?}?>
		<a href="calendari.php" data-role="button" data-theme="b" data-rel="back"><?=$lang['TORNAR']?></a>

		</form>

	</div><!-- /content -->

	<?php include 'includes/footer_menu.php';?>

</div><!-- /page -->
</body>
</html>
<?
}
else {
// Faig el query
$result = $bdMysql->Query(
"SELECT PartitId, WEEKDAY(PartitDataInici) AS dia, PartitDataInici, ".
"    PartitJugadorLocalId, ".
"    (SELECT CONCAT(JugadorNom, ' ', JugadorCognom1) FROM JUGADORS WHERE JugadorId = PartitJugadorLocalId) AS Jug1, ".
"    PartitJugadorVisitantId, ".
"    (SELECT CONCAT(JugadorNom, ' ', JugadorCognom1) FROM JUGADORS WHERE JugadorId = PartitJugadorVisitantId) AS Jug2, ".
"    rel1.EquipJugadorEquipId AS EquipLocal, ".
"    rel2.EquipJugadorEquipId AS EquipVisitant, ".
"    (SELECT EquipDescripcio FROM EQUIPS WHERE EquipId = rel1.EquipJugadorEquipId) AS Eq1, ".
"    (SELECT EquipDescripcio FROM EQUIPS WHERE EquipId = rel2.EquipJugadorEquipId) AS Eq2, ".
"	 ResultatId, ".
"	 COALESCE(ResultatLocal, 0) AS ResultatLocal, ".
"	 COALESCE(ResultatVisitant, 0) AS ResultatVisitant ".
"FROM PARTITS ".
"LEFT JOIN RESULTATS ON PartitRasultatId = ResultatId ".
"LEFT JOIN REL_EQUIPS_JUGADORS AS rel1 ON rel1.EquipJugadorJugadorId = PartitJugadorLocalId ".
"LEFT JOIN REL_EQUIPS_JUGADORS AS rel2 ON rel2.EquipJugadorJugadorId = PartitJugadorVisitantId ".
"WHERE PartitJornadaId = ".$jornadaId." ".
"ORDER BY PartitDataInici, Eq1, Eq2, rel1.EquipJugadorOrdre");

$resultats = $bdMysql->Query("SELECT ResultatId, ResultatLocal, ResultatVisitant FROM RESULTATS WHERE ResultatLligaId = ".$lligaId);

if( isset( $_COOKIE["userID_squash"] ) ) {
	$idUsuari = $_COOKIE["userID_squash"];
}
$editable = false;
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
		<a href="#" class="jqm-navmenu-link" data-icon="bars"><?=$lang['MENU']?></a>
        <h1><?=$lang['JORNADA_TITOL']?></h1>
		<a href="index.php" data-icon="home"><?=$lang['MENU_HOME']?></a>
	</div><!-- /header -->

	<div data-role="content" class="jqm-content">

		<br>
		<ul data-role="listview" data-inset="true" data-icon="false">
			<li data-role="divider" data-theme="b"><?=$lliga["LligaNom"]?></li>
		    <li data-role="divider" data-theme="e"><?=$temporada["TemporadaDescripcio"]?></li>
		</ul>

		<form name="formResultats" action="dao/saveResultats.php" method="POST" data-ajax="false">
			<input type="hidden" name="jornadaId" value="<?=$jornadaId?>">

		<ul data-role="listview" data-inset="true" data-divider-theme="d">
		<?
		$linia = "";
		// Bucle partits
		while($partit = mysql_fetch_array($result))
		{
			$str = "<li data-role=\"list-divider\"><font size=2><b></b></font> <font size=2>&nbsp;&nbsp;</font> <font size=2><b></b></font></li>";

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

				// Miro que no sigui WO
				if($partit["PartitJugadorLocalId"] > 0) {
 					$locals = "<font size=2><a href=\"detallJugador.php?jugadorId=".$partit["PartitJugadorLocalId"]."\" data-transition=\"flip\" data-inline=\"true\">".$partit['Jug1']."</a></font>";
 				}
 				else {
 					$locals = "<font size=2>".$partit['Jug1']."</font>";
 				}

 				// Miro que no sigui WO
 				if($partit["PartitJugadorVisitantId"] > 0) {
	 				$visitants = "<font size=2><a href=\"detallJugador.php?jugadorId=".$partit["PartitJugadorVisitantId"]."\" data-transition=\"flip\" data-inline=\"true\">".$partit['Jug2']."</a></font>";
	 			}
 				else {
 					$visitants = "<font size=2>".$partit['Jug2']."</font>";
 				}

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
				if($idUsuari == $partit["PartitJugadorLocalId"] || $idUsuari == $partit["PartitJugadorVisitantId"] || @$userAccess->checkCapita()) {
					// Mostro el boto de guardar?
					$editable = true;

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

				// Miro que no sigui WO
				if($partit["PartitJugadorLocalId"] > 0) {
					$locals = "<font size=2><a href=\"detallJugador.php?jugadorId=".$partit["PartitJugadorLocalId"]."\" data-transition=\"flip\" data-inline=\"true\">".$partit['Jug1']."</a></font>";
				}
				else {
					$locals = "<font size=2>".$partit['Jug1']."</font>";
				}

				// Miro que no sigui WO
				if($partit["PartitJugadorVisitantId"] > 0) {
					$visitants = "<font size=2><a href=\"detallJugador.php?jugadorId=".$partit["PartitJugadorVisitantId"]."\" data-transition=\"flip\" data-inline=\"true\">".$partit['Jug2']."</a></font>";
				}
				else {
					$visitants = "<font size=2>".$partit['Jug2']."</font>";
				}	

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

			$txtPartit = $txtPartit .  "<tr><td width=\"40%\">".$locals."</td>".
					   "<td width=\"20%\" align=\"center\">".$valor."</td>".
					   "<td width=\"40%\">".$visitants."</td></tr>".
					   "</table></li>";

			echo $txtPartit;
		}

		mysql_free_result($result);
		?>
		</ul>

		<?
		if( @$userAccess->checkAuth() && $editable) {
		?>
		<input type="submit" value="<?=$lang['GUARDAR']?>" name="guardar" data-theme="e" />
		<?}?>
		<a href="calendari.php" data-role="button" data-theme="b" data-rel="back"><?=$lang['TORNAR']?></a>

		</form>

	</div><!-- /content -->

	<?php include 'includes/footer_menu.php';?>

</div><!-- /page -->
</body>
</html>
<?
}
?>
