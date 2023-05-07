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

function generateTimeslots() {
  for (var hour = options.startHour; hour <= options.endHour; hour++) {
    var savedTask = localStorage.getItem(hour) || "";
    var $timeBlock = $("<div>", {
      class: "row time-block",
      "data-hour": hour,
      html: `
        <div class="col-sm-2 hour">${hour}</div>
        <div class="col-sm-8 row">
          <textarea class="col-md-10 description">${savedTask}</textarea>
        </div>
        <div class="col-sm-2">
          <button class="btn btn-primary saveBtn">Save</button>
        </div>
      `,
    });

    $(".container").append($timeBlock);
  }
}

function init() {
  generateTimeslots();
  updateTimeslots();
  $(".container").on("click", ".saveBtn", onSaveTask);

  var $currentDay = $("#currentDay");
  setInterval(function () {
    var currentDay = dayjs().format("dddd MMMM D YYYY, h:mm:ss a");
    $currentDay.text(currentDay);
    updateTimeslots();
  }, 10000);
}

init();
