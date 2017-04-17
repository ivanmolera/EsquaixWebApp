<?

/**
 *	User Cookie
 *
 *  @param userID identificator of the user
 *  @param membre access level of the user
 *  @param username of the user
 *  @param nom the name of the user
 *  @return TRUE / FALSE
 *  @author Ivan Molera
 */
class userCookie
{

	private $DOMAIN_ ;

	private $userID_ ;
	private $membre_ ;
	private $username_ ;
	private $nom_ ;
	private $capita_ ;

	private $cookieTime_ = 0 ;
	private $cookieTimeOut_ ;
	private $cookiePath_ = "/";


    /**
     * Constructor, initializes some private variables
     *
     * @return TRUE / FALSE
     */
	function __constructor( )
	{
		$this->DOMAIN_ 			= "owlab.net" ;

		//$this->cookieTime_ 	= time()+(60*60*3) ; // caducitat de la cookie : 3hores
		$this->cookieTime_ 		= 0 ; 				// caducitat de la cookie : quan tanki el browser
		$this->cookieTimeOut_ 	= time()-3600 ; 	// caduco la cookie : fa 1hora
		$this->cookiePath_ 		= "/" ;

		RETURN TRUE ;
	}


    /**
     * Sets a cookie to confirm that this is an authorized user
     *
     * @param userID identificator of the user
     * @param membre access level of the user
     * @param username of the user
     * @param nom the name of the user
     * @return TRUE/FALSE
     */
	function cookieAuthUser( $userID , $email, $nom, $capita )
	{

		$this->userID_ 			= $userID ;
		$this->username_ 		= $email ;
		$this->nom_ 			= $nom ;
		$this->capita_ 			= $capita ;

		if( $this->userID_ != null )
		{
			if( setcookie( "userID_squash" , "" , $this->cookieTime_ , $this->cookiePath_ , $this->DOMAIN_ ) )
			{
				setcookie( "userID_squash" , $this->userID_ , $this->cookieTime_ , $this->cookiePath_ , $this->DOMAIN_ ) ;
				setcookie( "username_squash" , $this->username_ , $this->cookieTime_ , $this->cookiePath_ , $this->DOMAIN_ ) ;
				setcookie( "nom_squash" , $this->nom_ , $this->cookieTime_ , $this->cookiePath_ , $this->DOMAIN_ ) ;

				if($capita == 1) {
					setcookie( "capita_squash" , $this->capita_ , $this->cookieTime_ , $this->cookiePath_ , $this->DOMAIN_ ) ;
				}
				else {
					setcookie( "capita_squash" , "" , $this->cookieTimeOut_ , $this->cookiePath_ , $this->DOMAIN_ ) ;
				}

				RETURN TRUE ;
			}
		}
		else
		{
			RETURN FALSE;
		}
	}


    /**
     * Sets a cookie with the user's name
     *
     * @param nom the name of the connected user
     * @return TRUE/FALSE
     */
	function setCookieName( $nom )
	{
		setcookie( "nom_squash" , $nom , $this->cookieTime_ , $this->cookiePath_ , $this->DOMAIN_ ) ;

		RETURN TRUE;
	}


    /**
     * Sets the cookie timeout to force the log off
     *
     * @return TRUE/FALSE
     */
	function cookieLogoff()
	{
			foreach( @$_COOKIE as $key=>$val )
			{
				setcookie( $key , "" , $this->cookieTimeOut_ , $this->cookiePath_ , $this->DOMAIN_ ) ;
			}

			RETURN TRUE ;
	 }

}

?>