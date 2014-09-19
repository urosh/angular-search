<?php if (!defined('BASEPATH')) exit('No direct script access allowed');

/**
 * Users
 *
 * This model represents user authentication data. It operates the following tables:
 * - user account data,
 * - user profiles
 *
 * @package	Tank_auth
 * @author	Ilya Konyukhov (http://konyukhov.com/soft/)
 */
class Srch extends CI_Model
{
	
	function __construct()
	{
		parent::__construct();

		$ci =& get_instance();
	}

	/**
	 * Get collection record by Id
	 *
	 * @param	int
	 * @param	bool
	 * @return	object
	 */
	
	function getStats(){
		$numberOfObjects = 0;
		$types = array(array('type'=> 'images', 'number' => 0), array('type'=>'pdf', 'number' => 0), array('type'=>'x3d', 'number'=>0));

		$collections = array();
		$typesNumber = array(0, 0, 0);
		$collectionsNumbers = array();
		
		$query = $this->db->get('generalCollections');
		foreach ($query->result() as $row)
		{
			$collections[] = $row->name;
			$collections[$row->name][] = 0;
		}	

		for($i = 0; $i<3; $i++){
			$query = $this->db->get($types[$i]['type']);
			foreach ($query->result() as $row)
			{
				$xmlFile=$row->metadataLocation;

				if($xmlFile){
					$types[$i]['number']++;
					$numberOfObjects++;	
					$collections[$row->collection][0]++;
				}
				
			}	
		}

		
		echo $numberOfObjects;
		print_r($types);
		print_r($collections);


		
	}

	function getObjectInfo($id,$type){
		
		$this->db->where('id', $id);
		$objType="images";
		if($type=="Images") $objType="images";
		if($type=="PDF") $objType="pdf";
		if($type=="x3d") $objType="x3d";
		
		$query = $this->db->get($objType);
		$arr=array();
		
		if ($query->num_rows() == 1) {
			$uri="";
			if($query->row()->location=="local"){
				$uri="public.cyi.ac.cy".$query->row()->fileLocation;
			}else{
				$uri=$query->row()->fileLocation;
			}
			$arr=array("id"=>$id,"docID"=>$query->row()->docID,"location"=>$query->row()->location,"fileName"=>$query->row()->fileLocation,"uri"=>$uri);
		}
		
		return $arr;
		
	}
	
	
	
	private function createThumbnails($fullPath,$fileName){
		for($i=1;$i<4;$i++){
			$configThumb = array();  
	  		$configThumb['image_library'] = 'gd2';  
	  		$configThumb['source_image'] = $fullPath;  
			$configThumb['new_image'] = './db/data/'.$fileName;  
			$configThumb['create_thumb'] = TRUE;  
	  		$configThumb['maintain_ratio'] = TRUE;  
	  		$configThumb['width'] = 150*$i;  
	  		$configThumb['height'] = 150*$i;  
			$configThumb['thumb_marker'] = '_'.($i*150);
	    	$this->image_lib->initialize($configThumb);  
	      	$this->image_lib->resize();
		}
	}
	
	
	
	function getObjectType($docID){
		
		$this->db->where('docID', $docID);
		$query = $this->db->get('images');
		if ($query->num_rows() == 1)	return 'images';
		
		$this->db->where('docID', $docID);
		$query = $this->db->get('pdf');
		if($query->num_rows == 1) return 'pdf';
		
		$this->db->where('docID', $docID);
		$query = $this->db->get('x3d');
		if($query->num_rows == 1) return 'x3d';
	}
	
	
	
	function save_collection($data){
		
		$data['creationDate'] = date('Y-m-d H:i:s');
		$ID=uniqid(rand(),true);
		$data['docID']=md5($ID);
		
		
		
		//return 'ok we are now here';

		if ($this->db->insert('personalCollections', $data)) {
			return 'success';
		}
		return NULL;
		
	}	
	
	
	
	public function get_fileName($type,$docID){
		$this->db->where('docID', $docID);
		$query = $this->db->get($type);
		if ($query->num_rows() == 1) return ($type == 'images' ? $query->row()->fileLocation : $query->row()->imageLocation);
		return NULL;
	}
	
	
	public function get_collection_id($docID,$type){
		
		$this->db->where('docID', $docID);
		$query = $this->db->get('images');
		//echo $query->row()->collection."<br>";
		if ($query->num_rows() == 1) return $query->row()->collection;
		return NULL;
		//echo $type;
	}
	
	
	
	function save_3d($data){
		$data['created'] = date('Y-m-d H:i:s');
		if ($this->db->insert($this->table_name_3d, $data)) {
			$zip_id = $this->db->insert_id();
			return array('zip_id' => $zip_id);
		}
		return NULL;
	}	

	/**
	 * Get collection record by collection name
	 *
	 * @param	string
	 * @return	object
	 */
	function get_collection_by_name($name)
	{
		$this->db->where('LOWER(name)=', strtolower($name));

		$query = $this->db->get($this->table_name);
		
		if ($query->num_rows() == 1) return $query->row();
		return NULL;
	}
	
	
	/**
	 * Get collection record by creator
	 *
	 * @param	string
	 * @return	object
	 */
	function get_collection_by_creator($name)
	{
		$this->db->where('LOWER(creator)=', strtolower($name));

		$query = $this->db->get($this->table_name);
		if ($query->num_rows() == 1) return $query->row();
		return NULL;
	}

	/**
	 * Check if collection name is available 
	 *
	 * @param	string
	 * @return	bool
	 */
	function is_name_available($name)
	{
		$this->db->select('1', FALSE);
		$this->db->where('LOWER(name)=', strtolower($name));

		$query = $this->db->get($this->table_name);
		return $query->num_rows() == 0;
	}

	

	/**
	 * Create new user record
	 *
	 * @param	array
	 * @param	bool
	 * @return	array
	 */
	function create_collection($data)
	{
		$data['created'] = date('Y-m-d H:i:s');
		

		if ($this->db->insert($this->table_name, $data)) {
			$collection_id = $this->db->insert_id();
			
			return array('collection_id' => $collection_id, 'collection_name' => $data['name']);
		}
		return NULL;
	}

	/**
	 * Delete collection
	 *
	 * @param	int
	 * @return	bool
	 */
	function delete_collection($collection_id)
	{
		$this->db->where('id', $collection_id);
		$this->db->delete($this->table_name);
		if ($this->db->affected_rows() > 0) {
			$this->delete_profile($user_id);
			return TRUE;
		}
		return FALSE;
	}

	function getCollections()
	{
		$query = $this->db->get($this->table_name);
		//$schemasArray=array();
		foreach ($query->result() as $row)
		{
			$collectionsArray[$row->name]=$row;
			
		}
		if($query->num_rows()==0){
			$collectionsArray['no_schema']='No schema available';
		}
				
		return $collectionsArray;		
				
	}
	
	function getCollectionList()
	{
		$query = $this->db->get($this->table_name);
		//$schemasArray=array();
		foreach ($query->result() as $row)
		{
			$collectionsArray[$row->name]=$row->name;
			
		}
		if($query->num_rows()==0){
			$collectionsArray['no_schema']='No schema available';
		}
				
		return $collectionsArray;		
				
	}

	
	
}

/* End of file users.php */


<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

require(APPPATH.'libraries/REST_Controller.php');

class Map extends REST_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -  
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in 
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see http://codeigniter.com/user_guide/general/urls.html
	 */
	public $rest_format = 'json';

	public function index()
	{
		//$this->objects();
		echo APPPATH.'libraries/REST_Controller.php';
		echo 'ok';
		$this->load->view('index_out');
	}
	
	/*
   	* Search experiments. 
   	* 
  	*/
	

   function stats_get(){
      header('content-type: application/json; charset=utf-8');
      header("access-control-allow-origin: *");
      $this->load->model('search/srch');
      echo 'we will start now';
      $this->srch->getStats();
      //echo $this->srch->getStats();

   }

   function savecollection_post(){
      $this->load->model('search/srch');
      header('content-type: application/json; charset=utf-8');
      header("access-control-allow-origin: *");
      $input_data = json_decode(trim(file_get_contents('php://input')), true);


      $title = $input_data['title'];
      $description = $input_data['text'];
      $items = $input_data['items'];

      $data['title'] = $title;
      $data['description'] = $description;
      $data['items'] = $items;

      echo $this->srch->save_collection($data);

      //print_r($data);
      //echo $this->input->post('title');
   }

   /*function savecollection_get(){
      header('content-type: application/json; charset=utf-8');
      header("access-control-allow-origin: *");
      echo 'ok we saved';
   }*/

   function details_get(){
      $docID = $this->get('docID');
      // ok so i need to get the details of the object. I already have the function that will the necessery things for me
      // so lets use them.
      header('content-type: application/json; charset=utf-8');
      header("access-control-allow-origin: *");

      $this->load->model('details/det');

      $result = $this->det->get_object_details_new($docID);
      $smallMetadata =array();
      $bigMetadata = array();
      $smallIndicator = true;
      $descriptionIndicator = true;
      //print_r($result);
      if( $result['collection'] != 'Grammatia' || $result['collection']!="Art Gallery" || $result['collection']!="Byzantine_Museum" || $result['collection']!="Der Avedissian-Hawley"){

         foreach($result['metadataList'] as $item){
            if($item[0] == "Object"){
               $smallIndicator = false;
            }
           
            if($item[0] == "Description"){
               if($descriptionIndicator) {
                  $smallMetadata[] = array("Description" => $item[1] );
               }
               $descriptionIndicator = false;
            }
            
            if($smallIndicator){
               if($item[1]!=""){
                  if($item[0] == "Title"){
                     $smallMetadata[] = array("Collection" => $item[1]);
                  }else{
                     $smallMetadata[] = array($item[0] => $item[1]);   
                  }
                     
               }
            }
         
         }
         

      }else{
            $smallMetadata = array();
            foreach($result['metadataList'] as $item){
               $smallMetadata[] = array($item[0] => $item[1]);
            }

      }
      $result['metadataList'] = $smallMetadata;
      
      if($result['objectType'] == 'pdf'){
         $result['imageLocation'] = "http://public.cyi.ac.cy".$result['imLocation'];
      }
      if($result['objectType'] == 'images'){

         $result['imageLocation'] = $result['imLocation'];
         if($result['location'] == "local"){
            $result['imageLocation'] = "http://public.cyi.ac.cy".$result['imageLocation'];
         }
      }
      if($result['objectType'] == 'x3d'){
         $result['imageLocation'] = "http://public.cyi.ac.cy".$result['imageLocation'];
      }
      //print_r($result);
      
      

      
      echo json_encode($result);
   }

	function search_get(){
		//echo json_encode(array(array('title'=>'prvi'), array('title'=>'drugi')));
		//echo json_encode(array('type'=>'images', 'title'=>'Images'), array('type'=>'pdf', 'title'=> '3D Pdf'),array('type'=>'X3D', 'title'=>'X3DOM'));
		$types = $this->get('types');
		$collections = $this->get('collections');
      
      $query = $this->get('search');
      //ok here i need to run search. For this i need model that will return an array of object. 
      //So basically i am finished here. 
		//echo $query;

      //echo $query;
      //print_r($collections);

      $this->load->model('explore/exp');
      //print_r($types);
      header('content-type: application/json; charset=utf-8');
      header("access-control-allow-origin: *");
      
      $result = $this->exp->searchObjects($query, $collections, $types);
      //print_r($result);
		//echo json_encode(array(array('id'=>0,'title'=>'prvi', 'type'=>'img'), array('id'=>1,'title'=>'drugi', 'type'=>'img')));
      
      echo json_encode($result);
		//echo 'ajme';
	}
	function init_get(){
		//$i = $this->get('name');
		// i want all the collections. I already have this model in explore?
      header('content-type: application/json; charset=utf-8');
      header("access-control-allow-origin: *");

		$this->load->model('explore/exp');
		$collections=$this->exp->getCollectionList(array());
	   //$collections = array('prvi', 'drugi', 'treci', 'cetvrti');
		
		$types = array(array('type'=>'images', 'title'=>'Images'), array('type'=>'pdf', 'title'=> '3D Pdf'),array('type'=>'X3D', 'title'=>'X3DOM'));

		echo json_encode(array('collections'=>$collections, 'types' => $types));
	}
  
	
	
	
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */


/* Location: ./application/models/auth/users.php */