(function($) {

	/**
	 * Gestion des votes avec le plugin
	 **/
	var options = {
		notename: 		"ul.notes-echelle",
		number: 		3,
	  	notechecked: 	"note-checked",
	  	noteoff: 		"note-off",
	  	notefocus: 		"note-focus"
	};
	$('ul.notes-echelle').uncleVote(options);

})(jQuery);