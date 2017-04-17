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
	if(@$userAccess->checkCapita()) {
		$query = "SELECT * FROM LLIGUES ORDER BY LligaNom";
	}
	else if(@$userAccess->checkAdminLliga($lligaId)) {
		$query = "SELECT * FROM LLIGUES WHERE LligaId = ".$lligaId;
	}
	else {
		Header( "Location: ../index.php" );
	}

	$result = $bdMysql->Query($query);
?>
<!DOCTYPE html>
<html>
<head>
	<?php include 'header_includes.php';?>
</head>
<body>
<div data-role="page" class="jqm-demos jqm-demos-index">

	<?php include '../includes/header_menu.php';?>

	<div data-role="header" data-theme="d">
        <h1><?=$lang['ADMIN_TITOL']?></h1>
	</div><!-- /header -->

	<div data-role="content" class="jqm-content">

		<h1><?=$lang['ADMIN_ADMIN_LLIGA']?></h1>

		<div data-role="collapsible-set" data-theme="c" data-content-theme="d" data-collapsed-icon="arrow-r" data-expanded-icon="arrow-d">

			<ul data-role="listview" data-inset="true">
			<?
			// Bucle lligues
			while($lliga = mysql_fetch_array($result))
			{
				echo "<li><a href=\"adminLliga.php?lligaId=".$lliga["LligaId"]."\" data-transition=\"flip\" data-inline=\"true\">".$lliga["LligaNom"]."</a></li>";
			}

			mysql_free_result($result);
			?>
				</ul>
		</div>

		<br><br>
		<a href="../index.php" data-role="button" data-theme="b"><?=$lang['TORNAR']?></a>

	</div><!-- /content -->

	<?php include '../includes/footer_menu.php';?>

</div><!-- /page -->
</body>
</html>
<?}?>