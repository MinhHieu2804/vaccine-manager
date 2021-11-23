<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// files needed to connect to database
include_once '../../config/database.php';
include_once '../../objects/citizen.php';
 
// get database connection
$database = new Database();
$db = $database->getConnection();
 
// instantiate user object
$user = new Citizen($db);
 
// get posted data
$data = json_decode(file_get_contents("php://input"));
 
// set product property values
$user->phone_number = $data->phone_number;
$check_phone_number = $user->check_phone_number();
 
 
// generate json web token
include_once '../../config/core.php';
include_once '../../libs/php-jwt-master/src/BeforeValidException.php';
include_once '../../libs/php-jwt-master/src/ExpiredException.php';
include_once '../../libs/php-jwt-master/src/SignatureInvalidException.php';
include_once '../../libs/php-jwt-master/src/JWT.php';
use \Firebase\JWT\JWT;

// check if email exists and if password is correct
// password_verify($data->pwd, $user->pwd) (neu hash password)
if($check_phone_number && password_verify($data->pwd, $user->pwd) ){

    $token = array(
       "iat" => $issued_at,
       "exp" => $expiration_time,
       "iss" => $issuer,
       "data" => array(
           "id" => $user->id,
           "ho_dem" => $user->ho_dem,
           "ten" => $user->ten,
           "phone_number" => $user->phone_number
       )
    );
 
    // set response code
    http_response_code(200);
 
    // generate jwt
    $jwt = JWT::encode($token, $key);
    echo json_encode(
            array(
                "message" => "Successful login.",
                "jwt" => $jwt
            )
        );
 
}
 
// login failed
else{
 
    // set response code
    http_response_code(401);
 
    // tell the user login failed
    echo json_encode(array("message" => "Login failed."));
}
