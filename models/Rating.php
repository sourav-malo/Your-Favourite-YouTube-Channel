<?php
  class Rating {
    // DB stuff
    private $conn;
    private $table = 'rating';

    // Rating Properties
    public $channel_id;
    public $rating;

    // Constructor with DB
    public function __construct($db) {
      $this->conn = $db;
    }
    
    // Create Rating
    public function create() {
      // Create query
      $query = "INSERT INTO $this->table(channel_id, rating) VALUES(:channel_id, :rating);";
      
      // Prepare statement
      $stmt = $this->conn->prepare($query);

      // Bind channel_id, rating
      $stmt->bindParam(':channel_id', $this->channel_id);
      $stmt->bindParam(':rating', $this->rating);

      // Execute query
      if($stmt->execute()) {
        return true;
      }

      return false;
    }

    // Read Single Channel
    public function read_single() {
      // Create query
      $query = "SELECT AVG(rating) AS rating FROM $this->table WHERE channel_id = :channel_id;";
      
      // Prepare statement
      $stmt = $this->conn->prepare($query);

      // Bind channel_id
      $stmt->bindParam(':channel_id', $this->channel_id);

      // Execute query
      $stmt->execute();

      return $stmt;
    }
  }
?>