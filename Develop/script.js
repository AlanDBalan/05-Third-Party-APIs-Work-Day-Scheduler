// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // Helper function to get the current hour in 24-hour format using Day.js
  function getCurrentHour() {
    return dayjs().format('H');
  }
  // Add click event listener to the save buttons to save user input in local storage.
  $('.saveBtn').on('click', function () {
    // Get the hour from the parent time-block element's ID (e.g., 'hour-9' -> '9')
    const hour = $(this).parent().attr('id').split('-')[1];
    // Get the user input from the textarea within the same time-block
    const userInput = $(this).siblings('.description').val();

    // Save the user input in local storage using the hour as the key
    localStorage.setItem(`hour-${hour}`, userInput);
  });
  // Apply the past, present, or future class to each time block based on the current hour.
  function updateHourClasses() {
    const currentHour = getCurrentHour();

    $('.time-block').each(function () {
      const hour = $(this).attr('id').split('-')[1];
      if (hour < currentHour) {
        $(this).removeClass('present future').addClass('past');
      } else if (hour === currentHour) {
        $(this).removeClass('past future').addClass('present');
      } else {
        $(this).removeClass('past present').addClass('future');
      }
    });
  }
  // Call the updateHourClasses function initially to set the classes on page load.
  updateHourClasses();

  // Retrieve user input from local storage and set the values of corresponding textarea elements.
  function updateSavedUserInput() {
    $('.time-block').each(function () {
      const hour = $(this).attr('id').split('-')[1];
      const userInput = localStorage.getItem(`hour-${hour}`);
      $(this).find('.description').val(userInput);
    });
  }

  // Call the updateSavedUserInput function initially to set the values on page load.
  updateSavedUserInput();

  // Display the current date at the top of the page using Day.js
  const currentDate = dayjs().format('dddd, MMMM D, YYYY');
  $('#currentDay').text(currentDate);
});