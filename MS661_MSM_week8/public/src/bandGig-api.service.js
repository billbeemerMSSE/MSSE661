const BANDGIG_API = `${BASE_API_URL}/bandgig`;

class BandGigsService {
    getBandGigs = () => _get(BANDGIG_API, OPTIONS_WITH_AUTH);

    addBandGig = (formData) => _post(BANDGIG_API, formData, DEFAULT_OPTIONS_WITH_AUTH);

    editBandGig = (bandGigId, formData) => _put(`${BANDGIG_API}/${bandGigId}`, formData, DEFAULT_OPTIONS_WITH_AUTH);

    deleteBandGig = (bandGigId) => _delete(`${BANDGIG_API}/${bandGigId}`, OPTIONS_WITH_AUTH);
}