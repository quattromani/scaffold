(function($) {

	$.fn.jumpTo = function() {
		$('<option value="">Jump to…</option>').appendTo('#anchor');
		$('.jumpTo-anchor').each(function(index){
			$('<option value="'+$(this).attr('id')+'">'+$(this).text()+'</option>').appendTo('#anchor');
		});

		$('#anchor').change(function(){
			var divPosition = $('#'+$(this).val()).offset();
			$('html, body').animate({scrollTop: divPosition.top}, "slow");
		});
	}

}(jQuery));

$('.jumpTo').jumpTo();