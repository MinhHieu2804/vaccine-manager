<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header('Content-Type: application/json');
  
// include database and object files
include_once '../../../config/database.php';
include_once '../../../objects/citizen.php';
  
// get database connection
$database = new Database();
$db = $database->getConnection();
  
// prepare citizen object
$citizen = new Citizen($db);
  
// set ID property of record to read
$citizen->id = isset($_GET['id']) ? $_GET['id'] : die();
  
// read the details of citizen to be edited
$citizen->readOne();
  
if($citizen->id!=null){
    // create array
    $citizen_arr = array(
        "cccd" => $citizen->cccd,
        "ho_dem" => $citizen->ho_dem,
        "ten" => $citizen->ten,
        "birthday" => $citizen->birthday,
        "phone_number" => $citizen->phone_number,
        "email" => $citizen->email,
        "address" => $citizen->address,
        "ward_id" =>  $citizen->ward_id

    );
  
    // set response code - 200 OK
    http_response_code(200);
  
    // make it json format
    echo json_encode($citizen_arr);
}
  
else{
    // set response code - 404 Not found
    http_response_code(404);
  
    // tell the user citizen does not exist
    echo json_encode(array("message" => "citizen does not exist."));
}
?>