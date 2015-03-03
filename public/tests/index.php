<?php
/**
 * Created by PhpStorm.
 * User: Karl
 * Date: 2/27/2015
 * Time: 3:58 PM
 */
require_once __DIR__.'/../../.env';
require('lib/Pusher.php');


$app_id = getenv(APP_ID);
$app_key = getenv(APP_KEY);
$app_secret = getenv(APP_SECRET);

$pusher = new Pusher($app_key, $app_secret, $app_id);

for ($i = 1; $i <= 60; $i++) {

    sleep(1);
    $data['name'] = 'Karlis';
    $data['message'] = 'hello waweqwerqworld' . $i;
    $data['time'] = date("l jS \of F Y h:i:s A");
    print_r($pusher->trigger('public_channel', 'new_tweet', $data));
}