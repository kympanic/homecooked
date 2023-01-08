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
