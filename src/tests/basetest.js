import moxios from 'moxios'
export const TestUrl = (url, status, text) => {
    moxios.stubRequest(`https://shopping-list-api-muthomi.herokuapp.com/${url}`, {
        status: status,
        responseText:text
    })
}
