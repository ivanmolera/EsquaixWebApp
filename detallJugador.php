<?php include 'includes/common.php';?>
<?php include 'classes/ImgUtil.php';?>
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

$jugadorId = $_GET["jugadorId"];

if( isset( $_COOKIE["userID_squash"] ) ) {
	$idUsuari = $_COOKIE["userID_squash"];
	/*
	if($jugadorId == $idUsuari) {
		Header( "Location: /editaJugador.php?jugadorId=".$jugadorId );
	}
	*/
}

// Faig el query
$result = $bdMysql->Query(
"SELECT JugadorId, JugadorNom, JugadorCognom1, JugadorCognom2, JugadorFoto, JugadorCapita, JugadorLesionat, JugadorPes, JugadorAlsada, JugadorMa, JugadorTelefon, JugadorTelefonMobil, JugadorEmail, ".
"    JugadorDataNaixement, DATE_FORMAT(JugadorDataNaixement,'%d/%m/%Y') AS dataOk, DATE_FORMAT(JugadorDataAlta,'%d/%m/%Y') AS JugadorDataAlta, DATE_FORMAT(JugadorDataAcces,'%d/%m/%Y %H:%i') AS JugadorDataAcces, JugadorMostrarDadesContacte, ".
"    YEAR(CURDATE())-YEAR(JugadorDataNaixement) + IF(DATE_FORMAT(CURDATE(),'%m-%d') > DATE_FORMAT(JugadorDataNaixement,'%m-%d'), 0, -1) AS edat ".
"FROM JUGADORS ".
"WHERE JugadorId = ".$jugadorId);

$partits = $bdMysql->Query("SELECT PartitJugadorLocalId, PartitJugadorVisitantId, ResultatPuntsTotal, ResultatPuntsLocal, ResultatPuntsVisitant ".
"FROM PARTITS ".
"JOIN REL_JUGADORS_PARTITS_RESULTATS ON JugadorPartitResultatPartitId = PartitId ".
"JOIN RESULTATS ON ResultatId = JugadorPartitResultatResultatId ".
"JOIN JUGADORS ON ( ".
"	JugadorId = PartitJugadorLocalId ".
"	OR JugadorId = PartitJugadorVisitantId ".
") ".
"WHERE JugadorPartitResultatJugadorId = ".$jugadorId." ".
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

if($jugats > 0) {
	$guanyats_per = ($guanyats/$jugats) * 100;
	$perduts_per  = ($perduts/$jugats) * 100;

	$guanyats_per = round($guanyats_per); 
	$perduts_per  = round($perduts_per);
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

		<?
		// Bucle dades
		while($jugador = mysql_fetch_array($result))
		{
			$datanaix = "-";
			if($jugador['JugadorDataNaixement'] != null) {
				$phpdatanaix = strtotime( $jugador['JugadorDataNaixement'] );
				$datanaix  = date("d/m/Y", $phpdatanaix);
			}
		?>
	<div data-role="header" data-theme="d" data-position="fixed" data-fullscreen="true">
		<a href="#" class="jqm-navmenu-link" data-icon="grid"><?=$lang['MENU']?></a>
        <h1><? echo $jugador["JugadorNom"]." ".$jugador["JugadorCognom1"]." ".$jugador["JugadorCognom2"]; ?></h1>
		<a href="index.php" data-icon="home"><?=$lang['MENU_HOME']?></a>
	</div><!-- /header -->

	<div data-role="content" class="jqm-content">

			    <center>
			    <br>
			    <table border="0">
			      <tr>
			        <td>
			        	<br>
			        	<? //echo "<img src=\"".$jugador["JugadorFoto"]."\" width=\"280\" />"; 


print "<img src = 'roundImage.php?img=".$jugador["JugadorFoto"]."'>";


			        	?>
			    	</td>
			      </tr>
			      <tr>
			        <td>
			    <br>
				<ul>
					<? if($jugador["JugadorLesionat"] == 1) echo "<li><div><font color=red><b>Jugador lesionat</b></font> &nbsp;&nbsp;<img src=\"images/lesionat.png\" width=\"18\" height=\"18\"/></div></li>"; ?>
					<? if($jugador["JugadorCapita"] == 1) echo "<li><div>[&nbsp;<b>Administrador&nbsp;]</b></div></li>"; ?>
					<? if($jugador["edat"] != NULL) echo "<li><div>".$lang['JUGADOR_EDAT'].":<b>&nbsp;".$jugador["edat"]."</b></div></li>"; ?>
					<li><div><?=$lang['JUGADOR_DATANAIX']?>: <b><?=$jugador["dataOk"] ?></b></div></li>
					<li><div><?=$lang['JUGADOR_ALSADA']?>: <b><?=$jugador["JugadorAlsada"] ?> cm</b></div></li>
					<li><div><?=$lang['JUGADOR_PES']?>: <b><?=$jugador["JugadorPes"] ?> kg</b></div></li>
					<li><div><b>[ <? echo ($jugador["JugadorMa"] == "1") ? $lang['JUGADOR_DRE'] : $lang['JUGADOR_ESQ']; ?> ]</b></div></li>
					<?
					if( @$userAccess->checkAuth() && $jugador["JugadorMostrarDadesContacte"]) {
					?>
						<li><div><?=$lang['JUGADOR_TEL']?>: <b><?=$jugador["JugadorTelefon"] ?></b></div></li>
						<li><div><?=$lang['JUGADOR_TELMOBIL']?>: <b><?=$jugador["JugadorTelefonMobil"] ?></b></div></li>
						<li><div><?=$lang['JUGADOR_EMAIL']?>: <b><?=$jugador["JugadorEmail"] ?></b></div></li>
						<li><div><?=$lang['JUGADOR_DATAALTA']?>: <b><?=$jugador["JugadorDataAlta"] ?></b></div></li>
						<li><div><?=$lang['JUGADOR_DATACCES']?>: <b><?=$jugador["JugadorDataAcces"] ?></b></div></li>
					<?}?>
					<li>Partits / Resultats:</li>
				</ul>
					
						<table data-mode="reflow" class="resultats-list table-stroke" width="100%">
				         <thead>
				           <tr>
				             <th><b>PJ</b></th>
				             <th><b>PG</b></th>
				             <th><b>(%)</b></th>
				             <th><b>PP</b></th>
				             <th><b>(%)</b></th>
				           </tr>
				         </thead>
				         <tbody>
				           <tr>
            				 <td><?=$jugats?></td>
			        	     <td><font color=green><?=$guanyats?></font></td>
			        	     <td><font color=green><?=$guanyats_per?>%</font></td>
			        	     <td><font color=red><?=$perduts?></font></td>
    	    			     <td><font color=red><?=$perduts_per?>%</font></td>
				           </tr>
				         </tbody>
				        </table>
					
<?
$ultims = $bdMysql->Query(
"SELECT PartitDataInici, ".
"       LligaNom, ".
"       jug1.JugadorNom AS JugadorNom1, ".
"       jug1.JugadorCognom1 AS JugadorCognom1, ".
"       ResultatLocal, ".
"       ResultatVisitant, ".
"       jug2.JugadorNom AS JugadorNom2, ".
"       jug2.JugadorCognom1 AS JugadorCognom2, ".
"		PartitJugadorLocalId, ".
"		PartitJugadorVisitantId ".
"FROM PARTITS ".
"JOIN REL_JUGADORS_PARTITS_RESULTATS ON JugadorPartitResultatPartitId = PartitId ".
"JOIN RESULTATS ON ResultatId = JugadorPartitResultatResultatId ".
"JOIN JUGADORS AS jug1 ON ( ".
"    jug1.JugadorId = PartitJugadorLocalId ".
") ".
"JOIN JUGADORS AS jug2 ON ( ".
"    jug2.JugadorId = PartitJugadorVisitantId ".
") ".
"JOIN LLIGUES ON LligaId = ResultatLligaId ".
"WHERE JugadorPartitResultatJugadorId = ".$jugadorId." ".
"AND ( ".
"    jug1.JugadorId = ".$jugadorId." ".
"    OR ".
"    jug2.JugadorId = ".$jugadorId." ".
") ".
"ORDER BY PartitDataInici DESC ".
"LIMIT 0, 10");
?>
<br>
						<table data-mode="reflow" class="resultats-list table-stroke" width="100%">
				         <thead>
				           <tr>
				             <th><b>Data</b></th>
				             <th><b>Comp</b></th>
				             <th><b>J1</b></th>
				             <th><b>Res</b></th>
				             <th><b>J2</b></th>
				           </tr>
				         </thead>
				         <tbody>
		<?
		// Bucle dades
		while($ultim = mysql_fetch_array($ultims))
		{
			$datapartit = "-";
			if($ultim['PartitDataInici'] != null) {
				$phpdatapartit = strtotime( $ultim['PartitDataInici'] );
				$datapartit  = date("d/m/Y", $phpdatapartit);
			}
		?>
				           <tr>
            				 <td><b><?=$datapartit?></b></td>
			        	     <td><?=$ultim["LligaNom"]?></td>
			        	     <td>
			        	     	<?=($ultim["PartitJugadorLocalId"] == $jugadorId) ? "<b>" : ""?>
			        	     	<?=$ultim["JugadorNom1"]?> <?=$ultim["JugadorCognom1"]?>
			        	     	<?=($ultim["PartitJugadorLocalId"] == $jugadorId) ? "</b>" : ""?>
			        	     </td>
			        	     <td class="resultat"><?=$ultim["ResultatLocal"]?> - <?=$ultim["ResultatVisitant"]?></td>
    	    			     <td>
    	    			     	<?=($ultim["PartitJugadorVisitantId"] == $jugadorId) ? "<b>" : ""?>
    	    			    	<?=$ultim["JugadorNom2"]?> <?=$ultim["JugadorCognom2"]?>
    	    			    	<?=($ultim["PartitJugadorVisitantId"] == $jugadorId) ? "</b>" : ""?>
    	    			    </td>
				           </tr>
		<?}?>
				         </tbody>
				        </table>
				    </td>
				  </tr>
				</table>
				</center>

		<?
		}

		mysql_free_result($result);
		?>

		<a href="equips.php" data-role="button" data-theme="b" data-rel="back"><?=$lang['TORNAR']?></a>

	</div><!-- /content -->

	<?php include 'includes/footer_menu.php';?>

</div><!-- /page -->
</body>
</html>
