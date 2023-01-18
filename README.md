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

- A Vendor can create/edit/delete any products from their menus. Also there are options in the side menu to update shop logo, shop splash image, shop name, cuisine, and profile image. Only if the logged in user is the owner of the page can you see the store customization side menu
- A user can see all reviews that are relevant to each store and products. If the user is the owner of the review, they will have the option to edit or delete their reviews
- If the logged in user is not the owner of the store, they have the option to add a review or add the item to a cart for later purchase

![Screen Shot 2023-01-17 at 11 13 38 AM](https://user-images.githubusercontent.com/98551224/212990949-dc675567-9440-462f-91a5-7e4b8b79b220.png)

Profile Page

- User is able to edit their public profile here. If the user does not have a store, they will have the option to become a vendor
- User is able to edit or delete any reviews on the foods they have reviewed

![Screen Shot 2023-01-17 at 11 26 41 AM](https://user-images.githubusercontent.com/98551224/212993694-6b4bb6b6-4c6c-4aec-923f-266beef5bbae.png)

Cart Page

- Page shows the items that were added to the cart with the total items and price
- User has the option to edit their cart and remove items
- User can checkout and add payment or use existing payment

![Screen Shot 2023-01-17 at 11 30 01 AM](https://user-images.githubusercontent.com/98551224/212994294-ce4f27da-67b6-4020-923e-47a9674b1411.png)

Checkout Page
- User has the options to add or remove items
- Can edit or delete their existing payments
- When the user selects a payment, a confirmation will show to submit order
- When the order is submitted, an order is created with the payment id, cart is emptied, and the user is directed back to the home page

![Screen Shot 2023-01-17 at 11 34 32 AM](https://user-images.githubusercontent.com/98551224/212994984-8639def8-f29d-4a3a-9744-c10ad5400d30.png)

## Sample Code

Dealing with error validations, custom validators from wtforms and sending them correctly to the frontend proved to be a difficult task. We had to adjust the error messages to properly be formatted to an array so forms can map through and show each error message correctly.

<img width="727" alt="Screen Shot 2023-01-17 at 11 40 25 AM" src="https://user-images.githubusercontent.com/98551224/212996076-7aed69d6-528c-486a-85bb-0bd1d5a28897.png">
<img width="827" alt="Screen Shot 2023-01-17 at 11 41 31 AM" src="https://user-images.githubusercontent.com/98551224/212996289-76a0163d-3424-4afb-8102-9e7d97e71dbb.png">





Code Snippets:

The cart was a communal effort to create -- we all worked together and built it over two days of research and working together to figure out how to implement it successfully.
<img width="1440" alt="image" src="https://dudemastersongbucket.s3.amazonaws.com/cart_code_snippet.PNG">

This culminated with having to spend hours trying to figure out a problem that was ultimately due to not passing an id value to the state when the update count action was taken- funny how a small thing like that could both be so hard to figure out and cause such a huge problem.


Also, this little bit of the profile page is Alex's favorite contribution:
<img width="1440" alt="image" src="https://dudemastersongbucket.s3.amazonaws.com/profile_code_snippet.PNG">

He thinks it's an incredibly funny use of empty space.



## Our Journey

We wanted to create a ecommerce site that was similar to Etsy. Creating a working database in Flask-SQLAlchemy, cart feature, search bar, user feature, full CRUD on products,reviews and payments proved to be an arduous task to finish in two weeks. We were able to implement most of what we wanted, but would like to add extra features to the app.

## Future Features to Implement

- Dark Mode Toggle
- Showing users their previous orders
- Searching stores by distance from the user
- Fix interaction between payments and products
- Tune up CSS


