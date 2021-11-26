<?php
// required header
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
  
// include database and object files
include_once '../../../../config/database.php';
include_once '../../../../objects/citizen.php';
include_once '../../../../objects/vaccination.php';

// get posted data
$data = json_decode(file_get_contents("php://input"));

// get jwt
$jwt = isset($data->jwt) ? $data->jwt : "";

// if jwt is not empty
if ($jwt) {

    // instantiate database and citizen object
    $database = new Database();
    $db = $database->getConnection();
    
    // initialize object

    $vaccination = new Vaccination($db);

    $vaccination->cccd = isset($_GET['cccd']) ? $_GET['cccd'] : die();
    
    $data = json_decode(file_get_contents("php://input"));
    
    // make sure data is not empty
    if(
        !empty($data->vaccine_id) &&
        !empty($data->health_center_id) &&
        !empty($data->vaccinate_no) &&
        !empty($data->date)
    ){
    
        // set vaccination property values
        $vaccination->vaccine_id = $data->vaccine_id;
        $vaccination->health_center_id = $data->health_center_id;
        $vaccination->vaccinate_no = $data->vaccinate_no;
        $vaccination->date = $data->date;
        $vaccination->note = $data->note;
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


}
 
// show error message if jwt is empty
else{
 
    // set response code
    http_response_code(401);
 
    // tell the admin access denied
    echo json_encode(array("message" => "Access denied."));
}
