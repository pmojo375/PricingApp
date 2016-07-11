/**
 * Created by Mojsiejenko on 7/10/16.
 */

// global variables
var frontYardLowTotal = 0;
var frontYardHighTotal = 0;
var backYardLowTotal = 0;
var backYardHighTotal = 0;
var overallLowTotal = 0;
var overallHighTotal = 0;

function buttonClicked(context) {
    context.classList.toggle("active");
    context.nextElementSibling.classList.toggle("show");
}

function noPriorityClicked(context, index) {
    var priorityLabel = context.parentElement;
    var priorityRadios = priorityLabel.parentElement;
    var cost = document.getElementById("0" + index);

    context.checked = true;

    priorityRadios.parentElement.style.borderLeft = "0px solid";

    cost.innerHTML = "Option Not Selected";

    var radios = document.getElementsByName(index);

    for (var i = 0; i < radios.length; i++) {
        radios[i].checked = false;
    }

    document.getElementById(index).style.visibility = 'hidden';

    buttonClicked(priorityRadios.parentElement);

    frontYardChange();
    backYardChange();
}

function highPriorityClicked(context) {
    var priorityLabel = context.parentElement;
    var priorityRadios = priorityLabel.parentElement;

    priorityRadios.parentElement.style.borderLeft = "10px solid red";
}

function mediumPriorityClicked(context) {
    var priorityLabel = context.parentElement;
    var priorityRadios = priorityLabel.parentElement;

    priorityRadios.parentElement.style.borderLeft = "10px solid yellow";
}

function lowPriorityClicked(context) {
    var priorityLabel = context.parentElement;
    var priorityRadios = priorityLabel.parentElement;

    priorityRadios.parentElement.style.borderLeft = "10px solid green";
}

function sizeSelected(context, index) {
    var cost = document.getElementById("0" + index);
    var category = document.getElementsByName(index);

    if(context.checked) {
        cost.innerHTML = context.getAttribute("data-pricestring");
    }

    document.getElementById(index).style.visibility = 'visible';

    if(document.getElementById(index).getElementsByTagName("input")[3].checked) {
        document.getElementById(index).getElementsByTagName("input")[1].checked = true;
        lowPriorityClicked(document.getElementById(index).getElementsByTagName("input")[1]);
    }
    
    if(context.getAttribute("data-frontyard")) {
        frontYardChange();
    } else {
        backYardChange();
    }
}

Number.prototype.formatMoney = function (c, d, t) {
    var n = this,
        c = isNaN(c = Math.abs(c)) ? 2
            : c,
        d = d == undefined ? "." : d,
        t = t == undefined ? "," : t,
        s = n < 0 ? "-" : "",
        i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j
        ) + t : "") + i.substr(
            j)
            .replace(/(\d{3})(?=\d)/g

                , "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) :

                ""
        );
};

function backYardChange() {

    // reset the overall totals to 0
    overallHighTotal = 0;
    overallLowTotal = 0;

    for(var i = 1; i < 12 ; i++) {

        // get the elements for a category
        var radios = document.getElementsByName(i);

        for (var j = 0; j < radios.length; j++) {
            if (radios[j].checked) {
                overallLowTotal += parseInt(radios[j].getAttribute("data-low"));
                overallHighTotal += parseInt(radios[j].getAttribute("data-high"));
            }
        }
    }

    //document.querySelector('.content11 .value11').innerHTML = '$'.concat(frontyardlowEnd.formatMoney(0));
    //document.querySelector('.content11 .value12').innerHTML = '$'.concat(frontyardhighEnd.formatMoney(0));
}

function frontYardChange() {

    // reset the overall totals to 0
    frontYardHighTotal = 0;
    frontYardLowTotal = 0;

    for(var i = 1; i < 12 ; i++) {

        // get the elements for a category
        var radios = document.getElementsByName(i);

        for (var j = 0; j < radios.length; j++) {
            if (radios[j].checked) {
                frontYardLowTotal += parseInt(radios[j].getAttribute("data-low"));
                frontYardHighTotal += parseInt(radios[j].getAttribute("data-high"));
            }
        }
    }

    document.querySelector('.content .value1').innerHTML = '$'.concat(frontYardLowTotal.formatMoney(0));
    document.querySelector('.content .value2').innerHTML = '$'.concat(frontYardHighTotal.formatMoney(0));
}
