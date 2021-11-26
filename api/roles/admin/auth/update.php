<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// required to encode json web token
include_once '../../../config/core.php';
include_once '../../../libs/php-jwt-master/src/BeforeValidException.php';
include_once '../../../libs/php-jwt-master/src/ExpiredException.php';
include_once '../../../libs/php-jwt-master/src/SignatureInvalidException.php';
include_once '../../../libs/php-jwt-master/src/JWT.php';

use \Firebase\JWT\JWT;

// files needed to connect to database
include_once '../../../config/database.php';
include_once '../../../objects/admin.php';

// get database connection
$database = new Database();
$db = $database->getConnection();

// instantiate admin object
$admin = new Admin($db);

// get posted data
$data = json_decode(file_get_contents("php://input"));

// get jwt
$jwt = isset($data->jwt) ? $data->jwt : "";

// if jwt is not empty
if ($jwt) {

    // if decode succeed, show admin details
    try {

        // decode jwt
        $decoded = JWT::decode($jwt, $key, array('HS256'));

        // set admin property values
        $admin->username = $data->username;
        $admin->phone_number = (isset($data->phone_number) && $data->phone_number != null ? $data->phone_number : "");
        $admin->email = (isset($data->email) && $data->email != null ? $data->email : "");
        $admin->pwd = (isset($data->pwd) ? $data->pwd : null);
        $admin->id = $decoded->data->id;

        // update the admin record
        if ($admin->update()) {
            // we need to re-generate jwt because admin details might be different
            $token = array(
                "iat" => $issued_at,
                "exp" => $expiration_time,
                "iss" => $issuer,
                "data" => array(
                    "id" => $admin->id,
                    "username" => $admin->username,
                    "phone_number" => $admin->phone_number,
                    "email" => $admin->email,
                )
            );
            $jwt = JWT::encode($token, $key);
            
            // set response code
            http_response_code(200);
            
            // response in json format
            echo json_encode(
                    array(
                        "message" => "User was updated.",
                        "jwt" => $jwt
                    )
                );
        }

        // message if unable to update admin
        else {
            // set response code
            http_response_code(401);

            // show error message
            echo json_encode(array("message" => "Unable to update admin."));
        }
    }

    // if decode fails, it means jwt is invalid
    catch (Exception $e) {

        // set response code
        http_response_code(401);

        // show error message
        echo json_encode(array(
            "message" => "Access denied.",
            "error" => $e->getMessage(),
            $admin->pwd,
            $password_set = !empty($admin->pwd) ? ", pwd = :pwd" : ""
        ));
    }
}
 
// show error message if jwt is empty
else{
 
    // set response code
    http_response_code(401);
 
    // tell the admin access denied
    echo json_encode(array("message" => "Access denied."));
}
