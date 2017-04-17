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

	// Creo l'objecte
	$bdMysql = new bdMysql();

	// Connecto a la BD
	$bdMysql->Connecta();

	// Faig el query
	$lliga = $bdMysql->aQuery("SELECT * FROM LLIGUES WHERE LligaId = ".$lligaId);
	$temporada = $bdMysql->aQuery("SELECT * FROM TEMPORADES WHERE TemporadaId = ".$temporadaId);
	$result = $bdMysql->Query("SELECT * FROM RONDES WHERE RondaTemporadaId = ".$temporadaId." ORDER BY RondaDataInici");

?>
<!DOCTYPE html>
<html>
<head>
	<?php include 'header_includes.php';?>
	<script type="text/javascript">
		function validateForm() {
	    	if(
	    		(document.getElementById("nomRonda").value != null && document.getElementById("nomRonda").value != "")
	    		&&
	    		(document.getElementById("dataFi").value != null && document.getElementById("dataFi").value != "")
	    		) {
	        	return true;
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
		<a href="adminLliga.php?lligaId=<?=$lligaId?>" data-icon="back" data-ajax="false"><?=$lang['TORNAR']?></a>
        <h1><?=$lang['ADMIN_TITOL']?></h1>
		<a href="index.php" data-icon="home" data-ajax="false"><?=$lang['MENU_HOME']?></a>
	</div><!-- /header -->

	<div data-role="content" class="jqm-content">

		<br>
		<ul data-role="listview" data-inset="true" data-icon="false">
			<li data-role="divider" data-theme="b"><?=$lliga["LligaNom"]?></li>
		    <li data-role="divider" data-theme="e"><?=$temporada["TemporadaDescripcio"]?></li>
		</ul>

		<div data-role="collapsible-set" data-theme="c" data-content-theme="d" data-collapsed-icon="arrow-r" data-expanded-icon="arrow-d">

			<ul data-role="listview" data-inset="true" id="rondes">
			<?
			// Bucle rondes
			while($ronda = mysql_fetch_array($result))
			{
				$phpdate1 = strtotime( $ronda['RondaDataInici'] );
				$phpdate2 = strtotime( $ronda['RondaDataFinal'] );
				$dia1  = date("d/m/y", $phpdate1);
				$dia2  = date("d/m/y", $phpdate2);

				echo "<li><a href=\"adminRonda.php?temporadaId=".$temporadaId."&rondaId=".$ronda["RondaId"]."\" data-transition=\"flip\" data-inline=\"true\">".$ronda["RondaNom"]."&nbsp;<font size=2>(".$dia1." al ".$dia2.")</font></a></li>";
			}

			mysql_free_result($result);
			?>
				</ul>
		</div>

		<br>
		<div data-role="collapsible-set" data-theme="c" data-content-theme="d" data-collapsed-icon="plus" data-expanded-icon="arrow-d">
		<div data-role="collapsible" data-collapsed="true">
			<h3><?=$lang['ADMIN_NEW_RONDA']?></h3>
			<form action="newRonda.php" onsubmit="return validateForm()" method="post" data-ajax="false">
				<input type="hidden" name="lligaId" value="<?=$lligaId?>" />
				<input type="hidden" name="temporadaId" value="<?=$temporadaId?>" />

				<label for="nomRonda"><?=$lang['ADMIN_NOM_RONDA']?>:</label>
				<input type="text" name="nomRonda" id="nomRonda" />
				<label for="dataInici"><?=$lang['DATA_INICI']?></label> <input type="date" name="dataInici" data-theme="e" />
				<label for="dataFi"><?=$lang['DATA_FI']?></label> <input type="date" name="dataFi" id="dataFi" data-theme="e" />
				<br>
				<input type="submit" value="<?=$lang['GUARDAR']?>" name="guardar" data-theme="e" />
			</form>
		</div>
		</div>

	</div><!-- /content -->

	<?php include '../includes/footer_menu.php';?>

</div><!-- /page -->
</body>
</html>
<?}?>