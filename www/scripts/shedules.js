// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkID=397704
// To debug code on page load in Ripple or on Android devices/emulators: launch your app, set breakpoints, 
// and then run "window.location.reload()" in the JavaScript Console.
(function () {
    "use strict";

    document.addEventListener('deviceready', onDeviceReady.bind(this), false);

    function onDeviceReady() {
        // Handle the Cordova pause and resume events
        document.addEventListener('pause', onPause.bind(this), false);
        document.addEventListener('resume', onResume.bind(this), false);
        //clear();
        loadShedules(); 

        // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
    };

    function onPause() {
        // TODO: This application has been suspended. Save application state here.
    };

    function onResume() {
        // TODO: This application has been reactivated. Restore application state here.
    };

    function clear() {
        localStorage.clear();
    }

    function loadShedules() {
        if (localStorage.graf == undefined) 
            document.querySelector('#title').innerHTML = 'List of saved shedules is empty';
        else {
            document.querySelector('#title').innerHTML = 'List of saved shedules:';
            var shedules = localStorage.graf.split('-');
            for (var i = 0; i < shedules.length; i++) {
                var newLi = document.createElement('li');
                newLi.innerHTML = shedules[i].split(';')[0];
                document.querySelector("#listOfShedules").appendChild(newLi);
            }
        }
    };
})();