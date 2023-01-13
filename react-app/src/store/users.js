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
		return payload;
	}
};

export const getUserThunk = (userId) => async (dispatch) => {
	const res = await fetch(`/api/users/${userId}`);

	if (res.ok) {
		const payload = await res.json();
		dispatch(loadUsers(payload));
	}
};

export const editUserThunk = (data) => async (dispatch) => {
	const editedUser = JSON.stringify(data);

	const res = await fetch(`/api/users/${data.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: editedUser,
	});

	if (res.ok) {
		const data = await res.json();
		dispatch(loadUsers(data));
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
