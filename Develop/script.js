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
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});