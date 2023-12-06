import api from './api'

const ENDPOINT = '/positions/positionlist'
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

    get(id) {
        return api.get(`${ENDPOINT}/getlistbyflightid?flightId=${id}`)
    },

    getGroupedPositions(terminal, floor = '', statusCode = '') {
        return api.get(`positions/groupedpositionlist?terminalno=${terminal}&floor=${floor}&statuscode=${statusCode}`)
    },

    getList(terminal, floor = '', statusCode = '') {
        return api.get(`${ENDPOINT}/?terminalno=${terminal}&floor=${floor}&statuscode=${statusCode}`)
    },

    update(id, data) {
        return api.put(`ENDPOINT + '/update'`, data)
    },

    create(data) {
        return api.post(ENDPOINT + '/add', data)
    },

}
