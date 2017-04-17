<?php include 'includes/common.php';?>
<?
// Faig l'include de la classe userAccess
require("classes/userAccess.php");

$userAccess = new userAccess();

// Comprovo si l'usuari esta autentificat
if( !@$userAccess->checkAuth() ) {
	Header( "Location: index.php" );
}
else {

// Faig l'include de la classe MySQL
require("classes/bdMysql.php");

// Creo l'objecte
$bdMysql = new bdMysql();

// Connecto a la BD
$bdMysql->Connecta();

// Faig el query
$result = $bdMysql->Query(
	"SELECT DISTINCT JugadorId, JugadorNom, JugadorCognom1, JugadorCognom2 ".
	"FROM JUGADORS ".
	"JOIN REL_GRUPS_JUGADORS ON ( ".
	"    GrupJugadorJugadorId = JugadorId ".
	"    AND JugadorDataBaixa IS NULL ".
	"	AND JugadorId > 0 ".
	") ".
	"JOIN GRUPS ON GrupId = GrupJugadorGrupId ". 
	"JOIN RONDES ON RondaId = GrupRondaId ".
	"JOIN TEMPORADES ON TemporadaId = RondaTemporadaId ".
	"WHERE TemporadaLligaId = ".$lligaId." ".
	"ORDER BY JugadorCognom1, JugadorCognom2, JugadorNom"
);

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
        <h1><?=strtoupper($lang['ADMIN_MOD_JUGADORS'])?></h1>
		<a href="index.php" data-icon="home"><?=$lang['MENU_HOME']?></a>
	</div><!-- /header -->

	<div data-role="content" class="jqm-content">

		<br>
		<div data-role="collapsible-set" data-theme="c" data-content-theme="d" data-collapsed-icon="arrow-r" data-expanded-icon="arrow-d">

			<ul data-role="listview" data-autodividers="true" data-divider-theme="d" data-inset="true">
			<?
			// Bucle jugadors
			while($jugador = mysql_fetch_array($result))
			{
				echo "<li data-icon=\"edit\"><a href=\"editaJugador.php?jugadorId=".$jugador['JugadorId']."\">".$jugador['JugadorCognom1'].", ".$jugador['JugadorNom']."</a></li>";
			}

			mysql_free_result($result);
			?>
			</ul>
		</div>

		<a href="index.php" data-role="button" data-theme="b" data-rel="back"><?=$lang['TORNAR']?></a>

	</div><!-- /content -->

	<?php include 'includes/footer_menu.php';?>

</div><!-- /page -->
</body>
</html>
<?}?>