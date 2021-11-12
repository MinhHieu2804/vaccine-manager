<?php
class Vaccination
{

    // database connection and table name
    private $conn;
    private $table_name = "vaccination";

    // object properties
    public $id;
    public $cccd;
    public $vaccine_id;
    public $health_center_id;
    public $date;
    public $note;
    public $vaccinate_no;
    public $created;

    // constructor with $db as database connection
    public function __construct($db)
    {
        $this->conn = $db;
    }

    // read vaccinations
    function read()
    {

        // select all query
        $query = "SELECT
                    v1.id, v1.cccd, c.ho_dem, c.ten, v2.name as vaccine_name, v1.date, v1.note, v1.created, v1.vaccinate_no
                FROM
                    " . $this->table_name . " v1
                    LEFT JOIN
                        vaccine v2
                            ON v1.vaccine_id = v2.id
                    LEFT JOIN
                        citizen c
                            ON v1.cccd = c.cccd
                ORDER BY
                    v1.created DESC";

        // prepare query statement
        $stmt = $this->conn->prepare($query);

        // execute query
        $stmt->execute();

        return $stmt;
    }

    // create vaccination
    function create()
    {

        // query to insert record
        $query = "INSERT INTO
                    " . $this->table_name . "
                SET
                    cccd = :cccd, vaccine_id = :vaccine_id, health_center_id = :health_center_id, date = :date, note = :note, vaccinate_no = :vaccinate_no, created = :created";

        // prepare query
        $stmt = $this->conn->prepare($query);

        // sanitize
        $this->cccd = htmlspecialchars(strip_tags($this->cccd));
        $this->vaccine_id = htmlspecialchars(strip_tags($this->vaccine_id));
        $this->health_center_id = htmlspecialchars(strip_tags($this->health_center_id));
        $this->date = htmlspecialchars(strip_tags($this->date));
        $this->vaccinate_no = htmlspecialchars(strip_tags($this->vaccinate_no));
        $this->note = htmlspecialchars(strip_tags($this->note));
        $this->created = htmlspecialchars(strip_tags($this->created));

        // bind values
        $stmt->bindParam(":cccd", $this->cccd);
        $stmt->bindParam(":vaccine_id", $this->vaccine_id);
        $stmt->bindParam(":health_center_id", $this->health_center_id);
        $stmt->bindParam(":date", $this->date);
        $stmt->bindParam(":vaccinate_no", $this->vaccinate_no);
        $stmt->bindParam(":note", $this->note);
        $stmt->bindParam(":created", $this->created);

        // execute query
        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    // update the vaccination
    function update(){
    
        // update query
        $query = "UPDATE
                    " . $this->table_name . "
                SET
                    cccd = :cccd,
                    vaccine_id = :vaccine_id,
                    health_center_id = :health_center_id,
                    date = :date,
                    note = :note,
                    vaccinate_no = :vaccinate_no
                WHERE
                    id = :id";
    
        // prepare query statement
        $stmt = $this->conn->prepare($query);
    
        // sanitize
        $this->id = htmlspecialchars(strip_tags($this->id));
        $this->cccd = htmlspecialchars(strip_tags($this->cccd));
        $this->vaccine_id = htmlspecialchars(strip_tags($this->vaccine_id));
        $this->health_center_id = htmlspecialchars(strip_tags($this->health_center_id));
        $this->date = htmlspecialchars(strip_tags($this->date));
        $this->vaccinate_no = htmlspecialchars(strip_tags($this->vaccinate_no));
        $this->note = htmlspecialchars(strip_tags($this->note));

        // bind values
        $stmt->bindParam(":id", $this->id);
        $stmt->bindParam(":cccd", $this->cccd);
        $stmt->bindParam(":vaccine_id", $this->vaccine_id);
        $stmt->bindParam(":health_center_id", $this->health_center_id);
        $stmt->bindParam(":date", $this->date);
        $stmt->bindParam(":vaccinate_no", $this->vaccinate_no);
        $stmt->bindParam(":note", $this->note);
    
        // execute the query
        if($stmt->execute()){
            return true;
        }
    
        return false;
    }

    // delete the vaccination
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

    // used when filling up the update product form
    function readOne(){
    
        // query to read single record
        $query = "SELECT
                    cccd, vaccine_id, health_center_id, date, vaccinate_no, note, created
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
        $this->vaccine_id = $row['vaccine_id'];
        $this->health_center_id = $row['health_center_id'];
        $this->date = $row['date'];
        $this->note = $row['note'];
        $this->vaccinate_no = $row['vaccinate_no'];
        $this->created = $row['created'];
    }

    function read_with_cccd($cccd) {
        $query = "SELECT
        v2.name as vaccine_name, v1.date, v1.note, v1.created, v1.vaccinate_no, h.name as center_name
    FROM
        " . $this->table_name . " v1
        LEFT JOIN
            vaccine v2 ON v1.vaccine_id = v2.id  
        LEFT JOIN
            health_center h ON v1.health_center_id = h.id
        WHERE v1.cccd = ?
    ORDER BY
        v1.created DESC";

        // prepare query statement
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(1, $cccd);

        // execute query
        $stmt->execute();

        return $stmt;
    }

    // function read_with_citizen_id($citizen_id){
        
    //     // query to read single record
    //     $query = "SELECT
    //                 id, _name, _district_id, _province_id
    //             FROM
    //                 " . $this->table_name . " 
    //             WHERE
    //             _district_id = ?
    //             ";

    //     // prepare query statement
    //     $stmt = $this->conn->prepare( $query );

    //     // bind id of product to be updated
    //     $stmt->bindParam(1, $citizen_id);

    //     // execute query
    //     $stmt->execute();
    
    //     return $stmt;
    // }
}


