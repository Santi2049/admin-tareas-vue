// store/auth.js
export default {
    state: {
        isAuthenticated: false,
        isAdmin: false,
        idUser: ''
    },
    mutations: {
        setAuthenticated(state, isAuthenticated) {
            state.isAuthenticated = isAuthenticated;
        },
        setIdUser(state, idUser){
            state.idUser = idUser
        }
    },
    getters: {
        isAuthenticated(state) {
            return state.isAuthenticated;
        },
        idUser(state) {
            return state.idUser

        }
    }
};