import api from './api'

const ENDPOINT = '/truck'
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
    searchcompanyfortruck(search) {
        let params = {
            ...search,
        }
        return api.get(ENDPOINT + '/searchcompanyfortruck', {params})
    },
    searchtruckwithregno(search) {
        let params = {
            ...search,
        }
        return api.get(ENDPOINT + '/searchtruckwithregno', {params})
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

    addTruck(search) {
        let params = {
            ...search,
        }
        return api.post(ENDPOINT + '/addtruck', params)
    },
    addCompany(search) {
        let params = {
            ...search,
        }
        return api.post(ENDPOINT + '/addCompany', params)
    },

}
