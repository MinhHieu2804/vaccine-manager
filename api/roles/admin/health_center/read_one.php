<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
  
// include database and object files
include_once '../../../config/database.php';
include_once '../../../objects/health_center.php';
  
// get database connection
$database = new Database();
$db = $database->getConnection();
  
// prepare health_center object
$health_center = new HealthCenter($db);
  
// set ID property of record to read
$health_center->id = isset($_GET['id']) ? $_GET['id'] : die();
  
// read the details of health_center to be edited
$health_center->readOne();
  
if($health_center->name!=null){
    // create array
    $health_center_arr = array(
        "name" => $health_center->name,
        "created" => $health_center->created
  
    );
  
    // set response code - 200 OK
    http_response_code(200);
  
    // make it json format
    echo json_encode($health_center_arr);
}
  
else{
    // set response code - 404 Not found
    http_response_code(404);
  
    // tell the user health_center does not exist
    echo json_encode(array("message" => "health center does not exist."));
}
?>