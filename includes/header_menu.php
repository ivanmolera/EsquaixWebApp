<?
if($lligaId != null) {
	$lliga = $bdMysql->aQuery("SELECT LligaId, LligaNom, LligaPerEquips, LligaDescripcio FROM LLIGUES WHERE LligaId = ".$lligaId);

	$temp_r = $bdMysql->Query("SELECT TemporadaId, TemporadaLligaId, TemporadaNom, TemporadaDescripcio FROM TEMPORADES WHERE TemporadaLligaId = ".$lligaId." ORDER BY TemporadaInici DESC");
}

$lligues_r = $bdMysql->Query(
"SELECT LligaId, LligaNom, LligaPerEquips, LligaDescripcio, MaxTemporadaId, LligaVisible ".
"FROM LLIGUES ".
"JOIN ( ".
"  SELECT TemporadaLligaId, MAX(TemporadaId) AS MaxTemporadaId ".
"  FROM TEMPORADES ".
"  GROUP BY TemporadaLligaId ".
") AS MAXTEMPORADES ON TemporadaLligaId = LligaId ".
"WHERE LligaVisible = 1 ".
"GROUP BY LligaId ".
"ORDER BY LligaNom");
?>

	<div data-role="panel" class="jqm-nav-panel jqm-navmenu-panel" data-position="left" data-display="reveal" data-theme="c">
        <ul data-role="listview" data-theme="d" data-divider-theme="d" data-icon="false" class="jqm-list">
        
        	<?if($lligaId != null) { ?>
            <li data-role="list-divider"><?=$lliga["LligaNom"]?></li>

            <?
            	$i = 0;
				while($temporades = mysql_fetch_array($temp_r))
				{
					if($i==0) {
						$temporadaId = $temporades["TemporadaId"];
						
						// Si no hi havia temporadaId setejo el max
						if(!isSet($_GET['temporadaId']) && !isSet($_SESSION['temporadaId']) && !isSet($_COOKIE['temporadaId']))
						{
							$_SESSION['temporadaId'] = $temporadaId;
							//setcookie('temporadaId', $temporadaId, time() + (3600 * 24 * 30));
						}
					}
					$i++;
					echo "<li><a href=\"index.php?lligaId=".$temporades["TemporadaLligaId"]."&temporadaId=".$temporades["TemporadaId"]."\" data-ajax=\"false\">".$temporades["TemporadaNom"]."</a></li>";
				}
			?>
			<?}?>
			
			<li data-role="list-divider"><?=$lang['LLIGUES_TITOL']?></li>
			<?
				while($lligues = mysql_fetch_array($lligues_r))
				{
					if($lligaId == $lligues["LligaId"]) {
						$temporadaId = $lligues["MaxTemporadaId"];
						$_SESSION['temporadaId'] = $temporadaId;
					}
					echo "<li><a href=\"index.php?lligaId=".$lligues["LligaId"]."&temporadaId=".$lligues["MaxTemporadaId"]."\" data-ajax=\"false\">".$lligues["LligaNom"]."</a></li>";
				}
			?>
        </ul>
	</div><!-- /panel -->