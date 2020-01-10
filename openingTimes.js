var openingTimes = (function() {
  "use strict";

  var _today = new Date();

  function _getTime() {
    return _today.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit"
    });
  }

  function _changeStatus(slot) {
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
  }

  function checkTime(end, prevEnd, slot) {
    if (_getTime() <= end && _getTime() > prevEnd) {
      _changeStatus(slot);
    }
  }

  function noSlots(lastSlot) {
    if (_getTime() > lastSlot) {
      document.querySelector("h2.parchment").innerText =
        "Document ordering finished at 15:30 today";
    }
  }

  return {
    checkTime: checkTime,
    noSlots: noSlots
  };
})();

openingTimes.checkTime("10:30", "07:00", "slot1");
openingTimes.checkTime("11:45", "10:30", "slot2");
openingTimes.checkTime("13:00", "11:45", "slot3");
openingTimes.checkTime("14:15", "13:00", "slot4");
openingTimes.checkTime("15:30", "14:15", "slot5");
openingTimes.noSlots("15:30");
