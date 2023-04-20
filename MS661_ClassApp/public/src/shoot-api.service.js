const SHOOT_API = `${BASE_API_URL}/shoot`;

class ShootsService {
    getShoots = () => _get(SHOOT_API, OPTIONS_WITH_AUTH);

    addShoot = (formData) => _post(SHOOT_API, formData, DEFAULT_OPTIONS_WITH_AUTH);

    deleteShoot = (shootId) => _delete(`${SHOOT_API}/${shootId}`, OPTIONS_WITH_AUTH);
}