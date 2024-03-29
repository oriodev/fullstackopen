import axios from 'axios'
const baseUrl = '/api/notes'

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const getAll = () => {
    const request = axios.get(baseUrl)
    const nonExisting = {
        id: 1000,
        content: "this ain't real",
        important: true
    }
    return request.then(response => response.data.concat(nonExisting))
}

const create = async newObject => {
    const config = {
        headers: { Authorization: token },
    }

    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)

}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, update, setToken }