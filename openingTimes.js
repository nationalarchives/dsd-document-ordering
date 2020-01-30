

var openingTimes = (function() {
  "use strict";

  // Properties
  var _today = new Date();

  // Methods

  /**
   * @methodName _getTime hidden method
   * @description Get the local time in a string format
   * @return 16:30 (Time format example)
   */
  function _getTime() {
    return _today.toLocaleTimeString('en-GB', {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit"
    });
  }

  /**
   * @methodName _changeStatus hidden method
   * @param String slot number
   * @info Update the slot status
   */
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

  /**
   * @methodName  checkTime visible method
   * @param String previous slot ending time
   * @param String next slot start time
   * @param String slot number
   * @description select the next available slot
   */
  function checkTime(prevEnd, nextStart, slot) {
    var currentTimeWithoutColon = _getTime().replace(':','.').replace(/[A-Z]/gi,'');

    if (currentTimeWithoutColon > prevEnd && currentTimeWithoutColon < nextStart) {
      _changeStatus(slot);
    }
  }

  /**
   * @methodName  noSlots visible method
   * @param String
   * @description Change text when there are no more available slots
   */
  function noSlots(lastSlot) {
    var currentTimeWithoutColon = _getTime().replace(':','.').replace(/[A-Z]/gi,'');
    var lastSlotWithoutColon = lastSlot.replace(':','.').replace(/[A-Z]/gi,'');

    if (currentTimeWithoutColon > lastSlotWithoutColon) {
      document.querySelector("h2.parchment").innerText =
          "Document ordering finished at 15:30 today";
    }
  }

  // Reveal methods
  return {
    checkTime: checkTime,
    noSlots: noSlots
  };

})();


openingTimes.checkTime("00.00", "09.45", "slot1");
openingTimes.checkTime("10.30", "11.00", "slot2");
openingTimes.checkTime("11.45", "12.15", "slot3");
openingTimes.checkTime("13.00", "13.30", "slot4");
openingTimes.checkTime("14.15", "14.45", "slot5");
openingTimes.noSlots("15.30");
