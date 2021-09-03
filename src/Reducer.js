export const initialState = {
    dashboardData: {},
    user: {}
}
const reducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.item.token,
            };

        case 'DASHBOARD':
            return {
                ...state,
                dashboardData: action.item.dashboardData,
            };

        default:
            return state;
    }
};


export default reducer;