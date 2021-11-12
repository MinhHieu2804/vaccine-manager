<?php
// required header
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
  
// include database and object files
include_once '../../../config/database.php';
include_once '../../../objects/citizen.php';
include_once '../../../objects/vaccination.php';

// instantiate database and citizen object
$database = new Database();
$db = $database->getConnection();
  
// initialize object
$citizen = new Citizen($db);

$vaccination = new Vaccination($db);

$citizen->cccd = isset($_GET['cccd']) ? $_GET['cccd'] : die();
  
// query citizens
$stmt = $vaccination->read_with_cccd($citizen->cccd);
$num = $stmt->rowCount();
  
// check if more than 0 record found
if($num>0){
  
    // products array
    $vaccinations_arr=array();
    $vaccinations_arr["records"]=array();
  
    // retrieve our table contents
    // fetch() is faster than fetchAll()
    // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        // extract row
        // this will make $row['name'] to
        // just $name only
        extract($row);
  
        $vaccination_item=array(
            "vaccine" => $vaccine_name,
            "health_center" => $center_name,
            "date" => $date,
            "note" => $note,
            "vaccinate_no" => $vaccinate_no,
            "created" => $created
        );
  
        array_push($vaccinations_arr["records"], $vaccination_item);
    }
  
    // set response code - 200 OK
    http_response_code(200);
  
    // show citizens data in json format
    echo json_encode($vaccinations_arr);
}
  
else{
  
    // set response code - 404 Not found
    http_response_code(404);
  
    // tell the user no citizens found
    echo json_encode(
        array("message" => "No vaccinations found.")
    );
}
?>