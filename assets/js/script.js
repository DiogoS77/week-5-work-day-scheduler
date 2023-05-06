var options = {
  startHour: 9,
  endHour: 5,
};

function updateTimeslots() {
  console.log("updateTimeslots");
  var currentHour = dayjs().hour();

  $(".time-block").each(function () {
    var hour = $(this).attr("data-hour");
    console.log(hour, currentHour);

    $(this).find(".description").removeClass("past present future");

    if (hour < currentHour) {
      $(this).find(".description").addClass("past");
    } else if (hour == currentHour) {
      $(this).find(".description").addClass("present");
    } else {
      $(this).find(".description").addClass("future");
    }
  });
}

function onSaveTask(e) {
  var $timeBlock = $(e.target).closest(".time-block");
  var hour = $timeBlock.attr("data-hour");
  var task = $timeBlock.find(".description").val();

  localStorage.setItem(hour, task);

  console.log("saved");
}
