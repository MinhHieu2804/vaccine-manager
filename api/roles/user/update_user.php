<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// required to encode json web token
include_once '../../config/core.php';
include_once '../../libs/php-jwt-master/src/BeforeValidException.php';
include_once '../../libs/php-jwt-master/src/ExpiredException.php';
include_once '../../libs/php-jwt-master/src/SignatureInvalidException.php';
include_once '../../libs/php-jwt-master/src/JWT.php';

use \Firebase\JWT\JWT;

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

// get jwt
$jwt = isset($data->jwt) ? $data->jwt : "";

// if jwt is not empty
if ($jwt) {

    // if decode succeed, show user details
    try {

        // decode jwt
        $decoded = JWT::decode($jwt, $key, array('HS256'));

        // set user property values
        $user->cccd = (isset($data->cccd) && $data->cccd != null ? $data->cccd : "");
        $user->ho_dem = $data->ho_dem;
        $user->ten = $data->ten;
        $user->birthday = (isset($data->birthday) && $data->birthday != null ? $data->birthday : "");
        $user->gender = $data->gender;
        $user->address = (isset($data->address) && $data->address != null ? $data->address : "");
        $user->ward_id = (isset($data->ward_id) && $data->ward_id != null ? $data->ward_id : "null");
        $user->phone_number = $data->phone_number;
        $user->email = (isset($data->email) && $data->email != null ? $data->email : "");
        $user->pwd = (isset($data->pwd) ? $data->pwd : null);
        $user->id = $decoded->data->id;

        // update the user record
        if ($user->update()) {
            // we need to re-generate jwt because user details might be different
            $token = array(
                "iat" => $issued_at,
                "exp" => $expiration_time,
                "iss" => $issuer,
                "data" => array(
                    "id" => $user->id,
                    "cccd" => $user->cccd,
                    "ho_dem" => $user->ho_dem,
                    "ten" => $user->ten,
                    "birthday" => $user->birthday,
                    "gender" => $user->gender,
                    "address" => $user->address,
                    "ward_id" => $user->ward_id,
                    "phone_number" => $user->phone_number,
                    "email" => $user->email,
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

        // message if unable to update user
        else {
            // set response code
            http_response_code(401);

            // show error message
            echo json_encode(array("message" => "Unable to update user."));
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
            $user->pwd,
            $password_set = !empty($user->pwd) ? ", pwd = :pwd" : ""
        ));
    }
}
 
// show error message if jwt is empty
else{
 
    // set response code
    http_response_code(401);
 
    // tell the user access denied
    echo json_encode(array("message" => "Access denied."));
}
