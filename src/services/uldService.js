import api from './api'

const ENDPOINT = '/uld'
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
    getList(search, page = null, limit = null) {
        let params = {
            ...search,
        }
        if (page && limit) {
            params = {...params, page, limit}
        }

        return api.get(ENDPOINT + '/getList', {params})
    },
    getCompanyList(search, page = null, limit = null) {
        let params = {
            ...search,
        }
        if (page && limit) {
            params = {...params, page, limit}
        }

        return api.get(ENDPOINT + '/getcompanyList', {params})
    },

    remove(id) {
        return api.delete(`${ENDPOINT}/${id}`)
    },
    searchuldtypeforuld(search) {
        let params = {
            ...search,
        }
        return api.get(ENDPOINT + '/searchuldtypeforuld', {params})
    },
    get(id) {
        return api.get(`${ENDPOINT}/get?id=${id}`)
    },
    destinationList(search) {
        let params = {
            ...search,
        }
        return api.get(ENDPOINT + '/destinationlist', {params})
    },

    update(search) {
        let params = {
            ...search,
        }
        return api.post(ENDPOINT + '/update', params)
    },


    shipmentplanlinktould(search) {
        let params = {
            ...search,
        }
        return api.post(ENDPOINT + '/shpimnetplanlinktould', params)
    },


    addUld(search) {
        let params = {
            ...search,
        }
        return api.post(ENDPOINT + '/addUld', params)
    },
    getUldForSelect(search) {
        let params = {
            ...search,
        }
        return api.get(ENDPOINT + '/searchuldforselect', {params})
    },

}
