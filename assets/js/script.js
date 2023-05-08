var options = {
  startHour: 9,
  endHour: 17,
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
  alert("Saved");
}

function generateTimeslots() {
  for (var hour = options.startHour; hour <= options.endHour; hour++) {
    var savedTask = localStorage.getItem(hour) || "";
    var $timeBlock = $("<div>", {
      class: "row time-block",
      "data-hour": hour,
      html: `
       <div class="col-2 col-md-1 hour py-3">${hour}</div>
            <textarea class="col-8 col-md-10 description">${savedTask}</textarea>
            <button class="btn saveBtn col-2 col-md-1">
              <i class="fas fa-save"></i>
            </button>
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
