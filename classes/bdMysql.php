<?

/**
 *	MySQL DataBase Manager
 *
 *	@param	DBServer_		address of the DataBase Server
 *	@param	DBUsername_		username to log in the DataBase
 *  @param  DBPassword_		password to log in the DataBase
 *  @param  DBName_			name of the DataBase
 *  @param  status_			status of the connection with the DataBase
 *  @author Ivan Molera
 */
class bdMysql
{

	private $DBServer_;
	private $DBUsername_;
	private $DBPassword_;
	private $DBName_;
	private $status_;


    /**
     * Constructor, initializes some private variables
     *
     * @return nothing
     */
	function __construct()
	{
		$this->DBServer_ 	= "rdbms.strato.de" ;
		$this->DBName_ 		= "" ;
		$this->DBUsername_ 	= "" ;
		$this->DBPassword_ 	= "" ;
	}


    /**
     * Connects with the DB
     *
     * @return status of the connection
     */
	function Connecta()
	{
		$this->status_ = mysql_pconnect( $this->DBServer_ , $this->DBUsername_ , $this->DBPassword_ );
		RETURN $this->status_;
	}


    /**
     * Disconnect with the DB
     *
     * @return status of the connection
     */
	function Desconnecta()
	{
		$this->status_ = mysql_close();
		RETURN $this->status_;
	}


    /**
     * Petition of a simple SQL query
     *
     * @param query SQL
     * @return result of the query
     */
	function Query( $query )
	{
		RETURN mysql_db_query( $this->DBName_ , $query ) ;
	}


    /**
     * Petition of a SQL query that returns an array of data
     *
     * @param query SQL
     * @return array result of the query
     */
	function aQuery( $query )
	{
		RETURN @mysql_fetch_array( mysql_db_query( $this->DBName_ , $query ) );
	}

	function JEncode($arr){
	    if (version_compare(PHP_VERSION,"5.2","<"))
	    {
	    	require_once("JSON.php");   //if php<5.2 need JSON class
			$json = new Services_JSON();  //instantiate new json object
			$data=$json->encode($arr);    //encode the data in json format
	    }
	    else
	    {
			$data = json_encode($arr);    //encode the data in json format
	    }
	    return $data;
	}

	// Encodes a YYYY-MM-DD into a MM-DD-YYYY string
	function codeDate ($date) {
		$tab = explode ("-", $date);
		$r = $tab[1]."/".$tab[2]."/".$tab[0];
		return $r;
	}
}

?>