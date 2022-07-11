const KEYS = {
    user: 'user',
    userId: 'userId'
}

export const getRoleCollection = () => ([
    { id: '1', title: 'SuperAdmin' },
    { id: '2', title: 'Admin' },
    { id: '3', title: 'Medecin' },
    { id: '4', title: 'Secretaire' },
])

export function insertUser(data) {
    const user = getAllUser();
    data.id = generateUserId()
    user.push(data)
    localStorage.setItem(KEYS.user, JSON.stringify(user))
}

export function updateUser(data) {
    const user = getAllUser();
    const recordIndex = user.findIndex(x => x.id === data.id);
    user[recordIndex] = { ...data }
    localStorage.setItem(KEYS.user, JSON.stringify(user));
}

export function generateUserId() {
    if (localStorage.getItem(KEYS.userId) === null)
        localStorage.setItem(KEYS.userId, '0')
    var id = parseInt(localStorage.getItem(KEYS.userId))
    localStorage.setItem(KEYS.userId, (++id).toString())
    return id;
}

export function getAllUser() {
    if (localStorage.getItem(KEYS.user) === null)
        localStorage.setItem(KEYS.user, JSON.stringify([]))
    const user = JSON.parse(localStorage.getItem(KEYS.user));
    //map roleID to role title
    const roles = getRoleCollection();
    return user.map(x => ({
        ...x,
        role: roles[x.userId - 1].title
    }))
}