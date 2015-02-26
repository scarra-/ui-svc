<?php
class Activity {
  
  private $display_name = '<em>Anon</em>';
  private $image = 'http://www.gravatar.com/avatar/00000000000000000000000000000000?d=monsterid&s=48';
  private $action_text = null;
  private $date = null;
  private $id;
  private $type;
  
  public function __construct($activity_type, $action_text, $email = null) {
    date_default_timezone_set('UTC');
    $this->type = $activity_type;
    $this->id = uniqid();
    $this->date = date('r');
    
    $this->action_text = $action_text;
    
    if( is_null($email) == false ) {
      $this->image = $this->get_gravatar($email);
      $profile = $this->get_gravatar_profile($email);
      if( isset($profile['displayName']) ) {
        $this->display_name = $profile['displayName'];
      }
    }
  }
  
  public function getMessage() {
    $activity = array(
      'id' => $this->id,
      'body' => $this->action_text,
      'published' => $this->date,
      'type' => $this->type,
      'actor' => array(
        'displayName' => $this->display_name,
        'objectType' => 'person',
        'image' => array(
          'url' => $this->image,
          'width' => 48,
          'height' => 48
        )
      )
    );
    return $activity;
  }
  
  // from: http://en.gravatar.com/site/implement/images/php/
  /**
   * Get either a Gravatar URL or complete image tag for a specified email address.
   *
   * @param string $email The email address
   * @param string $s Size in pixels, defaults to 80px [ 1 - 512 ]
   * @param string $d Default imageset to use [ 404 | mm | identicon | monsterid | wavatar ]
   * @param string $r Maximum rating (inclusive) [ g | pg | r | x ]
   * @param boole $img True to return a complete IMG tag False for just the URL
   * @param array $atts Optional, additional key/value attributes to include in the IMG tag
   * @return String containing either just a URL or a complete image tag
   * @source http://gravatar.com/site/implement/images/php/
   */
  private function get_gravatar( $email, $s = 80, $d = 'mm', $r = 'g', $img = false, $atts = array() ) {
  	$url = 'http://www.gravatar.com/avatar/';
  	$url .= $this->get_email_hash( $email );
  	$url .= "?s=$s&d=$d&r=$r";
  	if ( $img ) {
  		$url = '<img src="' . $url . '"';
  		foreach ( $atts as $key => $val )
  			$url .= ' ' . $key . '="' . $val . '"';
  		$url .= ' />';
  	}
  	return $url;
  }
  
  private function get_gravatar_profile($email) {
    $profile = null;
    $hash = $this->get_email_hash($email);
    
    $url = 'http://en.gravatar.com/' . $hash . '.php';
    
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_HEADER, false);
    curl_setopt($curl, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($curl, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
    $response = curl_exec($curl);
    $status = curl_getinfo($curl);
    curl_close($curl);
    
    // doesn't work on phpfog shared environment
    //$response = file_get_contents( $url );
    
    $unserialized = unserialize( $response );
    if ( is_array( $unserialized ) && isset( $unserialized['entry'] ) ) {
      $profile = $unserialized['entry'][0];
    }
    return $profile;
  }
  
  private function get_email_hash($email) {
    return md5( strtolower( trim( $email ) ) );
  }
  
}
?>