<h1><? echo ucfirst($project); ?> Style Guide</h1>

<hr>
<p>Version: <? echo($version); ?> -- Updated: <? echo($project_date); ?></p>
<hr>

<!-- Loop through and include all styleguide sections -->
<!-- TODO // add true/false variables to project/includes/global_variables.php -->

<?
if ($about) { include('about/content.php'); }
if ($colors) { include('colors/content.php'); }
if ($typography) { include('typography/content.php'); }
if ($lists) { include('lists/content.php'); }
if ($breadcrumbs) { include('breadcrumbs/content.php'); }
if ($buttons) { include('buttons/content.php'); }
if ($pagination) { include('pagination/content.php'); }
if ($grid) { include('grid/content.php'); }
if ($flexbox) { include('flexbox/content.php'); }
if ($forms) { include('forms/content.php'); }
if ($tables) { include('tables/content.php'); }
if ($images) { include('images/content.php'); }
if ($video) { include('video/content.php'); }
if ($audio) { include('audio/content.php'); }
if ($best_practices) { include('best_practices/content.php'); }
?>

  <h2>FIN.</h2>