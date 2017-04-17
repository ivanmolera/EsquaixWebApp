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
?>
<!doctype html><html>
<head>

	<?php include 'includes/header_includes.php';?>

	<link rel="stylesheet" href="jquery/box/section_mobile-64ffa85e8823182c84957a82208d28dc.css" media="screen" />
	<script type="text/javascript" src="jquery/box/section_mobile-7a11caf6ae7e413a07a52b2bcfadbacd.js"></script>
	<script type="text/javascript" src="jquery/box/jquery.mobile-1.0b1.js"></script>
</head>
<body class="" topmargin="0">

	<div data-role="page" id="home">

		<center><h4><?=$lang['LLIGA_TITOL']?></h4></center>

		<div data-role="content">
			<center>
				<h4><a href="llistaEquips.php">Editar Equips</a></h4>
				<h4><a href="llistaJugadors.php">Editar Jugadors</a></h4>
				<h4><a href="llistaPartits.php">Editar Partits</a></h4>
			</center>
		</div>

		<div class="footer" data-role="footer" data-theme="c">
			<div class="ui-grid-b footer_links">
			<div class="ui-block-a">
				<a href="resultats.php" rel="external"><?=$lang['CLASS_TITOL']?></a>
			</div>
			<div class="ui-block-b">
				<a href="calendari.php" rel="external"><?=$lang['CALENDARI_TITOL']?></a>
			</div>
			<div class="ui-block-c">
				<a href="equips.php" rel="external"><?=$lang['EQUIPS_TITOL']?></a>
			</div>
		</div>

	&copy; 2013 owlab<br /><br />
	<br /><br /><br /><br />
</div>	</div>

</body></html>
<?}?>