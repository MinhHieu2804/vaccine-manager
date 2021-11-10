<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
  
// include database and object files
include_once '../../../config/database.php';
include_once '../../../objects/citizen.php';
  
// get database connection
$database = new Database();
$db = $database->getConnection();
  
// prepare citizen object
$citizen = new Citizen($db);
  
// get id of citizen to be edited
$data = json_decode(file_get_contents("php://input"));
  
// set ID property of citizen to be edited
$citizen->id = $data->id;
  
// set citizen property values
$citizen->cccd = $data->cccd;
$citizen->ho_dem = $data->ho_dem;
$citizen->ten = $data->ten;
$citizen->birthday = $data->birthday;
$citizen->phone_number = $data->phone_number;
$citizen->email = $data->email;
$citizen->address = $data->address;
$citizen->ward_id = $data->ward_id;

  
// update the citizen
if($citizen->update2()){
  
    // set response code - 200 ok
    http_response_code(200);
  
    // tell the user
    echo json_encode(array("message" => "citizen was updated."));

}
  
// if unable to update the citizen, tell the user
else{
  
    // set response code - 503 service unavailable
    http_response_code(503);
  
    // tell the user
    echo json_encode(array("message" => "Unable to update citizen."));
}
