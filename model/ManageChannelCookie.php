<?php
  class ManageChannelCookie {
    // properties
    public $channelId;

    // constructor with channel id
    public function __construct($channelId) {
      $this->channelId = $channelId;
    }

    // save channel id into cookie
    public function saveCookie() {
      $channelName = "yfyc-$this->channelId"; // initializing channel name

      setcookie($channelName, true, time() + (86400 * 365), "/"); // set cookie having expiry date of 1 year
    }

    // check channel id's availability in Cookie
    public function checkCookie() {
      $channelName = "yfyc-$this->channelId"; // Initializing channel name

      $result = isset($_COOKIE[$channelName]) ? "set" : "unset"; // storing $result

      return $result;
    }
  }

  #Test

  // $mngChannelCookie = new ManageChannelCookie(1);
  // $mngChannelCookie->saveCookie();
  // echo $mngChannelCookie->checkCookie();
?>

