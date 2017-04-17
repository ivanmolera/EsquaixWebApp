<?
$source = $_GET['img'];




/*

//Your Image
$imgSrc = "image.jpg";

//getting the image dimensions
list($width, $height) = getimagesize($imgSrc);

//saving the image into memory (for manipulation with GD Library)
$myImage = imagecreatefromjpeg($imgSrc);

// calculating the part of the image to use for thumbnail
if ($width > $height) {
  $y = 0;
  $x = ($width - $height) / 2;
  $smallestSide = $height;
} else {
  $x = 0;
  $y = ($height - $width) / 2;
  $smallestSide = $width;
}

// copying the part into thumbnail
$thumbSize = 100;
$thumb = imagecreatetruecolor($thumbSize, $thumbSize);
imagecopyresampled($thumb, $myImage, 0, 0, $x, $y, $thumbSize, $thumbSize, $smallestSide, $smallestSide);

//final output
header('Content-type: image/jpeg');
imagejpeg($thumb);
*/

list($source_width, $source_height, $source_type) = getimagesize($source);
switch ($source_type) {
    case IMAGETYPE_GIF:
        $img1 = imagecreatefromgif($source);
        break;
    case IMAGETYPE_JPEG:
        $img1 = imagecreatefromjpeg($source);
        break;
    case IMAGETYPE_PNG:
        $img1 = imagecreatefrompng($source);
        break;
}


// calculating the part of the image to use for thumbnail
if ($source_width > $source_height) {
  $y = 0;
  $x = ($source_width - $source_height) / 2;
  $smallestSide = $source_height;
} else {
  $x = 0;
  $y = ($source_height - $source_width) / 2;
  $smallestSide = $source_width;
}

// copying the part into thumbnail
$thumbSize = 280;
$thumb = imagecreatetruecolor($thumbSize, $thumbSize);
imagecopyresampled($thumb, $img1, 0, 0, $x, $y, $thumbSize, $thumbSize, $smallestSide, $smallestSide);

/*
// Nuevos tamaños
$nuevo_ancho = 280;
$nuevo_alto = 280;

// Cargar
$thumb = imagecreatetruecolor($nuevo_ancho, $nuevo_alto);

// Cambiar el tamaño
imagecopyresized($thumb, $img1, 0, 0, 0, 0, $nuevo_ancho, $nuevo_alto, $source_width, $source_height);

// Step 1 - Start with image as layer 1 (canvas).
//$img1 = ImageCreateFromjpeg($_GET['img']);
$x=imagesx($thumb)-$width ;
$y=imagesy($thumb)-$height;
*/ 
 
// Step 2 - Create a blank image.
$img2 = imagecreatetruecolor($x, $y);
$bg = imagecolorallocate($img2, 255, 255, 255); // white background
imagefill($img2, 0, 0, $bg);
 
 
// Step 3 - Create the ellipse OR circle mask.
$e = imagecolorallocate($img2, 0, 0, 0); // black mask color
 
// Draw a ellipse mask
// imagefilledellipse ($img2, ($x/2), ($y/2), $x, $y, $e);
 
// OR 
// Draw a circle mask
$r = $x <= $y ? $x : $y; // use smallest side as radius & center shape
imagefilledellipse ($img2, ($x/2), ($y/2), $r, $r, $e); 
 
 
// Step 4 - Make shape color transparent
imagecolortransparent($img2, $e);
 
 
// Step 5 - Merge the mask into canvas with 100 percent opacity
imagecopymerge($thumb, $img2, 0, 0, 0, 0, $x, $y, 100);
 
 
// Step 6 - Make outside border color around circle transparent
imagecolortransparent($thumb, $bg);

 
// Step 7 - Output merged image
header("Content-type: image/png"); // output header
imagepng($thumb); // output merged image

 
// Step 8 - Cleanup memory
imagedestroy($img2); // kill mask first
imagedestroy($thumb); // kill canvas last
?>