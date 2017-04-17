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

$jugadorId = $_GET["jugadorId"];

if( isset( $_COOKIE["userID_squash"] ) ) {
	$idUsuari = $_COOKIE["userID_squash"];

	if(!@$userAccess->checkCapita()) {
		if($jugadorId != $idUsuari) {
			Header( "Location: /detallJugador.php?jugadorId=".$jugadorId );
		}
	}
}

// Faig el query
$jugador = $bdMysql->aQuery("SELECT JugadorId, JugadorNom, JugadorCognom1, JugadorCognom2, JugadorCapita, JugadorPes, JugadorAlsada, JugadorMa, JugadorTelefon, JugadorTelefonMobil, JugadorEmail, JugadorDataNaixement, DATE_FORMAT(JugadorDataNaixement,'%Y-%m-%d') AS dataOk, JugadorDataAlta, JugadorDataAcces, JugadorPassword, JugadorFoto, JugadorLesionat, JugadorMostrarDadesContacte FROM JUGADORS WHERE JugadorId = ".$jugadorId);

$msg = "";
if(isset($_GET["msg"])) {
	if($_GET["msg"] == "pwdKO") {
		$msg = "Els passwords no són correctes";
	}
}
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
        <h1><? echo $jugador["JugadorNom"]." ".$jugador["JugadorCognom1"]." ".$jugador["JugadorCognom2"]; ?></h1>
		<a href="index.php" data-icon="home"><?=$lang['MENU_HOME']?></a>
	</div><!-- /header -->

	<div data-role="content" class="jqm-content" >

		<br><br>

		<?
			if($msg != "") {
				echo "<h2><font color=red>".$msg."</font></h2>";
			}
		?>

					<form class="ui-body ui-body-b" action="dao/saveJugador.php" method="post" data-ajax="false" enctype="multipart/form-data">

						<center><img src="<?=$jugador['JugadorFoto']?>" width="280"/></center>
						<br><br>
						<input type="hidden" name="id" value="<?=$jugador['JugadorId']?>" />
						<label for="nom"> Foto:</label>
						<INPUT TYPE="file" NAME="foto" SIZE="30" MAXLENGTH="50">
						<label for="nom"> Nom:</label>
						<input type="text" name="nom" value="<?=$jugador['JugadorNom']?>" />
						<br>
						<label for="cognom1"> 1r cognom:</label>
						<input type="text" name="cognom1" value="<?=$jugador['JugadorCognom1']?>" />
						<br>
						<label for="cognom2"> 2n cognom:</label>
						<input type="text" name="cognom2" value="<?=$jugador['JugadorCognom2']?>" />
						<br>
						<label for="dataNaixement"> Data Naixement:</label>
						<input type="date" name="dataNaixement" placeholder="aaaa-mm-dd" value="<?=$jugador['dataOk']?>" />
						<br>
						<label for="pes"> Pes (Kg):</label>
						<input type="text" name="pes" value="<?=$jugador['JugadorPes']?>" />
						<br>
						<label for="alsada"> Alçada (cm):</label>
						<input type="text" name="alsada" value="<?=$jugador['JugadorAlsada']?>" />
						<br>
						<label for="ma"> Mà:</label>
						<fieldset data-role="controlgroup" data-type="horizontal" >
							<input type="radio" name="ma" id="maEsquerra" value="0" <? if($jugador['JugadorMa'] == "0") { echo " checked=\"checked\""; } ?>/>
						    <label for="maEsquerra">  Esquerrà</label>
						    <input type="radio" name="ma" id="maDreta" value="1" <? if($jugador['JugadorMa'] == "1") { echo " checked=\"checked\""; } ?>/>
						    <label for="maDreta">  Dretà</label>
						</fieldset>
						<br>
						<label for="telefon"> Telèfon:</label>
						<input type="text" name="telefon" value="<?=$jugador['JugadorTelefon']?>" maxlength="9" />
						<br>
						<label for="telefonMobil"> Telèfon mòbil:</label>
						<input type="text" name="telefonMobil" value="<?=$jugador['JugadorTelefonMobil']?>" maxlength="9" />
						<br>
						<label for="email"> E-mail:</label>
						<input type="email" name="email" value="<?=$jugador['JugadorEmail']?>" />
						<br>
						<label for="contacte">Vols mostrar les teves dades de contacte als altres usuaris registrats de l'aplicació?</label>
						<select id="contacte" name="contacte" data-role="slider">
						    <option value="0">No</option>
						    <option value="1" <? echo ($jugador['JugadorMostrarDadesContacte'] == 1) ? "selected=\"\"" : "" ;?>>Sí</option>
						</select>
						<br>
						<label for="password"> Password:</label>
						<input type="password" name="password" placeholder="Només per canviar el password" value="" />
						<br>
						<label for="password"> Repetir Password:</label>
						<input type="password" name="rpassword" placeholder="Només per canviar el password" value="" />
						<br>
						<label for="lesionat">Lesionat <img src="images/lesionat.png" width="18" height="18"/></label>
						<select id="lesionat" name="lesionat" data-role="slider">
						    <option value="0">No</option>
						    <option value="1" <? echo ($jugador['JugadorLesionat'] == 1) ? "selected=\"\"" : "" ;?>>Sí</option>
						</select>

						<? if($idUsuari == 7) { ?>
							<label for="capita">Administrador:</label>
							<select id="capita" name="capita" data-role="slider">
							    <option value="0">No</option>
							    <option value="1" <? echo ($jugador['JugadorCapita'] == 1) ? "selected=\"\"" : "" ;?>>Sí</option>
							</select>
						<?}?>

						<input type="submit" value="<?=$lang['GUARDAR']?>" name="guardar" data-theme="e" />
					</form>

					<a href="index.php" data-role="button" data-theme="b"><?=$lang['TORNAR']?></a>

	</div><!-- /content -->

	<?php include 'includes/footer_menu.php';?>

</div><!-- /page -->
</body>
</html>
<?}?>