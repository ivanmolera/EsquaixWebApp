	<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
	<meta class="meta_disable_zoom" name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0">
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<title><?php echo $lang['PAGE_TITLE']; ?></title>
	<link rel="apple-touch-icon" href="images/squash_icon.png">
	<link rel="apple-touch-startup-image" href="../images/squash_icon.png" />
	<link rel="shortcut icon" href="../images/squash_icon.png">
	<link rel="icon" href="../images/favicon.ico">
	<link rel="stylesheet"  href="../jquery.mobile-1.3.0/demos/css/themes/default/jquery.mobile-1.3.0.css">
	<link rel="stylesheet" href="../jquery.mobile-1.3.0/demos/docs/_assets/css/jqm-demos.css">
    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Open+Sans:300,400,700">
    <style>
/* These apply across all breakpoints because they are outside of a media query */
/* Make the labels light gray all caps across the board */
.movie-list thead th,
.movie-list tbody th .ui-table-cell-label,
.movie-list tbody td .ui-table-cell-label {
    text-transform: uppercase;
    font-size: .6em;
    color: rgba(0,0,0,0.5);
    font-weight: normal;
}
/* White bg, large blue text for rank and title */
.movie-list tbody th {
    font-size: .9em;
    background-color: #fff;
    color: #77bbff;
    text-align: center;
}
/*  Add a bit of extra left padding for the title */
.movie-list tbody td.title {
    padding-left: .8em;
}
.movie-list tbody td.jugadors {
    font-size: .9em;
}

.resultats-list thead th,
.resultats-list tbody th .ui-table-cell-label {
    text-transform: uppercase;
    font-size: .6em;
    color: rgba(0,0,0,0.5);
    font-weight: normal;
}
.resultats-list tbody th {
    font-size: .9em;
    background-color: #fff;
    color: #77bbff;
    text-align: center;
}
.resultats-list tbody td {
    font-size: .6em;
    text-align: center;
}
.resultats-list tbody td.resultat {
    color: #77bbff;
}
    </style>
	<script src="../jquery.mobile-1.3.0/demos/js/jquery.js"></script>
	<script src="../jquery.mobile-1.3.0/demos/docs/_assets/js/jquery.mobile.demos.js"></script>
	<script src="../jquery.mobile-1.3.0/demos/js/jquery.mobile-1.3.0.js"></script>
    <script type="text/javascript">
        function addRemoveJugador(accio, jugador) {
            document.getElementById("formulari").elements["accio"].value = accio;
            document.getElementById("formulari").elements["jugadorId"].value = jugador;
            document.getElementById("formulari").submit();
        }
    </script>