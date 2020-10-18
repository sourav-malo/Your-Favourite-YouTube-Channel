<?php
  class ManageChannelCookie {
    // properties
    public $channelId;

    // save channel id into cookie
    public function saveCookie() {
      $channelName = "yfyc-".$this->channelId; // initializing channel name
      echo json_encode(array("channel name" => $channelName));

      setcookie($channelName, true, time() + (86400 * 365), "/"); // set cookie having expiry date of 1 year
      $_COOKIE[$channelName] = true;
    }

    // check channel id's availability in Cookie
    public function checkCookie() {
      $channelName = "yfyc-$this->channelId"; // Initializing channel name

      $result = isset($_COOKIE[$channelName]) ? "set" : "unset"; // storing $result

      return $result;
    }
  }
?>

