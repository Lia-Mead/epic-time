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

    if (action.type === "SEND_MESSAGE") {
        state = {
            ...state,
            message: action.message,
        };
    }

    if (action.type === "SHOW_MESSAGES") {
        state = {
            ...state,
            messages: action.messages,
            // cookie: action.cookie,
        };
    }

    if (action.type === "NEW_MESSAGE") {
        state = {
            ...state,
            messages: [...state.messages, action.newMessage],
        };
    }

    return state;
}
