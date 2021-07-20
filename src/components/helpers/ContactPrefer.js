export const handleContactPrefer = (contactPref) => {
    let valor = '';
    if (contactPref === 0) {
        valor = 'Llamada teléfonica';
    } else if (contactPref === 1) {
        valor = 'Correo electrónico';
    } else if (contactPref === 2) {
        valor = 'Correo electrónico';
    } else {
        valor = 'Sin asignar';
    }

    return valor;

}