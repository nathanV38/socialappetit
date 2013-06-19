$(document).ready(function(){
	/*$(".fieldSecondary label").inFieldLabels();
	$("#inscr-form").validate({
		rules:{
			"mail": {
				"email": true,
				"maxlength": 255
			}
		}
	});
	$("#contact-form").validate({
		rules:{
			"description":{
				"required": true,
				"minlength": 2,
				"maxlength": 60000
			},
			"mail": {
				"email": true,
				"maxlength": 255
			}
		}
	});*/
$("a#bienvenue").fancybox({
	width:450,
	height:360,
	'overlayShow'	:	true,
	autoScale:true,
	autoDimensions:false,
	centerOnScroll:false,
	padding:0,
	overlayColor:'#000000'

});

	$('#valid').on('click', function(e) {
		e.preventDefault();
		//$("a#bienvenue").fancybox();
		var a=0;
		var b=0;
		if($('#recevoir').is(':checked')) { a=1; }
		if($('#recu').is(':checked')) { b=1; }
		if($('#mail').val()!='' && $('#postcode').val()!='') {
				$.ajax({
	        type: "POST",
	        url: "include/ajax/landing_signup.php",
	        data: {
	            mail: $('#mail').val(),
	            cp:$('#postcode').val(),
	            recevoir:a,
	            etrerecu:b,
	        }
		    }).done(function (e) {
		    	$("a#bienvenue").click();
		    });
		} else {
			if($('#mail').val()=='') $('#mail').addClass('error');
			if($('#postcode').val()=='') $('#postcode').addClass('error');
		}
	});

});