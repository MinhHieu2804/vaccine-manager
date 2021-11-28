<?php
// required header
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
  
// include database and object files
include_once '../../../../config/database.php';
include_once '../../../../objects/citizen.php';
  

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
    $citizen = new Citizen($db);
    
    // query citizens
    $stmt = $citizen->read();
    $num = $stmt->rowCount();
    
    // check if more than 0 record found
    if($num>0){
    
        // products array
        $citizens_arr=array();
        $citizens_arr["records"]=array();
    
        // retrieve our table contents
        // fetch() is faster than fetchAll()
        // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            // extract row
            // this will make $row['name'] to
            // just $name only
            extract($row);
    
            $citizen_item=array(
                "id" => $id,
                "cccd" => $cccd,
                "ho_dem" => $ho_dem,
                "ten" => $ten,
                "birthday" => $birthday,
                "gender" => ($gender == 'm' ? "Nam" : ($gender == 'f' ? "Nữ" : "Khác")),
                "phone_number" => $phone_number,
                "email" => $email,
                "address" => $address,
                "ward" => $ward,
                "district" => $district,
                "province" => $province
            );
    
            array_push($citizens_arr["records"], $citizen_item);
        }
    
        // set response code - 200 OK
        http_response_code(200);
    
        // show citizens data in json format
        echo json_encode($citizens_arr);
    }
    
    else{
    
        // set response code - 404 Not found
        http_response_code(404);
    
        // tell the user no citizens found
        echo json_encode(
            array("message" => "No citizens found.")
        );
    }

}

else{
 
    // set response code
    http_response_code(401);
 
    // tell the admin access denied
    echo json_encode(array("message" => "Access denied."));
}

?>