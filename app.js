
function Dropdown(o) {
    this.options = o;
    this.init = function() {

        this.options = o;

        window.getdd = function(elem) {
            var id = elem.closest('.dropdown').parentElement.id;
            return window.dropdowns[id];
        }
        this.elem = document.getElementById(this.options.id);

        var val = this.options.val;
        var html = `<div class = 'dropdown'>
                        <div class='dropdown_value'>${val}</div>
                        <div class='dropdown_arrow'>V</div>
                        <div class ='dropdown_panel'>
                            <div class='dropdown_items'>
                            </div>
                        </div>
                    </div>`;
        this.elem.innerHTML = html;
        var elem = this.elem;

        // Made parent elem inline
        this.elem.style.display = 'inline-block';

        // Store a list dropdowns
        if (!window.dropdowns) window.dropdowns = {};
        window.dropdowns[this.options.id] = this;
        // Get elements
        this.items = elem.querySelector(".dropdown_items");
        this.arrow = elem.querySelector(".dropdown_arrow");
        this.value = elem.querySelector('.dropdown_value');

        // Populate dropdown items
        var data = this.options.data;
        html="";
        data.forEach(function(elem) {
            html += `<div class='dropdown_item'
            onclick='var self=getdd(this);self.clicked(this)'>${elem}</div>`
        });
        this.items.innerHTML = html;

        var self = this;

        // Supposed to make it so when user clicked anywhere on screen
        // it would close dropdowns
        /*
        document.addEventListener('click', function() {
            self.hide();
        });
        */

        // Drop the dropdown bar
        this.elem.addEventListener('click', function() {
            // *
            event.stopPropagation();
            if (self.isVisible)
                self.hide();
            else
            self.show();
        });

    }

    this.clicked = function(elem) {
        event.stopPropagation();
        this.hide();

        var newval = elem.innerHTML;
        this.value.innerHTML = newval;

        if (this.options.cb)
            this.options.cb(newval);
        //alert('in here');
    }
    this.show = function() {

        //close all dropdowns
        for (var dd in window.dropdowns)
            window.dropdowns[dd].hide();
        this.isVisible = true;
        this.items.style.transform = 'translate(0px,0px)';
        this.arrow.style.transform = 'rotate(180deg)';
    }
    this.hide = function() {

        if (!this.isVisible) return;

        this.isVisible = false;
        this.items.style.transform = 'translate(0px,-255px)';
        this.arrow.style.transform = 'rotate(0deg)';
        
    }

    this.init(); 
    return this;
}

var dd1 = new Dropdown({
    id: 'dd1',
    val: 'Texas',
    data: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 
    'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 
    'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 
    'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
    'Massachusetts', 'Michigan', 'Mississippi', 'Missouri', 'Montana',
    'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
    'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma',
    'Oregon', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 
    'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah',
    'Vermont', 'Virgin Islands', 'Virginia', 'West Virginia', 'Wisconsin',
    'Wyoming'],

    // Creating a callback function
    cb: function(newval) {
        //alert(newval);
    }

});

// dd2 = dropdown 2
var dd2 = new Dropdown({
    id: 'dd2',
    val: 'Austin',
    data: ['Austin', 'Dallas', 'Houston'],
    cb: function(newval) {
        //alert(newval);
    }
});

