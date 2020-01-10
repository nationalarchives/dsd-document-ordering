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
    return _today.toLocaleTimeString([], {
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
   * @param String end time
   * @param String previous ending slot time
   * @param String slot number
   * @description select the next available slot
   */
  function checkTime(end, prevEnd, slot) {
    if (_getTime() <= end && _getTime() > prevEnd) {
      _changeStatus(slot);
    }
  }

  /**
   * @methodName  noSlots visible method
   * @param String
   * @description Change text when there are no more available slots
   */
  function noSlots(lastSlot) {
    if (_getTime() > lastSlot) {
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

openingTimes.checkTime("10:30", "07:00", "slot1");
openingTimes.checkTime("11:45", "10:30", "slot2");
openingTimes.checkTime("13:00", "11:45", "slot3");
openingTimes.checkTime("14:15", "13:00", "slot4");
openingTimes.checkTime("15:30", "14:15", "slot5");
openingTimes.noSlots("15:30");
