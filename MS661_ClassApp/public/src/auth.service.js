const register = (formData) => _post(`${BASE_API_URL}/register`, formData);
const login = (formData) => _post(`${BASE_API_URL}/login`, formData);

const logout = () => {
    clearStorage('isAuth');
    clearStorage('token');
    clearStorage('id');
};