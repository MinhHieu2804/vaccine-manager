<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
  
// include database and object file
include_once '../../../../config/database.php';
include_once '../../../../objects/vaccination.php';

// get posted data
$data = json_decode(file_get_contents("php://input"));

// get jwt
$jwt = isset($data->jwt) ? $data->jwt : "";

// if jwt is not empty
if ($jwt) {
    // get database connection
    $database = new Database();
    $db = $database->getConnection();
    
    // prepare vaccination object
    $vaccination = new Vaccination($db);
    
    // get vaccination id
    $data = json_decode(file_get_contents("php://input"));
    
    // set vaccination id to be deleted
    $vaccination->id = $data->id;
    
    // delete the vaccination
    if($vaccination->delete()){
    
        // set response code - 200 ok
        http_response_code(200);
    
        // tell the user
        echo json_encode(array("message" => "Vaccination was deleted."));
    }
    
    // if unable to delete the vaccination
    else{
    
        // set response code - 503 service unavailable
        http_response_code(503);
    
        // tell the user
        echo json_encode(array("message" => "Unable to delete vaccination."));
    }
}

else{
 
    // set response code
    http_response_code(401);
 
    // tell the admin access denied
    echo json_encode(array("message" => "Access denied."));
}
?>