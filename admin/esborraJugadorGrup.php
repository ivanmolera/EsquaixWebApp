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
	$jugadorId = $_GET["jugadorId"];
?>
<!DOCTYPE html>
<html>
<head>
	<?php include 'header_includes.php';?>
</head>
<body>

<div data-role="page" class="jqm-demos jqm-demos-index">
	<div data-role="content" class="jqm-content">

	<?=$lang['ADMIN_JUG_REMOVE']?>

	<br><br>
	<a href="javascript:addRemoveJugador('remove',<?=$jugadorId?>);" data-role="button" data-ajax="false"><?=$lang['SI']?></a>
	<br>
	<a href="adminGrup.php?lligaId=<?=$lligaId?>&temporadaId=<?=$temporadaId?>&rondaId=<?=$rondaId?>&grupId=<?=$grupId?>" data-role="button" data-ajax="false"><?=$lang['NO']?></a>

	</div>
</div>

	<form action="saveGrupJugador.php" method="post" data-ajax="false" name="formulari" id="formulari">
		<input type="hidden" name="lligaId" value="<?=$lligaId?>" />
		<input type="hidden" name="temporadaId" value="<?=$temporadaId?>" />
		<input type="hidden" name="rondaId" value="<?=$rondaId?>" />
		<input type="hidden" name="grupId" value="<?=$grupId?>" />

		<input type="hidden" name="accio" value="" />
		<input type="hidden" name="jugadorId" value="" />
	</form>

</body>
</html>
<?}?>