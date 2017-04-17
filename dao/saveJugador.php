<?
// Faig l'include de la classe MySQL
require("../classes/bdMysql.php");

// Faig l'include de la classe userAccess
require("../classes/userAccess.php");

$userAccess = new userAccess();

// Comprovo si l'usuari esta autentificat
@$userAccess->checkAuth();

// Creo l'objecte
$bdMysql = new bdMysql();

// Connecto a la BD
$bdMysql->Connecta();

$dataNaixement = NULL;

// Li dono la volta a la data per fer l'insert
if(isset($_POST["dataNaixement"])) {
	//$arrayData = explode("-", $_POST["dataNaixement"]);
	//$dataNaixement = $arrayData[2]."-".$arrayData[1]."-".$arrayData[0];
	$dataNaixement = $_POST["dataNaixement"];
}

$pes = NULL;
if(isset($_POST["pes"])) {
	$pes 		= $_POST["pes"];
}

$alsada = NULL;
if(isset($_POST["alsada"])) {
	$alsada 	= $_POST["alsada"];
}

$id		 	= $_POST["id"];
$nom 		= $_POST["nom"];
$cognom1 	= $_POST["cognom1"];
$cognom2 	= $_POST["cognom2"];
$ma 		= $_POST["ma"];
$email 		= $_POST["email"];
$telefon 	= $_POST["telefon"];
$telefonMobil 	= $_POST["telefonMobil"];
$capita 	= $_POST["capita"];
$lesionat 	= $_POST["lesionat"];
$contacte 	= $_POST["contacte"];

// Password
if(isset($_POST["password"]) && $_POST["password"] != "") {

	if($_POST["password"] == $_POST["rpassword"]) {
		$password = @$userAccess->hashPassword($_POST["password"]);
		$query = "UPDATE JUGADORS SET JugadorPassword = '$password' WHERE JugadorId = $id";
		$bdMysql->Query( $query );
	}
	else {
		header("Location: ../editaJugador.php?jugadorId=".$id."&msg=pwdKO");
	}
}

//$membre = $_COOKIE["userID_squash"];


// UPLOAD de la foto

// Directori on s'ha de fer l'upload
$uploadDir = "../fotos/";
$uploadFile = $uploadDir . $id . $_FILES['foto']['name'];

$location = "fotos/" . $id . $_FILES['foto']['name'];

// Miro si el camp foto és buit
// Si està buit no faig insert de la foto
if( $_FILES['foto']['name'] == "" )
	$query = "UPDATE JUGADORS SET JugadorNom = '$nom', JugadorCognom1 = '$cognom1', JugadorCognom2 = '$cognom2', JugadorMa = '$ma', JugadorDataNaixement='$dataNaixement', JugadorAlsada = '$alsada', JugadorPes = '$pes', JugadorEmail = '$email', JugadorTelefon = '$telefon', JugadorTelefonMobil = '$telefonMobil', JugadorCapita = '$capita', JugadorLesionat = '$lesionat', JugadorMostrarDadesContacte = '$contacte' WHERE JugadorId = $id";

// Si conté alguna cosa faig l'upload de la foto i després l'insert
else
{
	if(move_uploaded_file($_FILES['foto']['tmp_name'], $uploadFile))
	{
		$query = "UPDATE JUGADORS SET JugadorFoto = '$location', JugadorNom = '$nom', JugadorCognom1 = '$cognom1', JugadorCognom2 = '$cognom2', JugadorMa = '$ma', JugadorDataNaixement='$dataNaixement', JugadorAlsada = '$alsada', JugadorPes = '$pes', JugadorEmail = '$email', JugadorTelefon = '$telefon', JugadorTelefonMobil = '$telefonMobil', JugadorCapita = '$capita', JugadorLesionat = '$lesionat', JugadorMostrarDadesContacte = '$contacte' WHERE JugadorId = $id";
	}
	else
	{
		echo "loc=".$location;
		print "<pre>";
		print "Possible file upload attack!<BR>Here's some debugging info:\n";
		print_r($_FILES);
		print "</pre>";
	}
}

// Faig la query que em retornarà un array de dades
$result = $bdMysql->Query( $query );

// Desconnecto de la BD
$bdMysql->Desconnecta();

header("Location: ../detallJugador.php?jugadorId=".$id);
?>