<?php 
function cookieSet($id){
    $cookie_name="user";
    $cookie_value=$id;
    setcookie($cookie_name,$cookie_value,time()+8600,"/");
}

function cookieDelet($id){
    $cookie_name = "yfyc". $id;
    setcookie($cookie_name,"",time()-8600,"/");
}