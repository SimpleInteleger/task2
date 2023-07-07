<?php 
	require_once('treeclass.php');
	define('DBHOST','localhost');
	define('DBUSER','root');
	define('DBPASS','');
	define('DBNAME','treedata');
	$db = new PDO("mysql:host=".DBHOST.";port=3306;dbname=".DBNAME, DBUSER, DBPASS);
	$db -> exec("set names utf8");
	$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	
	$action = $_POST['action'];
	$treeTools = new treeTools($db);
	$echo_data = "";
	if($action == "delete_all"){
		$echo_data = $treeTools->deleteAll();
		echo $echo_data;
	}
	if($action == "create_root"){
		$result=$treeTools->createPoint($_POST['id'],$_POST['name'],$_POST['creator']);
		$echo_array = array("id"=>$_POST['id'],"name"=>$_POST['name'],"creator"=>$_POST['creator'],"result"=>$result);
		$echo_data = json_encode($echo_array);
		echo $echo_data;
	}
	if($action == "next_id"){
		$result=$treeTools->nextId();
		$echo_data = $result;
		echo $result;
	}
	if($action == "delete_root"){
		$ids=json_decode($_POST['ids']);
		foreach($ids as $id){
			$treeTools->deletePoint($id);
		}
		$echo_data="deleted";
		echo $echo_data;
	}
	if($action == "rename_root"){
	$treeTools->renamePoint($_POST['id'],$_POST['name']);
	$echo_data="done";
	echo $echo_data;
	}
	
?>						