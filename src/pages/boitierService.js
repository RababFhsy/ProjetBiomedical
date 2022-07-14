const KEYS = {
   boitiers: 'boitiers',
    boitierId: 'boitierId'
}

export const getDepartmentCollection = () => ([
    { id: '1', title: 'Uno' },
    { id: '2', title: 'Mega' },
    { id: '3', title: 'Nano' },
    { id: '4', title: 'Due' },
    { id: '5', title: 'One' },
])

export const getCapteurCollection = () => ([
    { id: '6', title: 'ECG' },
    { id: '7', title: 'Pools' },
    { id: '8', title: 'MQ-3' },
   
])
export const getBrancheCollection= () => ([
    { id: '9', title: 'A0' },
    { id: '10', title: 'A1' },
    { id: '11', title: 'A2' },
    { id: '12', title: 'A3' },
    { id: '13', title: 'A4' },
   
])

export function insertboitier(data) {
    let boitiers = getAllBoitiers();
    data['id'] = generateBoitierId()
   boitiers.push(data)
    localStorage.setItem(KEYS.boitiers, JSON.stringify(boitiers))
}

export function updateBoitier(data) {
    let boitiers = getAllBoitiers();
    let recordIndex = boitiers.findIndex(x => x.id == data.id);
    boitiers[recordIndex] = { ...data }
    localStorage.setItem(KEYS.boitiers, JSON.stringify(boitiers));
}

export function deleteBoitier(id) {
    let boitiers = getAllBoitiers();
    boitiers = boitiers.filter(x => x.id != id)
    localStorage.setItem(KEYS.boitiers, JSON.stringify(boitiers));
}


export function generateBoitierId() {
    if (localStorage.getItem(KEYS.boitierId) == null)
        localStorage.setItem(KEYS.boitierId, '0')
    var id = parseInt(localStorage.getItem(KEYS.boitierId))
    localStorage.setItem(KEYS.boitierId, (++id).toString())
    return id;
}

export function getAllBoitiers() {
    if (localStorage.getItem(KEYS.boitiers) == null)
        localStorage.setItem(KEYS.boitiers, JSON.stringify([]))
    let boitiers = JSON.parse(localStorage.getItem(KEYS.boitiers));
    //map departmentID to department title
    let departments = getDepartmentCollection();
    return boitiers.map(x => ({
        ...x,
        department: departments[x.type - 1].title
    }))
}