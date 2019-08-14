<?php
    $dir = "../static/images";  //要获取的目录
	function listImages($dir)
	{
	    $images = array();
	    $entries = glob($dir . '/*');

	    if(!empty($entries)) foreach($entries as $ent) {
	        if($ent == '.' || $ent == '..') continue;
	        if(is_dir($ent)) {
	            $images = array_merge($images, listImages($ent));
	        } else if( substr(mime_content_type($ent), 0, 5) == 'image' ) {
	            $images[] = $ent;
	        } else {
	            continue;
	        }
	    }

	    return $images;
	}
	echo json_encode(listImages($dir));
