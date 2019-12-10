var budgetController = (function () {

    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    }

    return {
        addItem: function(type, des, val) {

            id = data.allItems[type][data.allItems[type].length - 1].id + 1;

            if(type === 'exp') {
                var newItem = new Expense(id, des, val);
            } else if(type === 'inc') {
                var newItem = new Income(id, des, val);
            }

            data.allItems[type].push(newItem);
            return newItem;
        }
    }

})();

var UIController = (function () {

    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn'
    }

    return {
        getInput: function () {
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            }
        },
        getDOMstrings: function () {
            return DOMstrings;
        }
    }

})();

var controller = (function (budgetCtrl, UICtrl) {

    var setupEventListeners = function () {
        var DOM = UICtrl.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13) {
                ctrlAddItem();
            }
        });
    }

    var ctrlAddItem = function () {
        var input = UICtrl.getInput();

        budgetCtrl.addItem(input.type, input.description, input.value);
    };

    return {
        init: function () {
            setupEventListeners();
        }
    };

})(budgetController, UIController);

controller.init();