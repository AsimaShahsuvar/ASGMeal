import api from './api'

const ENDPOINT = '/flight'
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
    getFlight(search, page = null, limit = null) {
        let params = {
            ...search,
        }
        if (page && limit) {
            params = {...params, page, limit}
        }

        return api.get(ENDPOINT + '/getallflight  ', {params})
    },

    remove(id) {
        return api.delete(`${ENDPOINT}/${id}`)
    },

    get(id) {
        return api.get(`${ENDPOINT}/getbyid?id=${id}`)
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

    create(search) {
        let params = {
            ...search,
        }
        return api.post(ENDPOINT + '/add', params)
    },

}
