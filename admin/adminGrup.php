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

	// Creo l'objecte
	$bdMysql = new bdMysql();

	// Connecto a la BD
	$bdMysql->Connecta();

	// Faig el query
	$lliga 		= $bdMysql->aQuery("SELECT * FROM LLIGUES WHERE LligaId = ".$lligaId);
	$temporada 	= $bdMysql->aQuery("SELECT * FROM TEMPORADES WHERE TemporadaId = ".$temporadaId);
	$ronda 		= $bdMysql->aQuery("SELECT * FROM RONDES WHERE RondaId = ".$rondaId);
	$grup 		= $bdMysql->aQuery("SELECT * FROM GRUPS WHERE GrupId = ".$grupId);

	$result 	= $bdMysql->Query("SELECT * FROM JORNADES WHERE JornadaGrupId = ".$grupId." ORDER BY JornadaOrdre");
	$jugadors 	= $bdMysql->Query("SELECT JugadorId, CONCAT(JugadorCognom1, ', ', JugadorNom) AS JugadorNom FROM JUGADORS JOIN REL_GRUPS_JUGADORS ON GrupJugadorJugadorId = JugadorId WHERE GrupJugadorGrupId = ".$grupId." ORDER BY JugadorCognom1, JugadorCognom2, JugadorNom");

	$jugadorsLliga = $bdMysql->Query(
		"SELECT DISTINCT JugadorId, CONCAT(JugadorCognom1, ', ', JugadorNom) AS JugadorNom ".
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
	<?php include 'header_includes.php';?>
	<script type="text/javascript">
		function validateForm() {
	    	if(document.getElementById("ordreJornada").value != null && document.getElementById("ordreJornada").value != "") {
    			if(!isNaN(document.getElementById("ordreJornada").value)) {
        			return true;
        		}
        		else {
        			return false;
        		}
			}
			else {
				return false;
			}
		}
	</script>
</head>
<body>
<div data-role="page" class="jqm-demos jqm-demos-index">

	<?php include '../includes/header_menu.php';?>

	<div data-role="header" data-theme="d" data-position="fixed" data-fullscreen="true">
		<a href="adminRonda.php?lligaId=<?=$lligaId?>&temporadaId=<?=$temporadaId?>&rondaId=<?=$rondaId?>" data-icon="back" data-ajax="false"><?=$lang['TORNAR']?></a>
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

		<h2><?=$grup["GrupDescripcio"]?></h2>

		<div data-role="collapsible-set" data-theme="c" data-content-theme="d" data-collapsed-icon="arrow-r" data-expanded-icon="arrow-d">

			<ul data-role="listview" data-inset="true">
			<?
			// Bucle jornades
			while($jornada = mysql_fetch_array($result))
			{
				$phpdate1 = strtotime( $jornada['JornadaDataInici'] );
				$phpdate2 = strtotime( $jornada['JornadaDataFinal'] );
				$dia1  = date("d/m/y", $phpdate1);
				$dia2  = date("d/m/y", $phpdate2);

				echo "<li><a href=\"adminJornada.php?temporadaId=".$temporadaId."&rondaId=".$rondaId."&grupId=".$grupId."&jornadaId=".$jornada["JornadaId"]."\" data-transition=\"flip\" data-inline=\"true\"> ". $lang['JORNADA_TITOL']." ".$jornada["JornadaOrdre"]."&nbsp;<font size=2>(".$dia1." al ".$dia2.")</font></a></li>";
			}

			mysql_free_result($result);
			?>
			</ul>
		</div>

		<br>
		<div data-role="collapsible-set" data-theme="c" data-content-theme="d" data-collapsed-icon="plus" data-expanded-icon="arrow-d">
		<div data-role="collapsible" data-collapsed="true">
			<h3><?=$lang['ADMIN_NEW_JORNADA']?></h3>
			<form action="newJornada.php" onsubmit="return validateForm()" method="post" data-ajax="false">
				<input type="hidden" name="lligaId" value="<?=$lligaId?>" />
				<input type="hidden" name="temporadaId" value="<?=$temporadaId?>" />
				<input type="hidden" name="rondaId" value="<?=$rondaId?>" />
				<input type="hidden" name="grupId" value="<?=$grupId?>" />

				<label for="dataInici"><?=$lang['ADMIN_ORD_JORNADA']?> (1, 2, 3, ...)</label>
				<input type="text" name="ordreJornada" id="ordreJornada" />
				<label for="dataInici"><?=$lang['DATA_INICI']?></label> <input type="date" name="dataInici" id="dataInici" data-theme="e" />
				<label for="dataFi"><?=$lang['DATA_FI']?></label> <input type="date" name="dataFi" id="dataFi" data-theme="e" />
				<br>
				<input type="submit" value="<?=$lang['GUARDAR']?>" name="guardar" data-theme="e" />
			</form>
		</div>
		</div>

		<h2><?=$lang['ADMIN_JUGADORS']?></h2>

		<div data-role="collapsible-set" data-theme="c" data-content-theme="d" data-collapsed-icon="arrow-r" data-expanded-icon="arrow-d">

			<ul data-role="listview" data-inset="true">
			<?
			// Bucle jugadors
			while($jugador = mysql_fetch_array($jugadors))
			{
				echo "<li data-icon=\"minus\"><a href=\"esborraJugadorGrup.php?jugadorId=".$jugador["JugadorId"]."&lligaId=$lligaId&temporadaId=$temporadaId&rondaId=$rondaId&grupId=$grupId\" data-rel=\"dialog\" data-ajax=\"false\">".$jugador["JugadorNom"]."</a></li>";
			}

			mysql_free_result($jugadors);
			?>
			</ul>
		</div>

		<a href="#popupJugadorsLliga" data-rel="popup" data-role="button" data-inline="true" data-transition="pop" data-theme="e"><?=$lang['ADMIN_ADD_JUGADOR']?></a>
		<div data-role="popup" id="popupJugadorsLliga" data-theme="d">
		        <ul data-role="listview" data-inset="true" data-theme="d">

		            <li data-role="divider" data-theme="e"><?=$lang['ADMIN_ADD_JUGADOR']?></li>
					<?
					// Bucle jugadors
					while($jugadorLliga = mysql_fetch_array($jugadorsLliga))
					{
						echo "<li><a href=\"javascript:addRemoveJugador('add',".$jugadorLliga["JugadorId"].")\" data-ajax=\"false\">".$jugadorLliga["JugadorNom"]."</a></li>";
					}

					mysql_free_result($jugadorsLliga);
					?>
		        </ul>
		</div>

	</div><!-- /content -->

	<form action="saveGrupJugador.php" method="post" data-ajax="false" name="formulari" id="formulari">
		<input type="hidden" name="lligaId" value="<?=$lligaId?>" />
		<input type="hidden" name="temporadaId" value="<?=$temporadaId?>" />
		<input type="hidden" name="rondaId" value="<?=$rondaId?>" />
		<input type="hidden" name="grupId" value="<?=$grupId?>" />

		<input type="hidden" name="accio" value="" />
		<input type="hidden" name="jugadorId" value="" />
	</form>

	<?php include '../includes/footer_menu.php';?>

</div><!-- /page -->
</body>
</html>
<?}?>