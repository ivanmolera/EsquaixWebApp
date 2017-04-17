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
"SELECT LligaPerEquips, LligaClassificacioGeneral ".
"FROM LLIGUES ".
"WHERE LligaId = ".$lligaId);

$lligaPerEquips 			= $result_aux["LligaPerEquips"];
$lligaClassificacioGeneral 	= $result_aux["LligaClassificacioGeneral"];
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
        <h1><?=$lliga["LligaNom"]?></h1>
	</div><!-- /header -->

	<div data-role="content" class="jqm-content">
<?
if(isSet($_GET['temporadaId'])) {
	$temporadaId = $_GET['temporadaId'];
	$_SESSION['temporadaId'] = $temporadaId;
}

if($lligaId != null && $temporadaId != null) { 
	$temporada = $bdMysql->aQuery("SELECT TemporadaId, TemporadaNom, TemporadaDescripcio, TemporadaInici, TemporadaFinal FROM TEMPORADES WHERE TemporadaId = ".$temporadaId);

	$result = $bdMysql->Query("SELECT RondaId, RondaNom, RondaDataInici, RondaDataFinal FROM RONDES WHERE RondaTemporadaId = ".$temporadaId." ORDER BY RondaDataInici DESC");
?>

	<br>
	<ul data-role="listview" data-inset="true" data-icon="false">
		<li data-role="divider" data-theme="b"><?=$lliga["LligaNom"]?></li>
	    <li data-role="divider" data-theme="e"><?=$temporada["TemporadaDescripcio"]?></li>
	</ul>
	
<!-- //////////////////////////////////////////// -->
	<div data-role="collapsible-set" data-theme="c" data-content-theme="d" data-collapsed-icon="arrow-r" data-expanded-icon="arrow-d">

		<?
		$expanded = true;

		// Bucle rondes
		while($row = mysql_fetch_array($result))
		{
				$phpdate1 = strtotime( $row['RondaDataInici'] );
				$phpdate2 = strtotime( $row['RondaDataFinal'] );
				$dia1  = date("d/m/y", $phpdate1);
				$dia2  = date("d/m/y", $phpdate2);
				$hora  = date("H:i", $phpdate);

				if($expanded) {
					echo "<div data-role=\"collapsible\" data-collapsed=\"false\" id=\"firstBlock\">";
					$expanded = false;
				}
				else {
					echo "<div data-role=\"collapsible\" data-collapsed=\"true\">";
				}
		?>

				<h3><?=$row["RondaNom"]?><?if($row['RondaDataInici'] != null) echo "&nbsp;<font size=2>(".$dia1." al ".$dia2.")</font>";?></h3>
				
			    <ul data-role="listview" class="jqm-list jqm-home-list">
					<li><a href="resultats.php?rondaId=<?=$row["RondaId"]?>"><?=$lang['CLASS_TITOL']?></a></li>
        		    <li><a href="calendari.php?rondaId=<?=$row["RondaId"]?>"><?=$lang['CALENDARI_TITOL']?></a></li>
				</ul>

		<?
				echo "</div>";
		}

		mysql_free_result($result);
		?>
	</div>
				
<!-- //////////////////////////////////////////// -->

	    <ul data-role="listview" data-inset="true" data-theme="d" data-icon="false" class="jqm-list jqm-home-list">
			<?if(!$lligaPerEquips && $lligaClassificacioGeneral){ ?>
			<li data-icon="bars"><a href="ranking_gen.php"><?=$lang['RANK_GEN']?> <?=$temporada["TemporadaNom"]?></a></li>
			<?}?>
			<li data-icon="info"><a href="equips.php"><?=$lang['EQUIPS_TITOL']?></a></li>
		</ul>
<?}?>

	<?
	// Comprovo si l'usuari esta autentificat
	if( !@$userAccess->checkAuth() ) {
	?>
					<h3 style="border-top: 1px solid #ccc;"><span class="home_collapsible_logo home_collapsible_login">&nbsp;</span><?=$lang['MENU_LOGIN']?></h3>
					<form class="login_form" action="login_run.php" method="post" data-ajax="false">

						<input type="email" data-clear-btn="true" name="login" value="" placeholder="<?=$lang['LOGIN_EMAIL']?>" />

						<input type="password" data-clear-btn="true" name="password" autocomplete="off" placeholder="<?=$lang['LOGIN_PWD']?>" />

						<input type="submit" value="<?=$lang['LOGIN_ENTER']?>" name="login_submit" data-theme="e" />

					</form>
	<?
	}
	else {
	?>
		<br>
		<ul data-role="listview" data-inset="true" data-theme="d" data-icon="false" class="jqm-list jqm-home-list">
			<li data-role="divider" data-theme="b"><?=$lang['MENU_OPCIONES']?></li>
		<?
		if( @$userAccess->checkCapita() || @$userAccess->checkAdminLliga($lligaId) ) {
		?>
            <li data-icon="gear"><a href="admin/index.php"><?=$lang['ADMIN_ADMIN_LLIGA']?></a></li>
            <li data-icon="edit"><a href="llistaJugadors.php"><?=$lang['ADMIN_MOD_JUGADORS']?></a></li>
		<?
		}

		if( isset( $_COOKIE["userID_squash"] ) ) {
			$idUsuari = $_COOKIE["userID_squash"];
		}
		?>
            <li data-icon="edit"><a href="editaJugador.php?jugadorId=<?=$idUsuari?>">Dades personals</a></li>
            <li data-icon="back"><a href="logout_run.php" data-ajax=\"false\">Sortir</a></li>
		</ul>
	<?}?>
	
	<!--p><center><br><img src="images/federacio.png" border="0"/><br></center></p-->

	</div><!-- /content -->

	<?php include 'includes/footer_menu.php';?>

</div><!-- /page -->
</body>
</html>
