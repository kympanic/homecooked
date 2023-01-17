# Homecooked

By [Daniel Yoo](https://github.com/kympanic), [Alex Hiller](https://github.com/Dudemaster47), [Megha Sahgal](https://github.com/meghasahgal)

Hungry? Tired? Want a meal created with care? [Homecooked](https://home-cooked.onrender.com/) is waiting for you!

Some days we're just too tired to cook. Homecooked is for the individual who wants a warm meal without foregoing on the quality. Homecooked is a one stop shop for finding local vendors that will cook up your next delicious meal. 

## Index

- [API Documentation](https://github.com/kympanic/homecooked/wiki/API-Routes)
- [Database Schema](https://github.com/kympanic/homecooked/wiki/Database-Schema)
- [Frontend Routes](https://github.com/kympanic/homecooked/wiki/Frontend-Routes)
- [MVP Feature List](https://github.com/kympanic/homecooked/wiki/MVP-List)
- [User Stories](https://github.com/kympanic/homecooked/wiki/User-Stories)

## Technologies Used

- Javascript
- React/Redux
- Python
- CSS
- Flask/SQLAlchemy
- [FontAwesome](https://fontawesome.com/icons?d=gallery&m=free)
- [zipcode-city-distance](https://github.com/buddyeorl/zipcode-city-distance-pkg)
- [Redux Persist](https://www.npmjs.com/package/redux-persist)



## Overview
A full stack application that purports to the theme of the Etsy website, with a focus on two main features: Products and Reviews, and several partial CRUD features including Search, Orders, and Cart. When the user first accesses the site, they are brought to a splash page, greeting the user and prompting them to sign up. Attempting to access any page on the site without login/signup will redirect them to login.

![Screen Shot 2023-01-17 at 11 00 30 AM](https://user-images.githubusercontent.com/98551224/212987885-5951b00f-e8a2-4014-bdc8-78a0c56df239.png)

After signing up, the user is greeted to the homepage where they can see all the vendors that are selling meals. The vendors show the average reviews for all their products based on reviews and the location and distance from the user. They can go to their profile page and edit their profile. Also the user has the option to become a vendor and start selling food. 
The search bar can filter any store by the category of food they sell.

<img width="1596" alt="Screen Shot 2023-01-17 at 11 07 20 AM" src="https://user-images.githubusercontent.com/98551224/212989131-71d69152-23b6-4903-843e-29d9a3c5d877.png">

Vendor Page

![Screen Shot 2023-01-17 at 11 13 38 AM](https://user-images.githubusercontent.com/98551224/212990949-dc675567-9440-462f-91a5-7e4b8b79b220.png)

A Vendor can create/edit/delete any products from their menus. A user can see all reviews that are relevant to each store and products.

![Screen Shot 2023-01-17 at 11 00 30 AM](https://user-images.githubusercontent.com/98551224/212987885-5951b00f-e8a2-4014-bdc8-78a0c56df239.png)



Code Snippets:
The cart was a communal effort to create -- we 




Database Schema: 
<img width="1179" alt="image" src="https://user-images.githubusercontent.com/1787106/212827342-aa9d662f-af3a-441c-b3a9-8b9b9fc614e7.png">
