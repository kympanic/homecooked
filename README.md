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

- A Vendor can create/edit/delete any products from their menus. Also there are options in the side menu to update shop logo, shop splash image, shop name, cuisine, and profile image. Only if the logged in user is the owner of the page can you see the store customization side menu. 
- A user can see all reviews that are relevant to each store and products. If the user is the owner of the review, they will have the option to edit or delete their reviews.
- If the logged in user is not the owner of the store, they have the option to add a review or add the item to a cart for later purchase.

![Screen Shot 2023-01-17 at 11 13 38 AM](https://user-images.githubusercontent.com/98551224/212990949-dc675567-9440-462f-91a5-7e4b8b79b220.png)

Profile Page

- User is able to edit their public profile here. If the user does not have a store, they will have the option to become a vendor.
- User is able to edit or delete any reviews on the foods they have reviewed.

![Screen Shot 2023-01-17 at 11 26 41 AM](https://user-images.githubusercontent.com/98551224/212993694-6b4bb6b6-4c6c-4aec-923f-266beef5bbae.png)

Cart Page

- Page shows the items that were added to the cart with the total items and price. 
- User has the option to edit their cart and remove items. 
- User can checkout and add payment or use existing payment

![Screen Shot 2023-01-17 at 11 30 01 AM](https://user-images.githubusercontent.com/98551224/212994294-ce4f27da-67b6-4020-923e-47a9674b1411.png)

Code Snippets:
The cart was a communal effort to create -- we 
