
const USER_API = `${BASE_API_URL}/user`;

class UsersService {

    updateUserName = (userId, formData) => _put(`${USER_API}/name/${userId}`, formData, DEFAULT_OPTIONS_WITH_AUTH);

    updatePassword = (userId, formData) => _put(`${USER_API}/pw/${userId}`, formData, DEFAULT_OPTIONS_WITH_AUTH);
}