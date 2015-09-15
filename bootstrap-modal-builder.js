/* =========================================================
 * bootstrap-modal-builder.js v0.1.0
 * =========================================================
 * Copyright 2012 Piotrek Okoński
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */


!function ($) {

  "use strict";

  /* Trigger hide event when $.hide() is called
   */
  (function ($) {
      $.each(['show', 'hide'], function (i, ev) {
      var el = $.fn[ev];
          $.fn[ev] = function () {
	      this.trigger(ev);
	      return el.apply(this, arguments);
         };
      });
  })($);	

  /* MODAL BUILDER PRIVATE METHODS
   * ===================== */
  function disposeModal(e) {
    $(e.target).remove()
  }

  function buildButton(button, options) {
    var html;
    button = $.extend({}, $.modal.defaults.button, button)

    html = $(button.html ? button.html : options.buttonTemplate)

    if (button.text) html.text(button.text)
    if (button.href) html.attr('href', button.href)

    if (button.classes) html.addClass(button.classes)
    if (button.close) html.attr('data-dismiss','modal')
    if (button.click) html.on('click', button.click)

    return html
  }

  /* MODAL BUILDER PLUGIN DEFINITION
   * ======================= */

  $.modal = function (options) {
  	var options = $.extend({}, $.modal.defaults, options),
      modal = $(options.template);
    modal.find('.modal-header')[options.header ? 'show' : 'hide']().children('.modal-title').text(options.title);
    modal.find('.modal-body').html(options.content);
    modal.find('.modal-footer')[options.footer ? 'show' : 'hide']();

	if (options.id) modal.attr('id', options.id)
    if (options.dispose) modal.on('hide', disposeModal)

    if (options.footer && options.buttons) {
      var footer = modal.find('.modal-footer')
      $.each(options.buttons, function (i, btn) {
        buildButton(btn, options).prependTo(footer)
      })
    }

    return modal.appendTo(document.body)
  }

  $.modal.defaults = {
      buttonTemplate: '<a class="btn"></a>'
    , button: {
          href: "#"
        , text: ""
        , close: false
      }
    , id: ""
    , template: '<div class="modal fade" role="dialog" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button class="close" data-dismiss="modal">×</button><h4 class="modal-title"></h4></div><div class="modal-body"></div><div class="modal-footer"></div></div></div></div>'
    , dispose: true
    , footer: true
    , header: true
    , title: ""
    , content: ""

  }

}(window.jQuery);
