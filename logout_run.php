<?
// Faig l'include de la classe userAccess
require("classes/userAccess.php");

// Creo l'objecte userAccess
$userAccess = new userAccess();

// Intento fer logout
$userAccess->Logoff();

Header( "Location: index.php" );
?>
