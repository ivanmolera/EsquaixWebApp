<?
// Faig l'include de la classe MySQL
require("classes/bdMysql.php");

// Creo l'objecte
$bdMysql = new bdMysql();

// Connecto a la BDD
$bdMysql->Connecta();

// Faig la query de paraules
$paraules = $bdMysql->Query("SELECT * FROM Paraules");
?>
	  <table width="100%" border="0" align="center" cellpadding="0" cellspacing="0">
		  <tr>
			<td colspan="2">Glossari</td>
		  </tr>
		  <tr>
		  	<td>ParaulaId</td>
		  	<td>ParaulaNom</td>
		  	<td>ParaulaDescripció</td>
		  </tr>
<?
while($row = mysql_fetch_array($paraules))
{
?>
		  <tr>
		    <td><?=$row["ParaulaId"]?></td>
		    <td><?=$row["ParaulaNom"]?></td>
		    <td><?=$row["ParaulaDescripcio"]?></td>
		  </tr>
<?
}
mysql_free_result($paraules);
?>
		</table>
