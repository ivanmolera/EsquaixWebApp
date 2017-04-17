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

$rondaId = $_GET["rondaId"];
$grupId  = $_GET["grupId"];

$result_aux = $bdMysql->aQuery(
"SELECT GrupDescripcio ".
"FROM GRUPS ".
"WHERE GrupId = ".$grupId);

$grupDescripcio = $result_aux["GrupDescripcio"];

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
"	 JornadaId, GrupId, RondaId, JornadaOrdre ".
"FROM PARTITS ".
"JOIN JORNADES ON JornadaId = PartitJornadaId ".
"JOIN GRUPS ON GrupId = JornadaGrupId ".
"JOIN RONDES ON RondaId = GrupRondaId ".
"LEFT JOIN RESULTATS ON PartitRasultatId = ResultatId ".
"LEFT JOIN REL_EQUIPS_JUGADORS AS rel1 ON rel1.EquipJugadorJugadorId = PartitJugadorLocalId ".
"LEFT JOIN REL_EQUIPS_JUGADORS AS rel2 ON rel2.EquipJugadorJugadorId = PartitJugadorVisitantId ".
"WHERE RondaId = ".$rondaId." ".
"AND GrupId = ".$grupId." ".
"ORDER BY JornadaId, PartitDataInici, Eq1, Eq2, rel1.EquipJugadorOrdre");

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
		<a href="#" class="jqm-navmenu-link" data-icon="grid"><?=$lang['MENU']?></a>
        <h1><?=$grupDescripcio?></h1>
		<a href="index.php" data-icon="home"><?=$lang['MENU_HOME']?></a>
	</div><!-- /header -->

	<div data-role="content" class="jqm-content">

		<br>
		<ul data-role="listview" data-inset="true" data-icon="false">
			<li data-role="divider" data-theme="b"><?=$lliga["LligaNom"]?></li>
		</ul>

		<form name="formResultats" action="dao/saveResultats.php" method="POST" data-ajax="false">
			<input type="hidden" name="jornadaId" value="<?=$jornadaId?>">
			<input type="hidden" name="grupId" value="<?=$grupId?>">
			<input type="hidden" name="rondaId" value="<?=$rondaId?>">

		<ul data-role="listview" data-inset="true" data-divider-theme="d">
		<?
		$linia = "";
		$jornadaId=0;
		$cont=1;

		// Bucle partits
		while($partit = mysql_fetch_array($result))
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
