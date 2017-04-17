<?
if(isset($_GET["page"])) {
	$page = $_GET["page"];
}

echo returnPage($page);

function returnPage ($page) {
	
	$json = "{".
			"	\"books\": [{";

	switch ($page) {
		case 1:
			$json = $json .
			"		\"title\": \"La perfumista\",".
			"		\"thumbnail\": \"http://ecx.images-amazon.com/images/I/419sEaadqvL._SL160_PIsitb-sticker-arrow-dp,TopRight,12,-18_SH30_OU30_AA160_.jpg\",".
			"		\"author\": \"Mabela Ruiz-Gallardón\"".
			"	},{".
			"		\"title\": \"Quédate conmigo\",".
			"		\"thumbnail\": \"http://ecx.images-amazon.com/images/I/516P5pZZgSL._SL160_PIsitb-sticker-arrow-dp,TopRight,12,-18_SH30_OU30_AA160_.jpg\",".
			"		\"author\": \"Ana García\"".
			"	},{".
			"		\"title\": \"El marciano\",".
			"		\"thumbnail\": \"http://ecx.images-amazon.com/images/I/51ZUbE5kvuL._SL160_PIsitb-sticker-arrow-dp,TopRight,12,-18_SH30_OU30_AA160_.jpg\",".
			"		\"author\": \"Andy Weir\"".
			"	},{".
			"		\"title\": \"El regreso del Catón\",".
			"		\"thumbnail\": \"http://ecx.images-amazon.com/images/I/51kbmUSr49L._SL160_PIsitb-sticker-arrow-dp,TopRight,12,-18_SH30_OU30_AA160_.jpg\",".
			"		\"author\": \"Matilde Asensi\"";
			break;
		
		case 2:
			$json = $json .
			"		\"title\": \"Cicatriz\",".
			"		\"thumbnail\": \"http://ecx.images-amazon.com/images/I/4198adeE2AL._SL160_PIsitb-sticker-arrow-dp,TopRight,12,-18_SH30_OU30_AA160_.jpg\",".
			"		\"author\": \"Juan Gómez-Jurado\"".
			"	},{".
			"		\"title\": \"Las tres heridas\",".
			"		\"thumbnail\": \"http://ecx.images-amazon.com/images/I/51INft64fJL._SL160_PIsitb-sticker-arrow-dp,TopRight,12,-18_SH30_OU30_AA160_.jpg\",".
			"		\"author\": \"Paloma Sánchez-Garnica\"".
			"	},{".
			"		\"title\": \"El regreso del Catón\",".
			"		\"thumbnail\": \"http://ecx.images-amazon.com/images/I/51kbmUSr49L._SL160_PIsitb-sticker-arrow-dp,TopRight,12,-18_SH30_OU30_AA160_.jpg\",".
			"		\"author\": \"Matilde Asensi\"".
			"	},{".
			"		\"title\": \"El marciano\",".
			"		\"thumbnail\": \"http://ecx.images-amazon.com/images/I/51ZUbE5kvuL._SL160_PIsitb-sticker-arrow-dp,TopRight,12,-18_SH30_OU30_AA160_.jpg\",".
			"		\"author\": \"Andy Weir\"";
			break;
		case 3:
			$json = $json .
			"		\"title\": \"La perfumista\",".
			"		\"thumbnail\": \"http://ecx.images-amazon.com/images/I/419sEaadqvL._SL160_PIsitb-sticker-arrow-dp,TopRight,12,-18_SH30_OU30_AA160_.jpg\",".
			"		\"author\": \"Mabela Ruiz-Gallardón\"".
			"	},{".
			"		\"title\": \"Quédate conmigo\",".
			"		\"thumbnail\": \"http://ecx.images-amazon.com/images/I/516P5pZZgSL._SL160_PIsitb-sticker-arrow-dp,TopRight,12,-18_SH30_OU30_AA160_.jpg\",".
			"		\"author\": \"Ana García\"".
			"	},{".
			"		\"title\": \"El marciano\",".
			"		\"thumbnail\": \"http://ecx.images-amazon.com/images/I/51ZUbE5kvuL._SL160_PIsitb-sticker-arrow-dp,TopRight,12,-18_SH30_OU30_AA160_.jpg\",".
			"		\"author\": \"Andy Weir\"".
			"	},{".
			"		\"title\": \"El regreso del Catón\",".
			"		\"thumbnail\": \"http://ecx.images-amazon.com/images/I/51kbmUSr49L._SL160_PIsitb-sticker-arrow-dp,TopRight,12,-18_SH30_OU30_AA160_.jpg\",".
			"		\"author\": \"Matilde Asensi\"";
			break;
		
		case 4:
			$json = $json .
			"		\"title\": \"Cicatriz\",".
			"		\"thumbnail\": \"http://ecx.images-amazon.com/images/I/4198adeE2AL._SL160_PIsitb-sticker-arrow-dp,TopRight,12,-18_SH30_OU30_AA160_.jpg\",".
			"		\"author\": \"Juan Gómez-Jurado\"".
			"	},{".
			"		\"title\": \"Las tres heridas\",".
			"		\"thumbnail\": \"http://ecx.images-amazon.com/images/I/51INft64fJL._SL160_PIsitb-sticker-arrow-dp,TopRight,12,-18_SH30_OU30_AA160_.jpg\",".
			"		\"author\": \"Paloma Sánchez-Garnica\"".
			"	},{".
			"		\"title\": \"El regreso del Catón\",".
			"		\"thumbnail\": \"http://ecx.images-amazon.com/images/I/51kbmUSr49L._SL160_PIsitb-sticker-arrow-dp,TopRight,12,-18_SH30_OU30_AA160_.jpg\",".
			"		\"author\": \"Matilde Asensi\"".
			"	},{".
			"		\"title\": \"El marciano\",".
			"		\"thumbnail\": \"http://ecx.images-amazon.com/images/I/51ZUbE5kvuL._SL160_PIsitb-sticker-arrow-dp,TopRight,12,-18_SH30_OU30_AA160_.jpg\",".
			"		\"author\": \"Andy Weir\"";
			break;
		case 5:
			$json = $json .
			"		\"title\": \"La perfumista\",".
			"		\"thumbnail\": \"http://ecx.images-amazon.com/images/I/419sEaadqvL._SL160_PIsitb-sticker-arrow-dp,TopRight,12,-18_SH30_OU30_AA160_.jpg\",".
			"		\"author\": \"Mabela Ruiz-Gallardón\"".
			"	},{".
			"		\"title\": \"Quédate conmigo\",".
			"		\"thumbnail\": \"http://ecx.images-amazon.com/images/I/516P5pZZgSL._SL160_PIsitb-sticker-arrow-dp,TopRight,12,-18_SH30_OU30_AA160_.jpg\",".
			"		\"author\": \"Ana García\"".
			"	},{".
			"		\"title\": \"El marciano\",".
			"		\"thumbnail\": \"http://ecx.images-amazon.com/images/I/51ZUbE5kvuL._SL160_PIsitb-sticker-arrow-dp,TopRight,12,-18_SH30_OU30_AA160_.jpg\",".
			"		\"author\": \"Andy Weir\"".
			"	},{".
			"		\"title\": \"El regreso del Catón\",".
			"		\"thumbnail\": \"http://ecx.images-amazon.com/images/I/51kbmUSr49L._SL160_PIsitb-sticker-arrow-dp,TopRight,12,-18_SH30_OU30_AA160_.jpg\",".
			"		\"author\": \"Matilde Asensi\"";
			break;
		
		case 6:
			$json = $json .
			"		\"title\": \"Cicatriz\",".
			"		\"thumbnail\": \"http://ecx.images-amazon.com/images/I/4198adeE2AL._SL160_PIsitb-sticker-arrow-dp,TopRight,12,-18_SH30_OU30_AA160_.jpg\",".
			"		\"author\": \"Juan Gómez-Jurado\"".
			"	},{".
			"		\"title\": \"Las tres heridas\",".
			"		\"thumbnail\": \"http://ecx.images-amazon.com/images/I/51INft64fJL._SL160_PIsitb-sticker-arrow-dp,TopRight,12,-18_SH30_OU30_AA160_.jpg\",".
			"		\"author\": \"Paloma Sánchez-Garnica\"".
			"	},{".
			"		\"title\": \"El regreso del Catón\",".
			"		\"thumbnail\": \"http://ecx.images-amazon.com/images/I/51kbmUSr49L._SL160_PIsitb-sticker-arrow-dp,TopRight,12,-18_SH30_OU30_AA160_.jpg\",".
			"		\"author\": \"Matilde Asensi\"".
			"	},{".
			"		\"title\": \"El marciano\",".
			"		\"thumbnail\": \"http://ecx.images-amazon.com/images/I/51ZUbE5kvuL._SL160_PIsitb-sticker-arrow-dp,TopRight,12,-18_SH30_OU30_AA160_.jpg\",".
			"		\"author\": \"Andy Weir\"";
			break;
	}

	$json = $json . 
			"	}]".
			"}";

	return $json;
}
?>
