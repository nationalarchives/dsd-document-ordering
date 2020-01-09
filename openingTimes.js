var openingTimes = (function() {
  "use strict";

  var _today = new Date();

  function _getTime() {
    return _today.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });
  }

  function checkTime(start, end, slot) {
    if (start < _getTime() && end >= _getTime()) {
      var list = document.querySelector("#dsd-opening-times-slot").rows;
      for (var i = 0; i < list.length; i++) {
        var cells = list[i].cells;
        for (var j = 0; j < cells.length; j++) {
          if (cells[j].classList.contains(slot)) {
            cells[j].classList.remove("invalid");
            cells[j].classList.add("valid");
          }
        }
      }
    } else {
      document.querySelector("h2.parchment").innerText =
        "There are no slots available";
    }
  }

  return {
    checkTime: checkTime
  };
})();

openingTimes.checkTime("09:45", "10:30", "slot1");
openingTimes.checkTime("11:00", "11:45", "slot2");
openingTimes.checkTime("12:15", "13:00", "slot3");
openingTimes.checkTime("13:30", "14:15", "slot4");
openingTimes.checkTime("14:45", "15:30", "slot5");
