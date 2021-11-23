<?php
// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// required to encode json web token
include_once '../../config/core.php';
include_once '../../libs/php-jwt-master/src/BeforeValidException.php';
include_once '../../libs/php-jwt-master/src/ExpiredException.php';
include_once '../../libs/php-jwt-master/src/SignatureInvalidException.php';
include_once '../../libs/php-jwt-master/src/JWT.php';

use \Firebase\JWT\JWT;

// files needed to connect to database
include_once '../../config/database.php';
include_once '../../objects/citizen.php';
include_once '../../objects/vaccination.php';

// get database connection
$database = new Database();
$db = $database->getConnection();

// instantiate user object
$user = new Citizen($db);

$data = json_decode(file_get_contents("php://input"));

// get jwt
$jwt = isset($data->jwt) ? $data->jwt : "";

if($jwt) {
    try {
        $decoded = JWT::decode($jwt, $key, array('HS256'));
        // prepare vaccination object
        $vaccination = new Vaccination($db);

        // set cccd property of record to read
        $user->cccd = $decoded->data->cccd;

        // read the details of vaccination to be edited
        $stmt = $vaccination->read_with_cccd($user->cccd);
        $num = $stmt->rowCount();

        // check if more than 0 record found
        if ($num > 0) {

            // vaccinations array
            $vaccinations_arr = array();
            $vaccinations_arr["records"] = array();

            // retrieve our table contents
            // fetch() is faster than fetchAll()
            // http://stackoverflow.com/questions/2770630/pdofetchall-vs-pdofetch-in-a-loop
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                // extract row
                // this will make $row['name'] to
                // just $name only
                extract($row);

                $vaccination_item = array(
                    "vaccine_name" => $vaccine_name,
                    "center_name" => $center_name,
                    "date" => $date,
                    "vaccinate_no" => $vaccinate_no,
                    "note" => $note
                );

                array_push($vaccinations_arr["records"], $vaccination_item);
            }

            // set response code - 200 OK
            http_response_code(200);

            // show vaccinations data in json format
            echo json_encode($vaccinations_arr);
        } else {

            // set response code - 404 Not found
            http_response_code(404);

            // tell the user no vaccinations found
            echo json_encode(
                array("message" => "No vaccination found.")
            );
        }
    }

    catch (Exception $e) {

        // set response code
        http_response_code(401);

        // show error message
        echo json_encode(array(
            "message" => "Access denied.",
            "error" => $e->getMessage()
        ));
    }

}

// show error message if jwt is empty
else{
 
    // set response code
    http_response_code(401);
 
    // tell the user access denied
    echo json_encode(array("message" => "Access denied."));
}
