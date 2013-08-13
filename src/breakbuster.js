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
        is_last_child,
        get_words_with_nobreak_characters,
        wrap_words,
        remove_duplicate_items,
        process_text_nodes,
        update_dom_with_updated_element,
        update_text_with_wrapped_words;

    // default settings
    settings = $.extend({
      // defaults to all 3 dash types: regular, en, em but can prevent break on any character
      characters: ['-','–','—']
      // characters: ['-']
    }, options );

    is_last_child = function(element) {

      // confirm that the element has no children
      if ($(element).children().length === 0) {

        return true;

      } else {

        return false;

      }

    };

    process_text_nodes = function(element, wrapped_words) {

      var this_text_node,
          the_text,
          updated_text;

      $(element).contents().filter(function() {

        if (this.nodeType === 3) {

          // save the text node
          this_text_node = this;

          // get the text from this node
          the_text = $(this_text_node).text();

          // update the text by wrapping nobreak words with white-space: nowrap
          updated_text = update_text_with_wrapped_words(the_text, wrapped_words);

          // update the text node with the processed text
          $(this_text_node).replaceWith(updated_text);

        }

      });

      return element;

    };

    tokenize_text = function(text) {

      var tokenized_text = [];

      // tokenize the text
      tokenized_text = text.split(' ');

      return tokenized_text;

    };

    remove_duplicate_items = function(array) {

      var result = [];

      $.each(array, function(index, item) {

        // item is not in array, so add to the array of unique items
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

    update_dom_with_updated_element = function(element, updated_element) {

      // inject updated text back into element
      $(element).replaceWith(updated_element);

    };

    // iterate through the elements specified in breakbuster()
    return this.each(function() {

      var this_element = $(this),
          this_text = $(this_element).text(),
          tokenized_text = [],
          nobreak_words = [],
          wrapped_words = [],
          updated_element;

      tokenized_text = tokenize_text(this_text);

      nobreak_words = get_words_with_nobreak_characters(tokenized_text);

      wrapped_words = wrap_words(nobreak_words);

      updated_element = process_text_nodes(this_element, wrapped_words);

      update_dom_with_updated_element(this_element, updated_element);

    });

  };

}(jQuery));