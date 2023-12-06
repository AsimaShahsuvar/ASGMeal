import api from './api'

const ENDPOINT = '/trip'
export default {

    load(search, page = null, limit = null) {
        let params = {
            ...search,
        }
        if (page && limit) {
            params = {...params, page, limit}
        }

        return api.get(ENDPOINT + '/getflightswithstatus', {params})
    },
    gg(search, page = null, limit = null) {
        let params = {
            ...search,
        }
        if (page && limit) {
            params = {...params, page, limit}
        }

        return api.get(ENDPOINT + '/getList  ', {params})
    },
    getShipmentplanforuldlink() {
        return api.get(ENDPOINT + '/getShipmentplanforuldlink')
    },

    remove(id) {
        return api.delete(`${ENDPOINT}/${id}`)
    },
    getarrivaltriplist(search) {
        let params = {
            ...search,
        }
        return api.get(ENDPOINT + '/getarrivaltrucktriplist', {params})
    },
    getflighttriplistforsearch(search) {
        let params = {
            ...search,
        }
        return api.get(ENDPOINT + '/getflighttriplistforsearch', {params})
    },
     getFlightList(search) {
        let params = {
            ...search,
        }
        return api.get(ENDPOINT + '/getflightlist', {params})
    },

    getSpcListForSearch(search) {
        let params = {
            ...search,
        }
        return api.get(ENDPOINT + '/getSpcListForSearch', {params})
    },

    get(id) {
        return api.get(`${ENDPOINT}/get?id=${id}`)
    },
    searchAwb(search) {
        let params = {
            ...search,
        }
        return api.get(ENDPOINT + '/getbyserialno', {params})
    },


    addTruckTrip(search) {
        let params = {
            ...search,
        }
        return api.post(ENDPOINT + '/addtrucktrip', search)
    },
    addShipmentPlan(search) {
        let params = {
            ...search,
        }
        return api.post(ENDPOINT + '/addshipmentplan', search)
    },

}
