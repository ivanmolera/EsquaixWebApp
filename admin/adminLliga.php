<?php include 'common.php';?>
<?
// Faig l'include de la classe userAccess
require("../classes/userAccess.php");

$userAccess = new userAccess();

// Comprovo si l'usuari esta autentificat
if( !@$userAccess->checkAuth() ) {
	Header( "Location: ../index.php" );
}
else {
	// Faig l'include de la classe MySQL
	require("../classes/bdMysql.php");

	// Creo l'objecte
	$bdMysql = new bdMysql();

	// Connecto a la BD
	$bdMysql->Connecta();

	// Faig el query
	$lliga = $bdMysql->aQuery("SELECT * FROM LLIGUES WHERE LligaId = ".$lligaId);
	$result = $bdMysql->Query("SELECT * FROM TEMPORADES WHERE TemporadaLligaId = ".$lligaId." ORDER BY TemporadaId DESC");

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
		<a href="index.php" data-icon="back" data-ajax="false"><?=$lang['TORNAR']?></a>
        <h1><?=$lang['ADMIN_TITOL']?></h1>
		<a href="index.php" data-icon="home" data-ajax="false"><?=$lang['MENU_HOME']?></a>
	</div><!-- /header -->

	<div data-role="content" class="jqm-content">

		<br>
		<ul data-role="listview" data-inset="true" data-icon="false">
			<li data-role="divider" data-theme="b"><?=$lliga["LligaNom"]?></li>
		</ul>

		<div data-role="collapsible-set" data-theme="c" data-content-theme="d" data-collapsed-icon="arrow-r" data-expanded-icon="arrow-d">

			<ul data-role="listview" data-inset="true">
			<?
			// Bucle temporades
			while($temporada = mysql_fetch_array($result))
			{
				echo "<li><a href=\"adminTemporada.php?temporadaId=".$temporada["TemporadaId"]."\" data-transition=\"flip\" data-inline=\"true\">".$temporada["TemporadaNom"]."</a></li>";
			}

			mysql_free_result($result);
			?>
				</ul>
		</div>

	</div><!-- /content -->

	<?php include '../includes/footer_menu.php';?>

</div><!-- /page -->
</body>
</html>
<?}?>