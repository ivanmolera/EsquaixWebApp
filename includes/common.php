<?php
session_start();
header('Content-Type: text/html; charset=ISO-8859-1');
header('Cache-control: private'); // IE 6 FIX

$lligaId = null;
if(isSet($_GET['lligaId']))
{
	$lligaId = $_GET['lligaId'];
	$_SESSION['lligaId'] = $lligaId;
	setcookie('lligaId', $lligaId, time() + (3600 * 24 * 30));
}
else {
	if(isSet($_SESSION['lligaId']))
	{
		$lligaId = $_SESSION['lligaId'];
		setcookie('lligaId', $lligaId, time() + (3600 * 24 * 30));
	}
	else if(isSet($_COOKIE['lligaId'])){
		$lligaId = $_COOKIE['lligaId'];
		$_SESSION['lligaId'] = $_COOKIE['lligaId'];
	}
}

$temporadaId = null;
if(isSet($_GET['temporadaId']))
{
	$temporadaId = $_GET['temporadaId'];
	$_SESSION['temporadaId'] = $temporadaId;
	setcookie('temporadaId', $temporadaId, time() + (3600 * 24 * 30));
}
else {
	if(isSet($_SESSION['temporadaId']))
	{
		$temporadaId = $_SESSION['temporadaId'];
		setcookie('temporadaId', $temporadaId, time() + (3600 * 24 * 30));
	}
	else if(isSet($_COOKIE['temporadaId'])){
		$temporadaId = $_COOKIE['temporadaId'];
		$_SESSION['temporadaId'] = $_COOKIE['temporadaId'];
	}
}

if(isSet($_COOKIE['lang']))
{
	$langu = $_COOKIE['lang'];
}
else if(isSet($_SESSION['lang']))
{
	$langu = $_SESSION['lang'];
}
else if(isSet($_GET['lang']))
{
	$langu = $_GET['lang'];

	// register the session and set the cookie
	$_SESSION['lang'] = $langu;

	setcookie('lang', $langu, time() + (3600 * 24 * 30));
}
else
{
	$langu = substr($_SERVER["HTTP_ACCEPT_LANGUAGE"],0,2);
}

switch ($langu) {
	case 'en':
		$lang_file = 'lang.en.php';
		$lang_txt  = 'en';
	break;

	case 'ca':
		$lang_file = 'lang.ca.php';
		$lang_txt  = 'ca';
	break;

	case 'es':
		$lang_file = 'lang.es.php';
		$lang_txt  = 'es';
	break;

	default:
		$lang_file = 'lang.en.php';
		$lang_txt  = 'en';
}

include_once 'languages/'.$lang_file;

?>