/*
SearchKeys extension for Chromium and Google Chrome
Copyright (C) 2009 Mark Pilgrim

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

var search_results = [];

function init_searchkey() {
    var injected_anything = false;
    var results = document.querySelectorAll(".g .r a.l:first-child");
    for (var i = 0; i < results.length; i++) {
      search_results.push(results[i]);
      var elmShortcut = document.createElement("span");
      var displayKey = i + 1;
      if (displayKey == 10) {
          displayKey = 0;
      }
      elmShortcut.innerHTML = "<span style='font-size:smaller;font-weight:bold;color:#999'> [" + displayKey + "]</span>";
      results[i].parentNode.appendChild(elmShortcut);
      injected_anything = true;
      if (i > 9) {
          break;
      }
    }
    return injected_anything;
}

function handle_searchkey(e) {
    if (e.altKey || e.metaKey || e.ctrlKey) {
      return;
    }

    var key = e.which - "0".charCodeAt(0);    
    if ((key >= 0) && (key <= 9)) {
      if (key == 0) {
          key = 10;
      }
      var result_node = search_results[key - 1];
      result_node.focus();
      var evObj = document.createEvent("MouseEvents");
      evObj.initEvent("click", true, false);
      result_node.dispatchEvent(evObj);
    }
}

function disable_searchkey() {
    document.onkeydown = null;
}

function enable_searchkey() {
    document.onkeydown = handle_searchkey;
}

if (init_searchkey()) {
    enable_searchkey();
    var input_elements = document.getElementsByTagName("input");
    for (var i = 0; i < input_elements.length; i++) {
      input_elements[i].addEventListener("focus", disable_searchkey);
      input_elements[i].addEventListener("blur", enable_searchkey);
    }
}

