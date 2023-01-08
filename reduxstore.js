const store = {
	session: {
		user: {
			id: 1,
			username: "buttlord",
			email: "buttlord@gmail.com",
			shop_name: "Poop Palace",
			profile_img: "www.poopybutt.com",
			shop_logo_img: "www.fecalmatter.edu",
			shop_splash_img: "www.excrement.gov",
			phone_number: 5102998877,
			zipcode: '94455',
		},
		cart: [
			{
				id: 1,
				userId: 1,
				name: "Yummy Product",
				imageUrl: "www.yummyproduct.com",
				avgRating: 4.5,
				price: 3.99,
			},
		],
	},
	users: {
		1: {
			id: 1,
			username: "buttlord",
			email: "buttlord@gmail.com",
			shop_name: "Poop Palace",
			profile_img: "www.poopybutt.com",
			shop_logo_img: "www.fecalmatter.edu",
			shop_splash_img: "www.excrement.gov",
			phone_number: 5102998877,
			zipcode: '94455',
			//avgProductReview, could add via sql alchemy via rel b/w products table
		},
	},
	reviews: {
		1: {
			id: 1,
			userId: 1,
			productId: 1,
			body: "It was good",
			rating: 4.5,
		},
	},

	products: {
		1: {
			id: 1,
			userId: 1,
			name: "Yummy Product",
			description: "Yummy in my tummy",
			imageUrl: "www.yummyproduct.com",
			avgRating: 4.5,
			price: 3.99,
		},
	},

	orders: {
		1: {
			id: 1,
			userId: 1,
			paymentId: 1,
		},
	},

	payments: {
		1: {
			id: 1,
			userId: 1,
			provider: "Visa",
			accountNumber: "2222",
			expiration: "12/2024",
		},
	},
};
