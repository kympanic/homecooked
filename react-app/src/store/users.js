const LOAD_USERS = "/users/getallusers";

const loadUsers = (payload) => ({
	type: LOAD_USERS,
	payload,
});

export const getAllUsersThunk = () => async (dispatch) => {
	const res = await fetch("/api/users");

	if (res.ok) {
		const payload = await res.json();
		dispatch(loadUsers(payload));
	}
};

//Need to create a edituserthunk and edituserapi route to be used in the shop edit page.
//Also will be used in the profile edit page

const userReducer = (state = {}, action) => {
	let newState = { ...state };
	switch (action.type) {
		case LOAD_USERS:
			return { ...newState, ...action.payload };
		default:
			return state;
	}
};

export default userReducer;
