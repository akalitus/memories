export default (posts = [], action) => {
    if (action.type === 'FETCH_ALL') {
        return action.payload;
    }
    if (action.type === 'CREATE') {
        return posts;
    }
    return posts;
}