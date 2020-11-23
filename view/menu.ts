import { leerTeclado } from '../view/lecturaTeclado'

export const menu = async () => {
    let n: number
    console.log('\n')
    console.log('1.- CREAR MONOPLAZA')
    console.log('2.- INFORMACION GENERAL DE UN MONOPLAZA')
    console.log('3.- CONFIGURACION DEL MONOPLAZA')
    console.log('4.- INFORMACION ESPECIFICA DE UN MONOPLAZA')
    console.log('5.- BORRAR MONOPLAZA')
    console.log('0.- SALIR')
    n = parseInt( await leerTeclado('--OPCIÓN--') )
    return n
}

export const menu2 = async () => {
    let n: number
    console.log('\n')
    console.log('1.- CAMBIAR NEUMATICO')
    console.log('2.- CAMBIAR CARGA AERODINAMICA')
    console.log('3.- CAMBIAR MODO DE CARRERA')
    console.log('0.- VOLVER AL MENU PRINCIPAL')
    n = parseInt( await leerTeclado('--OPCIÓN--') )
    return n
}

export const menu3 = async () => {
    let n: number
    console.log('\n')
    console.log('1.- COMBUSTIBLE')
    console.log('2.- NEUMATICO')
    console.log('3.- CARGA AERODINAMICA')
    console.log('4.- ULTIMA MODIFICACION')
    console.log('0.- SALIR')
    n = parseInt( await leerTeclado('--OPCIÓN--') )
    return n
}