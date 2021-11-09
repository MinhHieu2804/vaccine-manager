<?php
// 'user' object
class Citizen
{
    // database connection and table name
    private $conn;
    private $table_name = "citizen";

    // object properties
    public $id;
    public $cccd;
    public $ho_dem;
    public $ten;
    public $birthday;
    public $phone_number;
    public $email;
    public $pwd;
    public $address;
    public $ward_id;

    // constructor
    public function __construct($db)
    {
        $this->conn = $db;
    }

    // create new user record
    function create()
    {

        // insert query
        $query = "INSERT INTO " . $this->table_name . "
            SET
                ho_dem = :ho_dem,
                ten = :ten,
                phone_number = :phone_number,
                pwd = :pwd";

        // prepare the query
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->ho_dem = htmlspecialchars(strip_tags($this->ho_dem));
        $this->ten = htmlspecialchars(strip_tags($this->ten));
        $this->phone_number = htmlspecialchars(strip_tags($this->phone_number));
        $this->pwd = htmlspecialchars(strip_tags($this->pwd));

        // bind the values
        $stmt->bindParam(':ho_dem', $this->ho_dem);
        $stmt->bindParam(':ten', $this->ten);
        $stmt->bindParam(':phone_number', $this->phone_number);

        // hash the password before saving to database
        $password_hash = password_hash($this->pwd, PASSWORD_BCRYPT);
        $stmt->bindParam(':pwd', $password_hash);

        //password text (ko hash)
        //$stmt->bindParam(':pwd', $this->pwd);

        // execute the query, also check if query was successful
        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    // check if given email exist in the database
    function check_phone_number()
    {

        // query to check if email exists
        $query = "SELECT id, ho_dem, ten, pwd
                FROM " . $this->table_name . "
                WHERE phone_number = ?
                LIMIT 0,1";

        // prepare the query
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->phone_number = htmlspecialchars(strip_tags($this->phone_number));

        // bind given email value
        $stmt->bindParam(1, $this->phone_number);

        // execute the query
        $stmt->execute();

        // get number of rows
        $num = $stmt->rowCount();

        // if email exists, assign values to object properties for easy access and use for php sessions
        if ($num > 0) {

            // get record details / values
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            // assign values to object properties
            $this->id = $row['id'];
            $this->ho_dem = $row['ho_dem'];
            $this->ten = $row['ten'];
            $this->pwd = $row['pwd'];

            // return true because email exists in the database
            return true;
        }

        // return false if email does not exist in the database
        return false;
    }


    // update a user record
    public function update()
    {

        // if password needs to be updated
        $password_set = !empty($this->pwd) ? " pwd = :pwd" : "";

        // if no posted password, do not update the password
        $query = "UPDATE " . $this->table_name . "
            SET
                cccd = :cccd,
                ho_dem = :ho_dem,
                ten = :ten,
                birthday = :birthday,
                address = :address,
                ward_id = :ward_id,
                phone_number = :phone_number,
                email = :email,
                {$password_set}
            WHERE id = :id";

        // prepare the query
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->cccd = htmlspecialchars(strip_tags($this->cccd));
        $this->ho_dem = htmlspecialchars(strip_tags($this->ho_dem));
        $this->ten = htmlspecialchars(strip_tags($this->ten));
        $this->birthday = htmlspecialchars(strip_tags($this->birthday));
        $this->address = htmlspecialchars(strip_tags($this->address));
        $this->ward_id = htmlspecialchars(strip_tags($this->ward_id));
        $this->phone_number = htmlspecialchars(strip_tags($this->phone_number));
        $this->email = htmlspecialchars(strip_tags($this->email));

        // bind the values from the form
        $stmt->bindParam(':cccd', $this->cccd);
        $stmt->bindParam(':ho_dem', $this->ho_dem);
        $stmt->bindParam(':ten', $this->ten);
        $stmt->bindParam(':birthday', $this->birthday);
        $stmt->bindParam(':address', $this->address);
        $stmt->bindParam(':ward_id', $this->ward_id);
        $stmt->bindParam(':phone_number', $this->phone_number);
        $stmt->bindParam(':email', $this->email);

        // hash the password before saving to database
        if (!empty($this->pwd)) {
            $this->pwd = htmlspecialchars(strip_tags($this->pwd));
            $password_hash = password_hash($this->pwd, PASSWORD_BCRYPT);
            $stmt->bindParam(':pwd', $password_hash);
        }
     
        // password text (neu ko hash)
        //$stmt->bindParam(':pwd', $this->pwd);
        // unique ID of record to be edited
        $stmt->bindParam(':id', $this->id);

        // execute the query
        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    public function update2()
    {

        // if password needs to be updated
       // $password_set = !empty($this->pwd) ? " pwd = :pwd" : "";

        // if no posted password, do not update the password
        $query = "UPDATE " . $this->table_name . "
            SET
                cccd = :cccd,
                ho_dem = :ho_dem,
                ten = :ten,
                birthday = :birthday,
                address = :address,
                ward_id = :ward_id,
                phone_number = :phone_number,
                email = :email
                
            WHERE id = :id";

        // prepare the query
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->cccd = htmlspecialchars(strip_tags($this->cccd));
        $this->ho_dem = htmlspecialchars(strip_tags($this->ho_dem));
        $this->ten = htmlspecialchars(strip_tags($this->ten));
        $this->birthday = htmlspecialchars(strip_tags($this->birthday));
        $this->address = htmlspecialchars(strip_tags($this->address));
        $this->ward_id = htmlspecialchars(strip_tags($this->ward_id));
        $this->phone_number = htmlspecialchars(strip_tags($this->phone_number));
        $this->email = htmlspecialchars(strip_tags($this->email));

        // bind the values from the form
        $stmt->bindParam(':cccd', $this->cccd);
        $stmt->bindParam(':ho_dem', $this->ho_dem);
        $stmt->bindParam(':ten', $this->ten);
        $stmt->bindParam(':birthday', $this->birthday);
        $stmt->bindParam(':address', $this->address);
        $stmt->bindParam(':ward_id', $this->ward_id);
        $stmt->bindParam(':phone_number', $this->phone_number);
        $stmt->bindParam(':email', $this->email);

        // hash the password before saving to database
        // if (!empty($this->pwd)) {
        //     $this->pwd = htmlspecialchars(strip_tags($this->pwd));
        //     $password_hash = password_hash($this->pwd, PASSWORD_BCRYPT);
        //     $stmt->bindParam(':pwd', $password_hash);
        // }
     
        // password text (neu ko hash)
        //$stmt->bindParam(':pwd', $this->pwd);
        // unique ID of record to be edited
        $stmt->bindParam(':id', $this->id);

        // execute the query
        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    function read()
    {

        // select all query
        $query = "SELECT
                    c.cccd, c.ho_dem, c.ten, c.birthday, c.phone_number, c.email, c.address,
                    w._name as ward, d._name as district, p._name as province
                FROM
                " . $this->table_name . " as c
                LEFT JOIN
                    ward as w ON c.ward_id = w.id
                LEFT JOIN 
                    district as d ON w._district_id = d.id
                LEFT JOIN 
                    province as p ON w._province_id = p.id
                ORDER BY
                    c.ward_id
                     DESC";

        // prepare query statement
        $stmt = $this->conn->prepare($query);

        // execute query
        $stmt->execute();

        return $stmt;
    }

    function readOne(){
        
        // query to read single record
        $query = "SELECT
                    cccd, ho_dem, ten, birthday, phone_number, email, address,
                    ward_id
                FROM
                " . $this->table_name . " 
                WHERE
                    id = ?
                LIMIT
                    0,1";

        // prepare query statement
        $stmt = $this->conn->prepare( $query );

        // bind id of product to be updated
        $stmt->bindParam(1, $this->id);

        // execute query
        $stmt->execute();

        // get retrieved row
        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        // set values to object properties
        $this->cccd = $row['cccd'];
        $this->ho_dem = $row['ho_dem'];
        $this->ten = $row['ten'];
        $this->birthday = $row['birthday'];
        $this->phone_number = $row['phone_number'];
        $this->email = $row['email'];
        $this->address = $row['address'];
        $this->ward_id = $row['ward_id'];

    }


    function delete(){
    
        // delete query
        $query = "DELETE FROM " . $this->table_name . " WHERE id = ?";
    
        // prepare query
        $stmt = $this->conn->prepare($query);
    
        // sanitize
        $this->id=htmlspecialchars(strip_tags($this->id));
    
        // bind id of record to delete
        $stmt->bindParam(1, $this->id);
    
        // execute query
        if($stmt->execute()){
            return true;
        }
    
        return false;
    }
}
