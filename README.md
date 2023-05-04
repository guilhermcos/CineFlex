![Cineflex-gif](https://user-images.githubusercontent.com/120587680/236305444-d8b1aa89-fe60-4781-90ac-b268cdac361a.gif)

# Introduction

This WEB MOBILE project was developed using ReactJS and is simulates the purchase of movie tickets in a cinema. Below you will find a description of the project's functionalities.

## Deploy
Project for Mobile
You can test the app here: https://projeto10-cineflex-teal-five.vercel.app/ obs: As a free hosting service is being used, the initial request may take a few seconds to load. However, once the server is up and running, the response time should improve significantly.

## Functionalities
### Movie Selection
Upon accessing the / route, the user will have access to the list of available movies. The movie information is obtained through a provided API. When clicking on a movie, the user is redirected to the /sessions/:movieId route, where :movieId is the id of the clicked movie.

### Session Selection
At the /sessions/:movieId route, from the movie id in the URL, the available sessions for the movie are obtained from the API and displayed according to the provided layout. When clicking on a session, the user is redirected to the /seats/:sessionId route, where :sessionId is the id of the selected session.

### Seat Selection
At the /seats/:sessionId route, from the session id, the session data is fetched from the API and displayed according to the provided layout. The user can select multiple seats and enter the name and CPF of the buyer for each selected seat. When clicking on an available seat, the seat is marked as "Selected". When clicking again on a selected seat, it goes back to "Available". When clicking on an unavailable seat, an alert of "This seat is not available" is displayed. When clicking on "Reserve seat(s)", the request is sent to the server and the user is redirected to the /success route. This makes the marked seats unavailable for other bookings.

### Footer
Throughout the Session and Seat screens, a footer is displayed with information about the selected movie. This information is obtained through API calls on each screen.

### Success
At the /success route, the layout is displayed according to the provided one, with the data of the made request. When clicking on "Back to Home", the user returns to the initial route (/), with the request zeroed.

### Back Button
A back button has been added at the top of the site to the left. When clicking on the back button, the user returns to the previously viewed page. The button is not displayed on the initial screen.

### Buyer Information per Seat
The Name and CPF fields for the buyer are no longer a single field, but are now fields for each selected seat. That is, each selected seat has its own Name and CPF field. As the person selects seats, the fields are displayed below in the quantity that corresponds to the selected seats. When unchecking a seat that already had filled data, a confirm message asks the user if they really want to remove the seat and erase the data. On the success screen, the names and CPFs of all buyers are displayed.
