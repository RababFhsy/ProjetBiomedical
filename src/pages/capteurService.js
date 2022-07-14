const KEYS = {
   capteurs: 'capteurs',
    capteurId: 'capteurId'
}

export const  getDepartmentCollection= () => ([
    { id: '1', title: 'capteur chaleur' },
    { id: '2', title: 'tension' },
    { id: '3', title: 'xxxx' },
    { id: '4', title: 'yyyyy' },
])


export function insertCapteur(data) {
    let capteurs = getAllCapteurs();
    data.id = generateCapteurId()
  capteurs.push(data)
    localStorage.setItem(KEYS.capteurs, JSON.stringify(capteurs))
}

export function deleteCapteur(id) {
    let capteurs = getAllCapteurs();
    capteurs = capteurs.filter(x => x.id != id)
    localStorage.setItem(KEYS.capteurs, JSON.stringify(capteurs));
}
export function updateCapteur(data) {
    let capteurs = getAllCapteurs();
    let recordIndex =capteurs.findIndex(x => x.id === data.id);
   capteurs[recordIndex] = { ...data }
    localStorage.setItem(KEYS.capteurs, JSON.stringify(capteurs));
}

export function generateCapteurId() {
    if (localStorage.getItem(KEYS.capteurId) === null)
        localStorage.setItem(KEYS.capteurId, '0')
    var id = parseInt(localStorage.getItem(KEYS.capteurId))
    localStorage.setItem(KEYS.capteurId, (++id).toString())
    return id;
}

export function getAllCapteurs() {
    if (localStorage.getItem(KEYS.capteurs) === null)
        localStorage.setItem(KEYS.capteurs, JSON.stringify([]))
    let capteurs = JSON.parse(localStorage.getItem(KEYS.capteurs));
     //map roleID to role title
     let departments = getDepartmentCollection();
     return capteurs.map(x => ({
         ...x,
         department: departments[x.type - 1].title
     }))
}