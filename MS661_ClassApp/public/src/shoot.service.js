// const SHOOT_API = `${BASE_API_URL}/shoot`;

// const getShoots = () => _get(SHOOT_API, OPTIONS_WITH_AUTH);

// const addShoot = (formData) =>
//     _post(SHOOT_API, formData, DEFAULT_OPTIONS_WITH_AUTH);

// const deleteShoot = (shootId) =>
//     _delete(`${SHOOT_API}/${shootId}`, OPTIONS_WITH_AUTH);

const SHOOT_API = `${BASE_API_URL}/shoot`;

const getShoots = () => _get(SHOOT_API, DEFAULT_OPTIONS);

const createShoot = (formData) =>
    _post(`${SHOOT_API}`, formData, DEFAULT_OPTIONS);

const deleteShoot = (shootId) =>
    _delete(`${SHOOT_API}/${shootId}`, DEFAULT_OPTIONS);