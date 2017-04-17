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

	// Creo l'objecte
	$bdMysql = new bdMysql();

	// Connecto a la BD
	$bdMysql->Connecta();

	// Faig el query
	$lliga = $bdMysql->aQuery("SELECT * FROM LLIGUES WHERE LligaId = ".$lligaId);
	$temporada = $bdMysql->aQuery("SELECT * FROM TEMPORADES WHERE TemporadaId = ".$temporadaId);
	$ronda = $bdMysql->aQuery("SELECT * FROM RONDES WHERE RondaId = ".$rondaId);
	$result = $bdMysql->Query("SELECT * FROM GRUPS WHERE GrupRondaId = ".$rondaId." ORDER BY GrupOrdre");

?>
<!DOCTYPE html>
<html>
<head>
	<?php include 'header_includes.php';?>
	<script type="text/javascript">
		function validateForm() {
	    	if(
	    		(document.getElementById("nomGrup").value != null && document.getElementById("nomGrup").value != "")
	    		&&
	    		(document.getElementById("ordreGrup").value != null && document.getElementById("ordreGrup").value != "")
	    		) {
	    			if(!isNaN(document.getElementById("ordreGrup").value)) {
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
		<a href="adminTemporada.php?lligaId=<?=$lligaId?>&temporadaId=<?=$temporadaId?>" data-icon="back" data-ajax="false"><?=$lang['TORNAR']?></a>
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

		<div data-role="collapsible-set" data-theme="c" data-content-theme="d" data-collapsed-icon="arrow-r" data-expanded-icon="arrow-d">

			<ul data-role="listview" data-inset="true">
			<?
			// Bucle grups
			while($grup = mysql_fetch_array($result))
			{
				echo "<li><a href=\"adminGrup.php?temporadaId=".$temporadaId."&rondaId=".$rondaId."&grupId=".$grup['GrupId']."\" data-transition=\"flip\" data-inline=\"true\">".$grup['GrupDescripcio']."</a></li>";
			}

			mysql_free_result($result);
			?>
				</ul>
		</div>

		<br>
		<div data-role="collapsible-set" data-theme="c" data-content-theme="d" data-collapsed-icon="plus" data-expanded-icon="arrow-d">
		<div data-role="collapsible" data-collapsed="true">
			<h3><?=$lang['ADMIN_NEW_GRUP']?></h3>
			<form action="newGrup.php" onsubmit="return validateForm()" method="post" data-ajax="false">
				<input type="hidden" name="lligaId" value="<?=$lligaId?>" />
				<input type="hidden" name="temporadaId" value="<?=$temporadaId?>" />
				<input type="hidden" name="rondaId" value="<?=$rondaId?>" />

				<label for="nomRonda"><?=$lang['ADMIN_NOM_GRUP']?>:</label>
				<input type="text" name="nomGrup" id="nomGrup" />
				<label for="dataInici"><?=$lang['ADMIN_ORD_GRUP']?> (1, 2, 3, ...)</label>
				<input type="text" name="ordreGrup" id="ordreGrup" />
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