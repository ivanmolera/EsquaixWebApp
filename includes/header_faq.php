<?
// Faig l'include de la classe MySQL
require("classes/bdMysql.php");

// Creo l'objecte
$bdMysql = new bdMysql();

// Connecto a la BDD
$bdMysql->Connecta();

// Faig la query de faqs
$faqs = $bdMysql->Query("SELECT * FROM Faqs");
?>
	  <table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
		  <tr>
			<td colspan="2">Faqs</td>
		  </tr>
		  <tr>
		  	<td>FaqId</td>
		  	<td>FaqPregunta</td>
		  	<td>FaqResposta</td>
		  </tr>
<?
while($row = mysql_fetch_array($faqs))
{
?>
		  <tr>
		    <td><?=$row["FaqId"]?></td>
		    <td><?=$row["FaqPregunta"]?></td>
		    <td><?=$row["FaqResposta"]?></td>
		  </tr>
<?
}
mysql_free_result($faqs);
?>
		</table>
