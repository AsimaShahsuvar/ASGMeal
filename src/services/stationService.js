import api from './api'

const ENDPOINT = '/station'
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
    getstationforsearch(search) {
        let params = {
            ...search,
        }
        return api.get(ENDPOINT + '/getstationforsearch', {params})
    },

}