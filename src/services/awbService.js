import api from './api'

const ENDPOINT = '/awb'
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
    getAwbList(search, page = null, limit = null) {
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
    getByText(search) {
        let params = {
            ...search,
        }
        return api.get(ENDPOINT + '/getbytext', {params})
    },
    getAwbAllList(search) {
        let params = {
            ...search,
        }
        return api.get(ENDPOINT + '/getawblist', {params})
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
     getShipmentPlanListForTrip(id) {
        return api.get(`${ENDPOINT}/getshipmentplanlistfortrip?tripId=${id}`)
    },

    searchAwb(search) {
        let params = {
            ...search,
        }
        return api.get(ENDPOINT + '/getbyserialno', {params})
    },



    adddetail(search) {
        let params = {
            ...search,
        }
        return api.post(ENDPOINT + '/additemdetail', search)
    },
    addShipmentPlan(search) {
        let params = {
            ...search,
        }
        return api.post(ENDPOINT + '/addshipmentplan', search)
    },

}
