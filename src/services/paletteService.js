import api from './api'

const ENDPOINT = '/palette'
export default {

    load(search, page = null, limit = null) {
        let params = {
            ...search,
        }
        if (page && limit) {
            params = {...params, page, limit}
        }

        return api.get(ENDPOINT + '/getall', {params})
    },

    loadChart(search, page = null, limit = null) {
        let params = {
            ...search,
        }
        if (page && limit) {
            params = {...params, page, limit}
        }

        return api.get(ENDPOINT + '/chart-by-parking-position', {params})
    },
    remove(id) {
        return api.delete(`${ENDPOINT}/${id}`)
    },

    get(search) {
        let params = {
            ...search,
        }
        return api.get(`${ENDPOINT}/getlistbyflightid`, {params})
    },


    getPosition(id) {
        return api.get(`${ENDPOINT}/getlistbypositionid?positionId=${id}`)
    },
    contourList() {
        return api.get(`${ENDPOINT}/contourlist`)
    },
    // uldLinkToFlight(flightId, palettedId) {
    //     return api.post(`${ENDPOINT}/uldlinktoflight?flightId=${flightId}&palettedId=${palettedId}`)
    // },
    uldLinkToFlight(link) {
        let params = {
            ...link,
        }
        return api.post(`${ENDPOINT}/uldlinktoflight`, params)
    },

    setLefTonBoard(link) {
        let params = {
            ...link,
        }
        return api.post(`${ENDPOINT}/setleftonboard`, params)
    },

    update(id, data) {
        return api.put(`ENDPOINT + '/uldlinktoflight'`, data)
    },

    create(data) {
        return api.post(ENDPOINT + '/add', data)
    },

}
