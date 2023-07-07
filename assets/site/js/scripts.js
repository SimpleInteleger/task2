$(document).ready(function(){
	let Timer ;
	let id ;
	$("#start_button").click(function(){
		$.post('/testss/assets/site/php/tree.php',{
			
			action: "delete_all"
			
			}).done(function (data) {
			console.log(data);
		});
		$.post('/testss/assets/site/php/tree.php',{
			
			action: "create_root",
			id: "0",
			name: "root",
			creator: "none"
			
			}).done(function (data) {
			
			var array_data = jQuery.parseJSON(data);
			if(array_data.result=="done"){
				var el = "<div class='root' id='root_0' ><button data-id='0' type='button' class='del-button btn btn-danger ' >-</button><button data-id='0' type='button' class='rename-button btn btn-primary ' >RENAME</button><a href='#'>ROOT</a><button data-id='0' type='button' class='hide-button btn btn-primary ' style='display:none;'>&#9650;</button><button data-id='0' type='button' class='add-button btn btn-success' >+</button></div>";
				$( "#start_button" ).after(el);
				$("#start_button").slideUp();
			}
			
		});
		
	});
	$('#space').on('click', '.add-button', function(){
		var id_cr = $(this).data("id");
		
		var id = "";
		$.post('/testss/assets/site/php/tree.php',{
			
			action: "next_id"
			
			}).done(function (data) {
			var id = data.replace(/[^0-9]/gi, '');
			$.post('/testss/assets/site/php/tree.php',{
				
				action: "create_root",
				id: id,
				name: "root_"+id,
				creator: id_cr
				
				}).done(function (data) {
				
				var array_data = jQuery.parseJSON(data);
				//alert(id_cr+"|"+id+"|"+array_data.result+"|"+array_data.id+"|"+array_data.name+"|"+array_data.creator);
				if(array_data.result=="done"){
					//alert("1");
					if($( "#rootbox_"+id_cr ).length){
						
						$( "#rootbox_"+id_cr ).append("<div class='root' id='root_"+array_data.id+"' ><button data-id='"+array_data.id+"' type='button' class='del-button btn btn-danger ' >-</button><button data-id='"+array_data.id+"' type='button' class='rename-button btn btn-primary ' >RENAME</button><a href='#'>"+array_data.name+"</a><button data-id='"+array_data.id+"' type='button' class='hide-button btn btn-primary ' style='display:none;'>&#9650;</button><button data-id='"+array_data.id+"' type='button' class='add-button btn btn-success' >+</button></div>");
						//alert("11");
						}else{
						$( "#root_"+id_cr ).after("<div class='root_div' id='rootbox_"+id_cr+"'><div class='root' id='root_"+array_data.id+"' ><button data-id='"+array_data.id+"' type='button' class='del-button btn btn-danger ' >-</button><button data-id='"+array_data.id+"' type='button' class='rename-button btn btn-primary ' >RENAME</button><a href='#'>"+array_data.name+"</a><button data-id='"+array_data.id+"' type='button' class='hide-button btn btn-primary ' style='display:none;'>&#9650;</button><button data-id='"+array_data.id+"' type='button' class='add-button btn btn-success' >+</button></div></div>");
						//alert("12");
						$( "#root_"+id_cr+" .hide-button").slideDown();
					}
					
				}
				
			});
			
		});
		
	});
	$('#space').on('click', '.del-button', function(){
		var ids = [];
		var id = $(this).data("id");
		if(id != 0){
			var allroots = $('#rootbox_'+id).find(".root");
			for (let i = 0; i < allroots.length; i++) {
				ids.push(allroots[i].id.replace(/[^0-9]/gi, ''));
			}
			ids.push(id);
			var ids_json = JSON.stringify(ids);
			
			$.post('/testss/assets/site/php/tree.php',{
				
				action: "delete_root",
				ids:ids_json
				
				}).done(function (data) {
				if(data.includes("deleted")){
					$('#rootbox_'+id).remove();
					$('#root_'+id).remove();
					if($('#rootbox_0').is(':empty')){
						$('#rootbox_0').remove();
					}
				}
				
				
				
			});
		}
		else
		{
	        $('.numberTimer').html("20");
			Timer = setInterval(lostSeconds, 1000);
			$('#popup_del').slideDown();
		}
		
	});
	$('#space').on('click', '.rename-button', function(){
	   $("#popup_rename").slideDown();
		id = $(this).data("id");
		
		
	});
	$('#space').on('click', '.hide-button', function(){
	   
		var id = $(this).data("id");
		if($('#rootbox_'+id).css("display") != "none"){
		$('#rootbox_'+id).slideUp();
		$(this).html("&#9660;")
		}else{
		$('#rootbox_'+id).slideDown();
		$(this).html("&#9650;")
		}
		
		
	});
	$(".yes-button-rename").click(function(){
	var name = $("#text-rename").val();
	
		$.post('/testss/assets/site/php/tree.php',{
			
			action: "rename_root",
		id:id,
		name:name
			
			}).done(function (data) {
			alert(data);
			if(data.includes("done")){
			
				$("#root_"+id+" a").html(name);
				$("#popup_rename").slideUp();
				}
		
			
		});
	});
	$(".no-button-rename").click(function(){
		id=-1;
		$("#popup_rename").slideUp();
	});
	$(".yes-button").click(function(){
		var ids = [];
		var id = 0;
		var allroots = $('#rootbox_'+id).find(".root");
		for (let i = 0; i < allroots.length; i++) {
			ids.push(allroots[i].id.replace(/[^0-9]/gi, ''));
		}
		ids.push(id);
		var ids_json = JSON.stringify(ids);
		
		$.post('/testss/assets/site/php/tree.php',{
			
			action: "delete_root",
			ids:ids_json
			
			}).done(function (data) {
			if(data.includes("deleted")){
				$('#rootbox_'+id).remove();
				$('#root_'+id).remove();
				$("#start_button").slideDown();
				$('#popup_del').slideUp();
				clearInterval(Timer);
			}
		});
	});
	$(".no-button").click(function(){
		$('#popup_del').slideUp();
		clearInterval(Timer);
	});
	$(".exit-button").click(function(){
		$('#popup_del').slideUp();
		clearInterval(Timer);
	});
	function lostSeconds (){
		var seconds = parseInt($('.numberTimer').html());
		if(seconds == 0){
			$('#popup_del').slideUp();
			clearInterval(Timer);
			}else{
			seconds = seconds - 1;
			$('.numberTimer').html(seconds);
		}
	}
	$("a").click(function(e){
		e.preventDefault();
	});
	
	
});	