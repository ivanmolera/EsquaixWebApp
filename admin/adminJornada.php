<?php include 'common.php';?>
<?
// Faig l'include de la classe userAccess
require("../classes/userAccess.php");

$userAccess = new userAccess();

// Comprovo si l'usuari esta autentificat
if( !@$userAccess->checkAuth() ) {
	Header( "Location: ../index.php" );
}
else if( @$userAccess->checkCapita() || @$userAccess->checkAdminLliga($lligaId) ) {
	// Faig l'include de la classe MySQL
	require("../classes/bdMysql.php");

	$temporadaId = $_GET["temporadaId"];
	$rondaId = $_GET["rondaId"];
	$grupId = $_GET["grupId"];
	$jornadaId = $_GET["jornadaId"];

	// Creo l'objecte
	$bdMysql = new bdMysql();

	// Connecto a la BD
	$bdMysql->Connecta();

	// Faig el query
	$lliga = $bdMysql->aQuery("SELECT * FROM LLIGUES WHERE LligaId = ".$lligaId);
	$temporada = $bdMysql->aQuery("SELECT * FROM TEMPORADES WHERE TemporadaId = ".$temporadaId);
	$grup = $bdMysql->aQuery("SELECT * FROM GRUPS WHERE GrupId = ".$grupId);
	$ronda = $bdMysql->aQuery("SELECT * FROM RONDES WHERE RondaId = ".$rondaId);
	$jornada = $bdMysql->aQuery("SELECT * FROM JORNADES WHERE JornadaId = ".$jornadaId);
	$result = $bdMysql->Query("SELECT PartitId, PartitDataInici, PartitDataFinal, ".
							"PartitJugadorLocalId, CONCAT(j1.JugadorNom, ' ', j1.JugadorCognom1) AS Jugador1, ".
							"PartitJugadorVisitantId, CONCAT(j2.JugadorNom, ' ', j2.JugadorCognom1) AS Jugador2 ".
							"FROM PARTITS ".
							"JOIN JUGADORS AS j1 ON j1.JugadorId = PartitJugadorLocalId ".
							"JOIN JUGADORS AS j2 ON j2.JugadorId = PartitJugadorVisitantId ".
							"WHERE PartitJornadaId = ".$jornadaId);
	
	$locals = $bdMysql->Query("SELECT JugadorId, CONCAT(JugadorNom, ' ', JugadorCognom1) AS JugadorNom FROM JUGADORS JOIN REL_GRUPS_JUGADORS ON GrupJugadorJugadorId = JugadorId WHERE GrupJugadorGrupId = ".$grupId." ORDER BY JugadorCognom1, JugadorCognom2, JugadorNom");
	$visitants = $bdMysql->Query("SELECT JugadorId, CONCAT(JugadorNom, ' ', JugadorCognom1) AS JugadorNom FROM JUGADORS JOIN REL_GRUPS_JUGADORS ON GrupJugadorJugadorId = JugadorId WHERE GrupJugadorGrupId = ".$grupId." ORDER BY JugadorCognom1, JugadorCognom2, JugadorNom");
?>
<!DOCTYPE html>
<html>
<head>
	<?php include 'header_includes.php';?>
</head>
<body>
<div data-role="page" class="jqm-demos jqm-demos-index">

	<?php include '../includes/header_menu.php';?>

	<div data-role="header" data-theme="d" data-position="fixed" data-fullscreen="true">
		<a href="adminGrup.php?lligaId=<?=$lligaId?>&temporadaId=<?=$temporadaId?>&rondaId=<?=$rondaId?>&grupId=<?=$grupId?>" data-icon="back" data-ajax="false"><?=$lang['TORNAR']?></a>
        <h1><?=$lang['ADMIN_TITOL']?></h1>
		<a href="index.php" data-icon="home" data-ajax="false"><?=$lang['MENU_HOME']?></a>
	</div><!-- /header -->

	<div data-role="content" class="jqm-content">

		<br>
		<ul data-role="listview" data-inset="true" data-icon="false">
			<li data-role="divider" data-theme="b"><?=$lliga["LligaNom"]?></li>
		    <li data-role="divider" data-theme="e"><?=$temporada["TemporadaDescripcio"]?></li>
		    <li data-role="divider" data-theme="c"><?=$ronda["RondaNom"]?></li>
		</ul>

		<h2><?=$grup["GrupDescripcio"]?> > <?=$lang['JORNADA_TITOL']." ".$jornada['JornadaOrdre']?></h2>

		<div data-role="collapsible-set" data-theme="c" data-content-theme="d" data-collapsed-icon="plus" data-expanded-icon="arrow-d">
		<div data-role="collapsible" data-collapsed="false">
			<h3>Nou partit</h3>
			<form name="formResultats" action="nouPartitJornada.php" method="POST" data-ajax="false">
				<input type="hidden" name="temporadaId" value="<?=$temporadaId?>">
				<input type="hidden" name="rondaId" value="<?=$rondaId?>">
				<input type="hidden" name="grupId" value="<?=$grupId?>">
				<input type="hidden" name="jornadaId" value="<?=$jornadaId?>">

				<?=$lang['DATA']?>: <input type="date" name="diaPartit" data-theme="e" />
				<br>
				<?=$lang['HORA']?> (HH:mm): <input type="text" name="horaPartit" data-theme="e" />
				<br>
				<?=$lang['ADMIN_JUG_LOCAL']?>:
				<select name="localPartit" data-mini="true" data-inline="true">
				<?
					while($local = mysql_fetch_array($locals))
					{
						echo "<option value=\"".$local['JugadorId']."\">".$local['JugadorNom']."</option>";
					}
				?>
				</select>
				<br>
				<?=$lang['ADMIN_JUG_VISITANT']?>:
				<select name="visitantPartit" data-mini="true" data-inline="true">
				<?
					while($visitant = mysql_fetch_array($visitants))
					{
						echo "<option value=\"".$visitant['JugadorId']."\">".$visitant['JugadorNom']."</option>";
					}
				?>
				</select>
						
				<input type="submit" value="<?=$lang['GUARDAR']?>" name="nouPartit" data-theme="e" />
			</form>
		</div>
		</div>
		
		<br>

		<form name="formResultats" action="../dao/saveResultats.php" method="POST" data-ajax="false">
			<input type="hidden" name="jornadaId" value="<?=$jornadaId?>">

			<ul data-role="listview" data-inset="true" data-divider-theme="d">

			<?
			echo "<li data-role=\"list-divider\"><font size=2><b>".$lang['JORNADA_TITOL']." ".$jornada['JornadaOrdre']."</b></font></li>";

			// Bucle temporades
			while($partit = mysql_fetch_array($result))
			{
					////////////////////////// COMBO LOCALS ////////////////////
					$jugadorsLocals    = $bdMysql->Query("SELECT JugadorId, CONCAT(JugadorNom, ' ', JugadorCognom1) AS JugadorNom FROM JUGADORS JOIN REL_GRUPS_JUGADORS ON GrupJugadorJugadorId = JugadorId WHERE GrupJugadorGrupId = ".$grupId." ORDER BY JugadorCognom1, JugadorCognom2, JugadorNom");

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

					////////////////////////// COMBO VISITANTS ////////////////////
					$jugadorsVisitants    = $bdMysql->Query("SELECT JugadorId, CONCAT(JugadorNom, ' ', JugadorCognom1) AS JugadorNom FROM JUGADORS JOIN REL_GRUPS_JUGADORS ON GrupJugadorJugadorId = JugadorId WHERE GrupJugadorGrupId = ".$grupId." ORDER BY JugadorCognom1, JugadorCognom2, JugadorNom");

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

					$txtPartit = $txtPartit .  "<tr><td width=\"45%\">".$locals."</td>".
					"<td width=\"10%\" align=\"center\">".$valor."</td>".
					"<td width=\"45%\">".$visitants."</td></tr>".
					"</table></li>";

					echo $txtPartit;
			}

			mysql_free_result($result);
			?>
				</ul>

				<!--input type="submit" value="<?=$lang['GUARDAR']?>" name="guardar" data-theme="e" /-->

				</form>
		</div>

	</div><!-- /content -->

	<br><br>
	<?php include '../includes/footer_menu.php';?>

</div><!-- /page -->
</body>
</html>
<?}?>