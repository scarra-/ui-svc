<?php
/**
 * Created by PhpStorm.
 * User: Karl
 * Date: 3/2/2015
 * Time: 11:08 AM
 */
// web/index.php
require_once __DIR__ . '/../vendor/autoload.php';


$app = new Silex\Application();

$app->register(new Silex\Provider\TwigServiceProvider(), array(
    'twig.path' => __DIR__ . '/../resources/views',
));


$app['twig']->addFunction(new Twig_SimpleFunction('elixir', function ($file){
    static$manifest = null;

    if(is_null($manifest)){
        $manifest = json_decode(file_get_contents(__DIR__.'/build/rev-manifest.json'), true);
    }
    if (isset($manifest[$file])){
        return '/build/'.$manifest[$file];
    }

    return $file;
}));


$app->get('/', function () use ($app) {

    $return = $app['twig']->render('index.html.twig');

    $response = new \Symfony\Component\HttpFoundation\Response($return);

    $response->setTtl(5);


    //var_dump($response);


    return $response;


});



$app->run();
