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

//This is a JavaScript code that creates a daily planner with time slots for users to input their tasks or schedule.
//The planner has a start hour and end hour, and time slots are created for each hour in between.
//The updateTimeslots() function updates the styling of the time slots according to the current hour of the day.
//The onSaveTask(e) function is called when the user saves a task and stores the task in the local storage.
//The generateTimeslots() function creates the time slots and appends them to the HTML page.
//The init() function initializes the planner by calling generateTimeslots(), updateTimeslots(), and adding a click event listener to the save buttons.
//It also updates the current day and time every 10 seconds.
