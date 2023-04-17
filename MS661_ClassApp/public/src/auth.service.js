// const BASE_API_URL = "http://localhost:3000/api";
// const AUTH_API = `${BASE_API_URL}/auth`;
// const USER_API = `${BASE_API_URL}/user`;

// const SHOOT_API = `${BASE_API_URL}/shoot`;

// function register(formData) {
//     return _post(`${AUTH_API}/register`, formData);
// }

// function login(formData) {
//     return _post(`${AUTH_API}/login`, formData);
// }

// const BASE_API_URL = "http://localhost:3000/api";
// const AUTH_API = `${BASE_API_URL}/auth`;
// const USER_API = `${BASE_API_URL}/user`;

// const SHOOT_API = `${BASE_API_URL}/shoot`;

const register = (formData) => _post(`${BASE_API_URL}/register`, formData);
const login = (formData) => _post(`${BASE_API_URL}/login`, formData);

const logout = () => {
    clearStorage('isAuth');
    clearStorage('token');
};