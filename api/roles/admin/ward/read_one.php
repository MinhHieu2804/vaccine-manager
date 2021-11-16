<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
  
// include database and object files
include_once '../../../config/database.php';
include_once '../../../objects/ward.php';
  
// get database connection
$database = new Database();
$db = $database->getConnection();
  
// prepare ward object
$ward = new Ward($db);
  
// set ID property of record to read
$ward->id = isset($_GET['id']) ? $_GET['id'] : die();
  
// read the details of ward to be edited
$ward->readOne();
  
if($ward->id!=null){
    // create array
    $ward_arr = array(
        "id" => $ward->id,
        "name" =>  $ward->name,
        "district_id" => $ward->district_id,
        "proivince_id" => $ward->province_id
  
    );
  
    // set response code - 200 OK
    http_response_code(200);
  
    // make it json format
    echo json_encode($ward_arr);
}
  
else{
    // set response code - 404 Not found
    http_response_code(404);
  
    // tell the user ward does not exist
    echo json_encode(array("message" => "ward does not exist."));
}
?>