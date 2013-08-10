/*
 * breakbuster
 * https://github.com/shaekuronen/jquery-breakbuster
 *
 * Copyright (c) 2013 Shae Kuronen
 * Licensed under the MIT license.
 */

(function($) {

  $.fn.breakbuster = function(options) {

    var settings,
        tokenize_text,
        get_words_with_nobreak_characters,
        wrap_words,
        update_dom_with_new_text,
        update_text_with_wrapped_words,
        remove_duplicate_items;

    // default settings
    settings = $.extend({
      // defaults to all 3 dash types: regular, en, em but can prevent break on any character
      characters: ['-','–','—']
      // characters: ['-']
    }, options );

    tokenize_text = function(text) {

      // tokenize the text
      var tokenized_text = [];
      tokenized_text = text.split(' ');
      return tokenized_text;

    };

    remove_duplicate_items = function(array) {

      var result = [];

      $.each(array, function(index, item) {

        if ($.inArray(item, result) === -1) {
          result.push(item);
        }

      });

      return result;

    };

    get_words_with_nobreak_characters = function(tokenized_text) {

      var words = [],
          unique_words = [];

      // for each characters specified in settings.characters
      $.each(settings.characters, function(index, character) {

        // for each word in the text (which has been tokenized)
        $.each(tokenized_text, function(index, word) {

          // if the word contains a hyphen or dash
          if (word.indexOf(character) > 0) {

            words.push(word);

          }

        });

      });

      // remove any duplicate words
      unique_words = remove_duplicate_items(words);

      return unique_words;

    };

    wrap_words = function(words) {

      var wrapped_words = [],
          wrapped_word = '';

      // for each word in words array
      $.each(words, function(index, word) {

        var object = {};

        // wrap the word in a span with css white-space: nowrap to break linebreak
        wrapped_word = '<span style="white-space:nowrap;">' + word + '</span>';

        object[word] = wrapped_word;

        // add the word and wrapped word the wrapped words array as a key value object
        wrapped_words.push(object);

      });

      return wrapped_words;

    };

    update_text_with_wrapped_words = function(text, wrapped_words) {

      // for each of the objects (key value pair) of word and wrapped word
      $.each(wrapped_words, function(index, object) {

        $.each(object, function(key, value) {

          var regex = new RegExp(key, "g");

          // replace the word with one wrapped in white-space:nowrap span tag
          text = text.replace(regex, value);

        });

      });

      return text;

    };

    update_dom_with_new_text = function(element, text) {

      // inject updated text back into element
      $(element).html(text);

    };

    // iterate through the elements specified in breakbuster()
    return this.each(function() {

      var this_element = $(this),
          this_text = $(this_element).text(),
          tokenized_text = [],
          nobreak_words = [],
          wrapped_words = [],
          updated_text = '';

      tokenized_text = tokenize_text(this_text);

      nobreak_words = get_words_with_nobreak_characters(tokenized_text);

      wrapped_words = wrap_words(nobreak_words);

      updated_text = update_text_with_wrapped_words(this_text, wrapped_words);

      update_dom_with_new_text(this_element, updated_text);


    });

  };

}(jQuery));
