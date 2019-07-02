<?php

$secret = 'Y0UrS3cr3t!tOk3n';
$params = array( 'secret','target','searchstr','format');

// get response data: target, value, format
if( isset( $_REQUEST ) && $_REQUEST != null ) {
  if( $secret !== $_REQUEST['secret']) { exit; }
  $requestData = $_REQUEST;
  $request = [];
  foreach( $requestData as $key => $value ) {
    foreach( $params as $param ) {
      if( in_array($key,$params) // must be one of params
	  && $key !== 'secret' // exclude our secret key
	  && in_array( $value, $request ) === false ) { // only one entry in request array
	$request[ $key ] = $value;
      }
    }
  }
} else {
  echo "Please use one the following Parameters: ";
  echo implode($params, ", ");
}

// helper function
function strTrim( $str = null ) {
  $str = str_replace(array("\n", "\r", "\t"), '', $str);
  return $str;
}

function jsonFy( $str = null ) {
  return trim( str_replace( '"',"'",$str ) );
}

function clrCdata( $str = null ) {
  $str = str_replace( '<![CDATA[', '', $str );
  $str = str_replace( ']]>', '', $str );
  return $str;
}

// raw content
$target = $request['target'];
$targetData = file_get_contents( $target );

// default result
$result = $targetData;

// result switching
$format = $request['format'];
if( $format === 'trimed') {
  $result = str_replace( " ", "", strTrim( $result ) );
} else if( $format === 'json' ) {
  header('Content-Type: application/json'); 
  $result = clrCdata( $result );
  $result = json_encode( array( simplexml_load_string( $result ) ) );
} else if( $format === 'html' ) {
  header('Content-Type: text/html');
  $result = clrCdata( $result );
  $result = strTrim( $result );
} 

header("Access-Control-Allow-Origin: *");
echo $result;

?>
