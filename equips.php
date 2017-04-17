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

$lligaPerEquips = false;

$result_aux = $bdMysql->aQuery(
"SELECT LligaPerEquips ".
"FROM LLIGUES ".
"WHERE LligaId = ".$lligaId);

$lligaPerEquips = $result_aux["LligaPerEquips"];

if($lligaPerEquips) {

// Faig el query
$result = $bdMysql->Query(
"SELECT EquipId, EquipDescripcio, EquipEscut, GrupId ".
"FROM REL_GRUPS_JUGADORS ".
"JOIN GRUPS ON GrupId = GrupJugadorGrupId ".
"JOIN RONDES ON RondaId = GrupRondaId ".
"JOIN REL_EQUIPS_JUGADORS ON EquipJugadorGrupId = GrupId ".
"JOIN EQUIPS ON EquipId = EquipJugadorEquipId ".
"WHERE RondaTemporadaId = ".$temporadaId. " ".
"GROUP BY EquipDescripcio");
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
        <h1><?=$lang['EQUIPS_TITOL']?></h1>
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
		// Bucle equips
		while($row = mysql_fetch_array($result))
		{
		?>
				<div data-role="collapsible">
				<h3><?=$row["EquipDescripcio"]?></h3>
				<center><img src="images/<?=$row["EquipEscut"]?>" border="0" width="180"/></center>
				<div style="height:8px">&nbsp;</div>
				<ol data-role="listview" class="jqm-list jqm-home-list">
				<?
				$result2 = $bdMysql->Query("SELECT JugadorId, JugadorNom, JugadorCognom1, JugadorCognom2, EquipJugadorCapita FROM JUGADORS JOIN REL_EQUIPS_JUGADORS ON EquipJugadorJugadorId = JugadorId WHERE EquipJugadorEquipId=".$row["EquipId"]." AND EquipJugadorGrupId=".$row["GrupId"]." AND JugadorId > 0 ORDER BY EquipJugadorOrdre");
				// Bucle jugadors
				while($jugador = mysql_fetch_array($result2))
				{
				?>
					<li>
						<?
						if($jugador["EquipJugadorCapita"] == 1) $capita = " <font color=\"red\">[C]</font>";
						else $capita = "";

						echo "<a href=\"detallJugador.php?jugadorId=".$jugador["JugadorId"]."\" data-transition=\"flip\" data-inline=\"true\">".$jugador["JugadorNom"]." ".$jugador["JugadorCognom1"].$capita."</a>"; ?>
					</li>
				<?
				}

				mysql_free_result($result2);
				?>
				</ol>
				</div>
		<?
		}

		mysql_free_result($result);
		?>
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
else {

// Faig el query
$result = $bdMysql->Query(
"SELECT DISTINCT JugadorId, JugadorNom, JugadorCognom1, JugadorCognom2 ".
"FROM JUGADORS ".
"JOIN REL_GRUPS_JUGADORS ON GrupJugadorJugadorId = JugadorId ".
"JOIN GRUPS ON GrupId = GrupJugadorGrupId ".
"JOIN RONDES ON RondaId = GrupRondaId ".
"WHERE RondaTemporadaId = ".$temporadaId. " ".
"ORDER BY JugadorCognom1, JugadorCognom2, JugadorNom");
?>
<!DOCTYPE html>
<html>
<head>
	<?php include 'includes/header_includes.php';?>
	<script type="text/javascript">
		$( document ).on( "mobileinit", function() {
		    $.mobile.listview.prototype.options.autodividersSelector = function( elt ) {
		        var text = $.trim( elt.text() ) || null;
		        if ( !text ) {
		            return null;
		        }
		        if ( !isNaN(parseFloat(text)) ) {
		            return "0-9";
		        } else {
		            text = text.slice( 0, 1 ).toUpperCase();
		            return text;
		        }
		    };
		});
	</script>
</head>
<body>
<div data-role="page" class="jqm-demos jqm-demos-index">

	<?php include 'includes/header_menu.php';?>

	<div data-role="header" data-theme="d" data-position="fixed" data-fullscreen="true">
		<a href="#" class="jqm-navmenu-link" data-icon="grid"><?=$lang['MENU']?></a>
        <h1><?=$lang['EQUIPS_TITOL']?></h1>
		<a href="index.php" data-icon="home"><?=$lang['MENU_HOME']?></a>
	</div><!-- /header -->

	<div data-role="content" class="jqm-content">

		<br>
		<ul data-role="listview" data-inset="true" data-icon="false">
			<li data-role="divider" data-theme="b"><?=$lliga["LligaNom"]?></li>
		    <li data-role="divider" data-theme="e"><?=$temporada["TemporadaDescripcio"]?></li>
		</ul>

		<div data-role="collapsible-set" data-theme="c" data-content-theme="d" data-collapsed-icon="arrow-r" data-expanded-icon="arrow-d">

			<ul data-role="listview" data-autodividers="true" data-divider-theme="d" data-inset="true">
			<?
			// Bucle jugadors
			while($jugador = mysql_fetch_array($result))
			{
				echo "<li><a href=\"detallJugador.php?jugadorId=".$jugador["JugadorId"]."\" data-transition=\"flip\" data-inline=\"true\">".$jugador["JugadorCognom1"].", ".$jugador["JugadorNom"]."</a></li>";
			}

			mysql_free_result($result);
			?>
				</ul>
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
?>
