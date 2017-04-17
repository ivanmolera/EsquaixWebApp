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

// Faig el query
$result = $bdMysql->Query("SELECT EquipId, EquipDescripcio FROM EQUIPS ORDER BY EquipDescripcio");
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
        <h1><?=$lang['JUGADORS_TITOL']?></h1>
		<a href="index.php" data-icon="home"><?=$lang['MENU_HOME']?></a>
	</div><!-- /header -->

	<div data-role="content" class="jqm-content">

		<h1><?=$lliga["LligaNom"]?></h1>

		<div data-role="collapsible-set" data-theme="c" data-content-theme="d" data-collapsed-icon="arrow-r" data-expanded-icon="arrow-d">
		<?
		// Bucle equips
		while($row = mysql_fetch_array($result))
		{
		?>
				<div data-role="collapsible">
				<h3><?=$row["EquipDescripcio"]?></h3>
				<ul>
				<?
				$result2 = $bdMysql->Query("SELECT JugadorId, JugadorNom, JugadorCognom1, JugadorCognom2, JugadorCapita FROM JUGADORS JOIN REL_EQUIPS_JUGADORS ON EquipJugadorJugadorId = JugadorId WHERE EquipJugadorEquipId=".$row["EquipId"]." ORDER BY EquipJugadorOrdre");
				// Bucle jugadors
				while($jugador = mysql_fetch_array($result2))
				{
				?>
					<li class="home_share_row">
						<div>
						<? echo "<a href=\"detallJugador.php?jugadorId=".$jugador["JugadorId"]."\" data-transition=\"flip\" data-inline=\"true\">".$jugador["JugadorNom"]." ".$jugador["JugadorCognom1"]." ".$jugador["JugadorCognom2"]."</a>"; ?>
						<? if($jugador["JugadorCapita"] == 1) echo " (C)"; ?>
						</div>
					</li>
				<?
				}

				mysql_free_result($result2);
				?>
				</ul>
				</div>
		<?
		}

		mysql_free_result($result);
		?>
		</div>

	</div><!-- /content -->

	<?php include 'includes/footer_menu.php';?>

</div><!-- /page -->
</body>
</html>
