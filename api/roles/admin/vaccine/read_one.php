<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
  
// include database and object files
include_once '../../../config/database.php';
include_once '../../../objects/vaccine.php';
  
// get database connection
$database = new Database();
$db = $database->getConnection();
  
// prepare vaccine object
$vaccine = new Vaccine($db);
  
// set ID property of record to read
$vaccine->id = isset($_GET['id']) ? $_GET['id'] : die();
  
// read the details of vaccine to be edited
$vaccine->readOne();
  
if($vaccine->name!=null){
    // create array
    $vaccine_arr = array(
        "name" => $vaccine->name,
        "created" => $vaccine->created
  
    );
  
    // set response code - 200 OK
    http_response_code(200);
  
    // make it json format
    echo json_encode($vaccine_arr);
}
  
else{
    // set response code - 404 Not found
    http_response_code(404);
  
    // tell the user vaccine does not exist
    echo json_encode(array("message" => "vaccine does not exist."));
}
?>