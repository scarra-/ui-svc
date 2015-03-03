<?php

require_once __DIR__ . '/../vendor/autoload.php';

use Symfony\Component\HttpFoundation\Response;

$app = new Silex\Application();

$app->register(new Silex\Provider\TwigServiceProvider(), array(
    'twig.path' => __DIR__ . '/../resources/views',
));

$app['twig']->addFunction(new Twig_SimpleFunction('elixir', function ($file){
    static $manifest = null;

    if(is_null($manifest)) {
        $manifest = json_decode(file_get_contents(__DIR__.'/build/rev-manifest.json'), true);
    }

    if (isset($manifest[$file])){
        return '/build/'.$manifest[$file];
    }

    return $file;
}));


$app->get('/', function () use ($app) {
    $response = new Response($app['twig']->render('index.html.twig'));
    $response->setTtl(5);

    return $response;
});

$app->run();
