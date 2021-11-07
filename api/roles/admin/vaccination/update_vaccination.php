<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
  
// include database and object files
include_once '../../../config/database.php';
include_once '../../../objects/vaccination.php';
  
// get database connection
$database = new Database();
$db = $database->getConnection();
  
// prepare vaccination object
$vaccination = new Vaccination($db);
  
// get id of vaccination to be edited
$data = json_decode(file_get_contents("php://input"));
  
// set ID property of vaccination to be edited
$vaccination->id = $data->id;
  
// set vaccination property values
$vaccination->cccd = $data->cccd;
$vaccination->vaccine_id = $data->vaccine_id;
$vaccination->health_center_id = $data->health_center_id;
$vaccination->vaccinate_no = $data->vaccinate_no;
$vaccination->date = (isset($data->date) && $date->date != null ? $data->date : "");
$vaccination->note = (isset($data->note) && $data->note != null ? $data->note : "");
  
// update the vaccination
if($vaccination->update()){
  
    // set response code - 200 ok
    http_response_code(200);
  
    // tell the user
    echo json_encode(array("message" => "vaccination was updated."));
}
  
// if unable to update the vaccination, tell the user
else{
  
    // set response code - 503 service unavailable
    http_response_code(503);
  
    // tell the user
    echo json_encode(array("message" => "Unable to update vaccination."));
}
