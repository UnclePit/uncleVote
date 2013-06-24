/*
 *	jQuery-uncleVote
 *
 *	Licensed under GPL license.
 *	http://en.wikipedia.org/wiki/GNU_General_Public_License
 *  http://www.gnu.org/licenses/gpl.txt
 */

(function($) {

	jQuery.fn.uncleVote = function(options) {

		var $total = options.number,
			name = options.notename,
			check = options.notechecked,
			off = options.noteoff,
			focus = options.notefocus;
		for (var i = 1; i <= $total; i++) {
			var $li = document.createElement('li'),
				newlabel = $('<label for="note'+i+'" title="Note '+i+' sur '+$total+'">'+i+'</label>'),
				newinput = $('<input type="radio" name="notesA" id="note'+i+'" value="'+i+'" />');
			$(name).append($li);
			$($li).append(newlabel, [newinput]);
		}

		return this.each(function() {
			// On ajoute la classe "js" à la liste pour mettre en place par la suite du code CSS uniquement dans le cas où le Javascript est activé
			$(name).addClass("js");
			// On passe chaque note à l'état grisé par défaut
			$(name+" li").addClass(off);
			// Au survol de chaque note à la souris
			$(name+" li").mouseover(function() {
				// On passe les notes supérieures à l'état inactif (par défaut)
				$(this).nextAll("li").addClass(off);
				// On passe les notes inférieures à l'état actif
				$(this).prevAll("li").removeClass(off);
				// On passe la note survolée à l'état actif (par défaut)
				$(this).removeClass(off);
			});
			// Lorsque l'on sort du sytème de notation à la souris
			$(name).mouseout(function() {
				// On passe toutes les notes à l'état inactif
				$(this).children("li").addClass(off);
				// On simule (trigger) un mouseover sur la note cochée s'il y a lieu
				$(this).find("li input:checked").parent("li").trigger("mouseover");
			});

			// Gestion des entrees clavier (fleches, tab)
			$(name+" input")
				// Lorsque le focus est sur un bouton radio
				.focus(function() {
					// On passe les notes supérieures à l'état inactif (par défaut)
					$(this).parent("li").nextAll("li").addClass(off);
					// On passe les notes inférieures à l'état actif
					$(this).parent("li").prevAll("li").removeClass(off);
					// On passe la note du focus à l'état actif (par défaut)
					$(this).parent("li").removeClass(off);
				})
				// Lorsque l'on sort du sytème de notation au clavier
				.blur(function() {
					// Si il n'y a pas de case cochée
					if($(this).parents(name).find("li input:checked").length == 0) {
						// On passe toutes les notes à l'état inactif
						$(this).parents(name).find("li").addClass(off);
					}
				});

			// Modif. si pas d'image
			$(name+" input")
				// Lorsque le focus est sur un bouton radio
				.focus(function() {
					// On supprime les classes de focus
					$(this).parents(name).find("li").removeClass(focus);
					// On applique la classe de focus sur l'item tabulé
					$(this).parent("li").addClass(focus);
					// [...] cf. code précédent
				})
				// Lorsque l'on sort du sytème de notation au clavier
				.blur(function() {
					// On supprime les classes de focus
					$(this).parents(name).find("li").removeClass(focus);
					// [...] cf. code précédent
				})
				// Lorsque la note est cochée
				.click(function() {
					// On supprime les classes de note cochée
					$(this).parents(name).find("li").removeClass(check);
					// On applique la classe de note cochée sur l'item choisi
					$(this).parent("li").addClass(check);
				});

			// On simule un survol souris des boutons cochés par défaut
			$(name+" input:checked").parent("li").trigger("mouseover");
			// On simule un click souris des boutons cochés
			$(name+" input:checked").trigger("click");
		});
	};

})(jQuery);