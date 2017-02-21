<!DOCTYPE html>
<html lang="{{ config('app.locale') }}">
<head>
  <base href="/" />
  <title>New Project</title>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" rel="stylesheet" />
  <link href="css/style.css" rel="stylesheet" type="text/css" />

  <!-- Bootstrap -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css"/>
  <!-- Fonts -->
  <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">

  <!-- Application Dependencies -->
  <script src="js/global.min.js"></script>
  {{-- <script src="systemjs.config.js"></script> --}}
  <script>
    System.import('js/app.js').catch(function(err){ console.error(err); });
  </script>

  <style>
    html, body {
      background-color: #fff;
      color: #636b6f;
      font-family: 'Raleway', sans-serif;
      font-weight: 100;
      height: 100vh;
      margin: 0;
    }
  </style>
</head>
<body>

  <my-app></my-app>

</body>
</html>
