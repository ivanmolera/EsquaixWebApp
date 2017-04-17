<?

// Faig l'include de la classe userCookie
require("userCookie.php");

/**
 *	Member's area access manager
 *
 *  @author Ivan Molera
 */
class userAccess
{
	private $email_;
	private $password_;
	private $ip_;

    /**
     * Constructor, initializes some private variables
     *
     * @return nothing
     */
	function __construct()
	{
		$this->email_ 		= "" ;
		$this->password_ 	= "" ;
		$this->ip_ 			= "" ;

		$this->DBServer_ 	= "rdbms.strato.de" ;
		$this->DBName_ 		= "" ;
		$this->DBUsername_ 	= "" ;
		$this->DBPassword_ 	= "" ;
	}


    /**
     * Checks if an user have authorization to stay in the member's area
     *
     * @return TRUE / FALSE
     */
	function checkAuth( $exception )
	{
		// Comprovo si l'usuari està autentificat
		if( isset( $_COOKIE["userID_squash"] ) || isset( $exception ) )
		{
			RETURN TRUE;
		}
		// Si no, envio a una pàgina d'error amb una loginbox
		else
		{
			// Error d'usuari no autentificat
			Header( "Location: /index.php" );

			RETURN FALSE;
		}
	}

	// S'ha convertit en la validació d'Administrador
	function checkCapita( $exception )
	{
		// Comprovo si l'usuari es capita
		if( isset( $_COOKIE["capita_squash"] ) || isset( $exception ) )
		{
			if( $_COOKIE["capita_squash"] == 1 || isset( $exception ) )
			{
				RETURN TRUE;
			}
			else
			{
				RETURN FALSE;
			}
		}
	}

	// Comprovo si l'usuari té permisos de capità d'equip
	function checkCapitaEquip($grupId, $equipId)
	{
		// Faig un connect manual a la BD
		mysql_pconnect( $this->DBServer_ , $this->DBUsername_ , $this->DBPassword_ );

		// Faig la query per buscar el capità
		$query ="SELECT COUNT(*) AS capita ".
				"FROM REL_EQUIPS_JUGADORS ".
				"WHERE EquipJugadorGrupId = ".$grupId." ".
				"AND EquipJugadorEquipId = ".$equipId." ".
				"AND EquipJugadorJugadorId = ".$_COOKIE["userID_squash"]." ".
				"AND EquipJugadorCapita = 1";

		$row = @mysql_fetch_array( mysql_db_query( $this->DBName_ , $query ) );

		// Desconnecto de la BD
		//mysql_close();

		if($row["capita"] == 1) {
			$retorn = true;
		}
		else {
			$retorn = false;
		}
		mysql_data_seek( $row, 0 );

		return $retorn;
	}

	// Comprovo si l'usuari té permisos per administrar la lliga
	function checkAdminLliga($lligaId)
	{
		// Faig un connect manual a la BD
		mysql_pconnect( $this->DBServer_ , $this->DBUsername_ , $this->DBPassword_ );

		// Faig la query per buscar el capità
		$query ="SELECT COUNT(*) AS administrador ".
				"FROM LLIGUES ".
				"WHERE LligaId = ".$lligaId." ".
				"AND LligaAdministrador = ".$_COOKIE["userID_squash"];

		$row = @mysql_fetch_array( mysql_db_query( $this->DBName_ , $query ) );

		// Desconnecto de la BD
		//mysql_close();

		if($row["administrador"] == 1) {
			$retorn = true;
		}
		else {
			$retorn = false;
		}
		mysql_data_seek( $row, 0 );

		return $retorn;
	}

    /**
     * Logs in an user into the member's area
     *
     * @param username of the user
     * @param password of the user
     * @param ip address of the user
     * @return TRUE / FALSE
     */
	function Login( $email , $password , $ip )
	{

		$this->email_ 		= $email ;
		$this->password_ 	= $password ;
		$this->ip_ 			= $ip ;

		// Faig un connect manual a la BD
		mysql_pconnect( $this->DBServer_ , $this->DBUsername_ , $this->DBPassword_ );


		// Faig la query que em retornarà un array de dades
		$query = "SELECT JugadorId, JugadorPassword, JugadorCognom1, JugadorNom, JugadorCapita FROM JUGADORS WHERE JugadorEmail ='".$this->email_."'";

		$row = @mysql_fetch_array( mysql_db_query( $this->DBName_ , $query ) );

		// Desconnecto de la BD
		mysql_close();

		$userID	= $row["JugadorId"] ;
		$nom 	= $row["JugadorCognom1"].", ".$row["JugadorNom"] ;

		$capita = $row["JugadorCapita"];

		$hash = $row["JugadorPassword"];

		// Comparo el password passat per formulari amb el password emmagatzemat a la BD
		if( $this->validatePassword( $password, $hash ) )
		{
			// Creo l'objecte cookie
			$userCookie = new userCookie( );

			// Li poso la cookie d'usuari autoritzat
			$userCookie->cookieAuthUser( $userID , $this->email_ , $nom, $capita );

			// Li poso la cookie amb el seu nom
			$userCookie->setCookieName( $nom );

			RETURN TRUE;
		}
		else
		{
			RETURN FALSE;
		}

	}


    /**
     * Logs off an user from the member's area
     *
     * @return TRUE / FALSE
     */
	function Logoff()
	{
		$userID = $_COOKIE["userID_squash"];

		// Comprovo si l'usuari està autentificat i li faig el logoff
		if( @is_array( $_COOKIE ) )
		{
			$userCookie = new userCookie();
			$userCookie->cookieLogoff();

			RETURN TRUE ;
		}
		// Si no, no faig res
		else
		{
			RETURN FALSE;
		}
	}



    /**
     * Creates 5-by-the-face-MD5 passwords
     *
     * @param password
     * @return hash
     */
	function hashPassword( $password )
	{
		// Xifro el password passat
		$aux = $password.$password.$password.$password.$password ;
		$hash = md5( md5( md5( md5( md5( $aux ) ) ) ) );

/* FALTA INSTAL·LAR LA LLIBRERIA MHASH
		mt_srand( ( double )microtime( ) * 1000000 );
		$salt = mhash_keygen_s2k( MHASH_SHA1, $password, substr( pack( 'h*', md5( mt_rand( ) ) ), 0, 8), 4);
		$hash = "{SSHA}".base64_encode( mhash( MHASH_SHA1, $password.$salt ).$salt );
*/


		RETURN $hash;
	}


    /**
     * Validates an user's password
     *
     * @param password
     * @param hash
     * @return TRUE / FALSE
     */
	function validatePassword( $password, $hash )
	{
		if ( strcmp( $this->hashPassword( $password ), $hash ) == 0 )
			RETURN TRUE;
		else
			RETURN FALSE;

/* FALTA INSTAL·LAR LA LLIBRERIA MHASH
		$hash = base64_decode( substr( $hash, 6 ) );
		$original_hash = substr( $hash, 0, 20 );
		$salt = substr( $hash, 20 );
		$new_hash = mhash( MHASH_SHA1, $password . $salt );
*/

	}


    /**
     * Changes an user's password
     *
     * @param userID
     * @param hash
     * @return TRUE / FALSE
     */
	function changePassword( $userID, $hash )
	{
		// Faig un connect manual a la BD
		mysql_pconnect( $this->DBServer_ , $this->DBUsername_ , $this->DBPassword_ );

		// Faig la query per actualitzar el password
		$query = "UPDATE Jugadors SET JugadorPassword='$hash' WHERE JugadorId='".$userID."'";

		$row = mysql_db_query( $this->DBName_ , $query );

		// Desconnecto de la BD
		mysql_close();

		RETURN TRUE;
	}

}

?>