// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener( 'deviceready', onDeviceReady.bind( this ), false );

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener( 'pause', onPause.bind( this ), false );
        document.addEventListener('resume', onResume.bind(this), false);
        addCoord();
        deleteCoord();
        setMarginTop();
        plot();
        
        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };

    function addCoord() {
        document.querySelector('.add').addEventListener('click', function () {
            var newDiv = document.createElement('div');
            var newInputX = document.createElement('input');
            var newInputY = document.createElement('input');
            var newI = document.createElement('i');
            newDiv.className = 'coord';
            newInputX.className = 'x';
            newInputX.setAttribute('type', 'number');
            newInputX.setAttribute('pattern', '[0-9\.]*');
            newInputX.setAttribute('step', '0.01');
            newInputY.className = 'y';
            newInputY.setAttribute('type', 'number');
            newInputY.setAttribute('pattern', '[0-9\.]*');
            newInputY.setAttribute('step', '0.01');
            newI.className = 'fa fa-times';
            newI.addEventListener('click', function () {
                this.parentNode.remove();
            });
            newDiv.appendChild(newInputX);
            newDiv.appendChild(newInputY);
            newDiv.appendChild(newI);
            document.querySelector('.coordinates').appendChild(newDiv);
        });
    };

    function deleteCoord() {
        var inputs = document.querySelectorAll('.fa-times');
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].addEventListener('click', function () {
                this.parentNode.remove();
            })
        }
    };

    function setMarginTop() {
        var offsetHeight = document.querySelector('.plotWrapper').offsetHeight;
        document.querySelector('.coordinates').setAttribute('style', 'margin-top:' + offsetHeight + 'px;');
    };

    function plot() {
        document.querySelector('.plot span').addEventListener('click', plotChart);
    };

    function coords(letter) {
        var CoordsInputs = document.querySelectorAll('.' + letter);
        var Coords = [];
        for (var i = 0; i < CoordsInputs.length; i++)
            if (CoordsInputs[i].value == '') {
                Coords = [];
                break;
            }
            else
                Coords[i] = CoordsInputs[i].value;
        return Coords;
    };

    function getData(x, y) {
        var data = [];
        for (var i = 0; i < x.length; i++)
            data[i] = {
                x: x[i]-0, y: y[i]-0, name: 'firstLine'
            };
        return data;
    }

    function plotChart() {
        var xCoords = coords('x');
        var yCoords = coords('y');

        if (xCoords.length === 0 || yCoords.length === 0) {
            swal("There are empty fields!");
        }
        else {
            clear(xCoords, yCoords);
            var defData = getData(xCoords, yCoords);

            var lineElement = {
                unit: {
                    type: 'COORDS.RECT',
                    x: 'x',
                    y: 'y',
                    guide: {
                        showGridLines: 'xy',
                        padding: { l: 0, t: 10, b: 0, r: 10 },
                        x: { label: 'Abscissa' },
                        y: { label: { text: 'Ordinates', padding: 40 } }
                    },
                    unit: [{
                        type: 'ELEMENT.LINE',
                        x: 'x',
                        y: 'y'
                    }]
                }
            };

            var s = new tauCharts.Plot(
                    {
                        data: defData,
                        spec: lineElement

                    }).renderTo('#line');
        }
    };

    function clear(x, y) {
        document.querySelector('.plotWrapper').style.display = "none";
        document.querySelector('.coordinates').style.display = "none";
        document.querySelector('.add').style.display = "none";
        document.querySelector('body').style.height = "100%";
        document.querySelector('.line').style.height = "100%";

        var newDiv = document.createElement('div');
        var newI = document.createElement('i');
        var newIsave = document.createElement('i');
        newI.innerHTML = " CHANGE COORDINATES";
        newIsave.innerHTML = "SAVE SHEDULE";
        newI.className = 'fa fa-backward';
        newIsave.className = 'fa fa-floppy-o';
        newI.addEventListener('click', function () {
            document.querySelector('.plotWrapper').style.display = "flex";
            document.querySelector('.coordinates').style.display = "block";
            document.querySelector('.add').style.display = "inline-block";
            document.querySelector('body').style.height = "0";
            document.querySelector('.line').style.height = '0';
            document.querySelector('.graphical-report__layout').remove();
            this.parentNode.remove();
        });
        newIsave.addEventListener('click', function () {
            swal({
                title: "Enter shedule's name",
                text: "Write something:",
                type: "input",
                showCancelButton: true,
                closeOnConfirm: false,
                animation: "slide-from-top",
                inputPlaceholder: "Write something"
            }, function (inputValue) {
                if (inputValue === "") {
                    swal.showInputError("You need to write something!");
                    return false;
                }
                else {
                    var item = inputValue + ';' + x.toString() + ';' + y.toString();
                    if (localStorage.graf == undefined)
                        localStorage.setItem('graf', item);
                    else
                        localStorage.graf = localStorage.graf.concat('-' + item);
                }
                swal("Nice!", "Shedule is saved by name: " + inputValue, "success");
            });
        });
        newDiv.appendChild(newI);
        newDiv.appendChild(newIsave);
        document.querySelector('.line').appendChild(newDiv);
    };
} )();