<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
  
// get database connection
include_once '../../../config/database.php';
  
// instantiate citizen object
include_once '../../../objects/citizen.php';
  
$database = new Database();
$db = $database->getConnection();
  
$citizen = new Citizen($db);
  
// get posted data
$data = json_decode(file_get_contents("php://input"));
  
// make sure data is not empty
if(
    !empty($data->cccd) &&
    !empty($data->ho_dem) &&
    !empty($data->ten) &&
    !empty($data->birthday) &&
    !empty($data->phone_number) &&
    !empty($data->ward_id)
){
  
    // set citizen property values
    $citizen->cccd = $data->cccd;
    $citizen->ho_dem = $data->ho_dem;
    $citizen->ten = $data->ten;
    $citizen->birthday = $data->birthday;
    $citizen->gender = $data->gender;
    $citizen->phone_number = $data->phone_number;
    $citizen->email = $data->email;
    $citizen->address = $data->address;
    $citizen->ward_id = $data->ward_id;

    // create the citizen
    if($citizen->create()){
  
        // set response code - 201 created
        http_response_code(201);
  
        // tell the user
        echo json_encode(array("message" => "citizen was created."));
    }
  
    // if unable to create the citizen, tell the user
    else{
  
        // set response code - 503 service unavailable
        http_response_code(503);
  
        // tell the user
        echo json_encode(array("message" => "Unable to create citizen."));
    }
}
  
// tell the user data is incomplete
else{
  
    // set response code - 400 bad request
    http_response_code(400);
  
    // tell the user
    echo json_encode(array("message" => "Unable to create citizen. Data is incomplete."));
}
