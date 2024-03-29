# TravelLog -  Fly the World, Live Your Dreams. Your Bucket List, Your Adventure!

## Table of Contents

1. [App Description](#App_-Description)
2. [Technologies](#Technologies)
3. [Project Planning](#Project-Planning)
4. [App Functionality](#App-Functionality)
5. [Deployment](#Deployment)
6. [Key Challenges](#Key-Challenges)
7. [Future Developments](#Future-Developments)
   
## App Description

With the ability to create, customize, and complete your bucket list, TravelLog empowers you to plan your dream adventures. Not only can you discover new destinations, but you can also share your travel experiences and edit your reviews to ensure your stories are accurately told. Track your travel journey by marking destinations as "visited" on your bucket list page. TravelLog is more than just a travel app; it's your personal travel companion, helping you to turn your travel dreams into lasting memories.

## Technologies

- **FrontEnd**: ReactJS, DaisyUI & Tailwind CSS
- **BackEnd**: Mongoose, Express, Node.js
- **Database**: MongoDB
- **APIs**: Google Maps API, Wikipedia API & GeoCode API
- **Others**: JWT for authentication

## Project Planning
- **WireFrame (MIRO)**: The development process for TravelLog began with the team outlining key user stories to define the app's functionality and user experience. To visualize the app's design, we used  [MIRO](https://miro.com/app/board/uXjVMknY8Us=/?share_link_id=856877434329) to create our wireframes. Using Miro, we meticulously crafted wireframes that illustrated the app's layout and user interface, providing a comprehensive visual representation of our vision. These wireframes served as the guiding framework, outlining the foundation upon which the app would be built. Additionally, we included Entity Relationship Diagrams (ERDs) to map out the relationships between different data entities within TravelLog.
These ERDs facilitated a deeper understanding of how user data, travel destinations, reviews, and other key components would interact, ensuring a smooth and efficient user experience.
- **Trello Board**: Planning and visualization process laid the groundwork for the TravelLog app's development. To further ensure that the team is on the right track, we utilised the [TrelloBoard](https://trello.com/b/Ps1MdnlB/travellog) to efficiently track the team's progress.
<img width="1112" alt="image" src="https://github.com/Xyfalix/travellog-app/assets/139415730/ed5c10b4-85c2-43f4-ab49-fa5124a0fa54">
<img width="718" alt="image" src="https://github.com/Xyfalix/travellog-app/assets/139415730/8326392d-6eeb-4277-b116-bbf1243f4462">

## App Functionality 

### (Login/Sign Up --> Search Attraction --> Bucket List --> Review)

<img width="974" alt="image" src="https://github.com/Xyfalix/travellog-app/assets/139415730/de06f9d0-e669-4336-92d2-dbb49fa1e5e7">

1. Sign Up & Login as a user.
2. Search the city and attraction that interest you.
3. Explore the list of potential attractions to add to the bucket list.
4. If the user has visited that attraction, he/she can tick it off their bucket list.
5. User is able to view reviews from other users on the specific attraction and is given the option to submit their own review.
   
## Deployment
The app is deployed on Render, and you can access it here.
[TravelLog](https://travel-log-uaie.onrender.com/)

## Key Challenges
Integrating multiple APIs into the TravelLog app presented a significant challenge during development. The complexity of harmonizing various APIs, each with its own structure, documentation, and authentication methods, demanded a thorough testing and integration effort from both the front-end and back-end, which was very time-consuming.

## Future Developments
- **Flights & hotel bookings**: Implementing a feature to allow users to search for and book flights and hotels directly within the application, enhancing the travel planning experience.
- **User comments**: Enabling users to leave comments and share their experiences or recommendations for attractions, creating a more interactive and community-driven platform.
- **Advanced filters for Maps and Direction**: Enhancing the mapping and navigation functionality with advanced filtering options, such as filtering attractions by category or user preferences.
- **Group attractions into City**: Organizing attractions into city-specific groups to make it easier for users to plan their itineraries and explore various attractions within a specific location.
- **Weather Forecast**: Integrating real-time weather forecasts for each city, allowing users to check weather conditions and plan their trips accordingly.
