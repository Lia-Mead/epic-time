export function reducer(state = {}, action) {
    if (action.type === "SHOW_WANNABES") {
        // update the state object...
        // keep it pure
        state = {
            ...state,
            users: action.friendsList,
        };
    } else if (action.type === "ACCEPT_FRIEND") {
        // update the state object...
        // keep it pure
        state = {
            ...state,
            users: state.users.map((user) => {
                if (user.id === action.id) {
                    return {
                        ...user,
                        accepted: true,
                    };
                } else {
                    return user;
                }
            }),
        };
    } else if (action.type === "END_FRIENDSHIP") {
        // update the state object...
        // keep it pure
        state = {
            ...state,
            users: state.users.map((user) => {
                if (user.id === action.id) {
                    return {
                        ...user,
                        accepted: null,
                    };
                } else {
                    return user;
                }
            }),
        };
    }

    return state;
}
