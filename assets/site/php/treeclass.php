<?php
	
	class treeTools {
		private $db;
		public $creations=array();
		public function __construct($db){
			//create bd connection;
			$this->db = $db;
			
		}
		//clear table;
		public function deleteAll(){
			$del = $this->db->prepare('DELETE FROM roots_data');
			$del->execute();
			return "cleared";
		}
		//define max id ;
		public function nextId(){
			$maxid="0";
			try{
				$sel = $this->db->prepare('SELECT id FROM roots_data ');
				$sel->execute();
				while($row = $sel->fetch()){
					if(intval($maxid)<intval($row['id'])){
						$maxid = $row['id'];
					}	
				}
				} catch(PDOException $e) {
				echo $e->getMessage();
			}
			return intval($maxid)+1;
		}
		//add root;
		public function createPoint($id,$name,$creator){
			try {
				$add = $this->db->prepare('INSERT INTO roots_data (id,name,creator) VALUES (:id, :name, :creator)');
				$add->execute(array(
				':id' => $id,
				':name' => $name,
				':creator' => $creator
				));
				} catch (PDOException $e){
				echo $e->getMessage();	
			}
			return "done";
		}
		//delete root;
		public function deletePoint($id){
			$del = $this->db->prepare('DELETE FROM roots_data WHERE id = :id');
			$del->execute(array(':id' => $id));
		}
		//remane root;
		public function renamePoint($id,$name){
		$ren = $this->db->prepare('UPDATE roots_data SET name = :name WHERE id = :id');
			$ren->execute(array(
			':name' => $name,
			':id' => $id
			));
		}
	}
?>
