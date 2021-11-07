<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
  
// get database connection
include_once '../../../config/database.php';
  
// instantiate vaccination object
include_once '../../../objects/vaccination.php';
  
$database = new Database();
$db = $database->getConnection();
  
$vaccination = new Vaccination($db);
  
// get posted data
$data = json_decode(file_get_contents("php://input"));
  
// make sure data is not empty
if(
    !empty($data->cccd) &&
    !empty($data->vaccine_id) &&
    !empty($data->health_center_id) &&
    !empty($data->vaccinate_no)
){
  
    // set vaccination property values
    $vaccination->cccd = $data->cccd;
    $vaccination->vaccine_id = $data->vaccine_id;
    $vaccination->health_center_id = $data->health_center_id;
    $vaccination->vaccinate_no = $data->vaccinate_no;
    $vaccination->date = (isset($data->date) && $date->date != null ? $data->date : "");
    $vaccination->note = (isset($data->note) && $data->note != null ? $data->note : "");
    $vaccination->created = date('Y-m-d H:i:s');
  
    // create the vaccination
    if($vaccination->create()){
  
        // set response code - 201 created
        http_response_code(201);
  
        // tell the user
        echo json_encode(array("message" => "vaccination was created."));
    }
  
    // if unable to create the vaccination, tell the user
    else{
  
        // set response code - 503 service unavailable
        http_response_code(503);
  
        // tell the user
        echo json_encode(array("message" => "Unable to create vaccination."));
    }
}
  
// tell the user data is incomplete
else{
  
    // set response code - 400 bad request
    http_response_code(400);
  
    // tell the user
    echo json_encode(array("message" => "Unable to create vaccination. Data is incomplete."));
}
