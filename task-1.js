/* globals document, window, console */

function solve() {
    return function (selector, suggestionsArray) {

        var selectedElement = document.querySelector(selector);

        var addBtn = selectedElement.getElementsByClassName("btn-add")[0];

        var suggUl = selectedElement.getElementsByClassName("suggestions-list")[0];

        var textBoxPattern = selectedElement.getElementsByClassName("tb-pattern")[0];

        var suggestionAs = selectedElement.getElementsByClassName("suggestion-link");

        var suggLiTemplate = document.createElement("li");
        suggLiTemplate.className = "suggestion";

        var suggATemplate = document.createElement("a");
        suggATemplate.className = "suggestion-link";

        suggLiTemplate.appendChild(suggATemplate);

        suggestionsArray = suggestionsArray || [];

        for (var i = 0; i < suggestionsArray.length; i++) {
            var currSugg = suggestionsArray[i];

            var existingSuggs = selectedElement.getElementsByClassName("suggestion-link");

            var suggAlreadyAdded = false;

            if (existingSuggs[0] !== undefined) {
                for (var i = 0; i < existingSuggs.length; i++) {
                    if (currSugg.toLowerCase() === existingSuggs[i].innerHTML.toLowerCase()) {
                        suggAlreadyAdded = true;
                    }
                };
            }

            if (suggAlreadyAdded === false) {
                suggATemplate.innerHTML = currSugg;

                var newSuggLi = suggLiTemplate.cloneNode(true);

                newSuggLi.style.display = "none";

                suggUl.appendChild(newSuggLi);
            }

        }

        addBtn.addEventListener("click", function (event) {

            var existingSuggs = selectedElement.getElementsByClassName("suggestion-link");

            var suggAlreadyAdded = false;

            if (existingSuggs[0] !== undefined) {
                for (var i = 0; i < existingSuggs.length; i++) {
                    var currSugg = existingSuggs[i].innerHTML.toLowerCase();
                    if (currSugg === textBoxPattern.value.toLowerCase()) {
                        suggAlreadyAdded = true;
                    }
                };
            }
           
            if (suggAlreadyAdded === false) {
                suggATemplate.innerHTML = textBoxPattern.value;

                var newSuggLi = suggLiTemplate.cloneNode(true);

                newSuggLi.style.display = "none";

                suggUl.appendChild(newSuggLi);
            }
        });

        textBoxPattern.addEventListener("input", function (event) {
            var textBoxInput = textBoxPattern.value.toLowerCase();

            var existingSuggs = selectedElement.getElementsByClassName("suggestion-link");

            if (textBoxInput !== undefined) {
                
                for (var i = 0; i < existingSuggs.length; i++) {
                    var currSugg = existingSuggs[i].innerHTML.toLowerCase();
                    
                    if (currSugg.indexOf(textBoxInput) !== -1) {
                        existingSuggs[i].parentNode.style.display = "";
                    }
                    else {
                        existingSuggs[i].parentNode.style.display = "none";
                    }
                    if (textBoxInput === "") {
                        existingSuggs[i].parentNode.style.display = "none";
                    }
                };
            }
            suggestionAs = selectedElement.getElementsByClassName("suggestion-link");
        });

        suggUl.addEventListener("click", function (event) {
            if ((event.target.className === "suggestion-link")) {
            textBoxPattern.value = event.target.innerHTML;
            }
        });
    };
}

module.exports = solve;