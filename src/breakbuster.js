/*
 * breakbuster
 * https://github.com/shaekuronen/jquery-breakbuster
 *
 * Copyright (c) 2013 Shae Kuronen
 * Licensed under the MIT license.
 */

(function($) {

  $.fn.breakbuster = function(options) {

    // default settings
    var settings = $.extend({
      // defaults to all 3 dash types: regular, en, em but can prevent break on any character
      characters: ['-','–','—'],
    }, options );

    return this.each(function() {

      var this_element = $(this),
          this_copy = $(this_element).text();

      // if this element has no children elements
      if (this_element.children().length === 0) {

        // for each type of character
        $.each(settings.characters, function(index, character) {

          // if copy contains a character
          if ( this_copy.indexOf(character) > 0 ) {

            // get the hyphenated words
            var words_with_characters = [];

            words_with_characters = this_copy.split(' ');

            // for each hyphenated word
            $.each(words_with_characters, function(index, word) {

              if (words_with_characters[index].indexOf(character) > 0) {

                // wrap the word in a span with css white-space: nowrap to break linebreak
                var wrapped_word_with_character = '<span style="white-space:nowrap;">' + word + '</span>';

                // replace the hyphenated word with one wrapped in span tag
                this_copy = this_copy.replace(word, wrapped_word_with_character);

              }

            });

            // inject updated copy back into element
            $(this_element).html(this_copy);

          }

        });

      }

    });

  };

}(jQuery));
