<?php
  class Channel {
    // DB stuff
    private $conn;
    private $table = 'channel';

    // Channel Properties
    public $id;
    public $title;
    public $channel_url;
    public $logo_url;
    public $channel_id;

    // Constructor with DB
    public function __construct($db) {
      $this->conn = $db;
    }
    
    // Get Channels
    public function read() {
      // Create query
      $query = "SELECT id, title, channel_url, logo_url, (SELECT AVG(rating) FROM rating WHERE id = channel_id) AS rating FROM $this->table;";
      
      // Prepare statement
      $stmt = $this->conn->prepare($query);

      // Execute query
      $stmt->execute();

      return $stmt;
    }
  }
?>