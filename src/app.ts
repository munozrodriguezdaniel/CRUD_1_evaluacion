import { Monoplaza, Monoplazas, monoplazaSchema } from './models/monoplaza'
import { menu, menu2, menu3 } from '../view/menu'
import { leerTeclado } from '../view/lecturaTeclado'
import { db } from './database/database'

const main = async() => {
    let n: number 
    do {
        n = await menu()
        switch(n){
             case 1:
                let pitstop : boolean
                let modelo = await leerTeclado('Introduzca el modelo del monoplaza')
                let combustible = parseInt(await leerTeclado('Introduzca la cantidad de combustible'))
                let neumatico = await leerTeclado('Introduzca el tipo de neumatico que tiene el monoplaza (duro, medio, blando, intermedio, lluvia)')
                let n_vueltas = parseInt(await leerTeclado('Introduzca el numero de vueltas que lleva dado el neumatico'))
                let cambio_n = await leerTeclado('Indique si el monoplaza ha cambiado de neumatico (Y) o no (N)')
                let modo_carrera = parseInt(await leerTeclado('Introduzca el modo carrera que usa el monoplaza(1,2,3)'))
                let p_carga = parseInt(await leerTeclado('Introduzca los puntos de carga aerodinamica(si el monoplaza no ha sufrido daños tiene 200 puntos)'))
                let fecha_ult_mod = new Date (await leerTeclado('Introduzca la fecha y hora de la ultima modificacion AAAA-MM-DDTHH:MM:SS'))
                let vuelta_actual = parseInt(await leerTeclado('Introduzca la vuelta actual en la que se encuentra el monoplaza'))
                if (cambio_n = "Y"){
                    pitstop = true
                } else {
                    pitstop = false
                }
                let m1 = new Monoplaza(modelo,combustible,neumatico,n_vueltas,pitstop,modo_carrera,p_carga,fecha_ult_mod,vuelta_actual)
                await db.conectarBD()
                const dSchema={
                    _modelo : m1.modelo,
                    _combustible : m1.combustible,
                    _neumatico : m1.neumatico,
                    _n_vueltas : m1.n_vueltas,
                    _pitstop : m1.pitstop,
                    _modo_carrera : m1.modo_carrera,
                    _p_carga : m1.p_carga,
                    _fecha_ult_mod : m1.fecha_ult_mod,
                    _vuelta_actual : m1.vuelta_actual
                }
                const oSchema = new Monoplazas(dSchema)
                await oSchema.save()
                        .then( (doc) => console.log(' Monoplaza guardado correctamente: '+ doc) )
                        .catch( (err: any) => console.log('Error: '+ err)) 
                await db.desconectarBD()
                break
            case 2:
                await db.conectarBD()
                let modelo1 = await leerTeclado('Introduzca el modelo del monoplaza')
                await Monoplazas.findOne(
                    {
                        _modelo: modelo1 
                    },
                    (error:any, datos:any)=>{
                        if (error) console.log(error)
                        else {
                            if (datos==null) console.log('No hay existe ese modelo')
                            else {
                                let m2 = new Monoplaza(datos._modelo,datos._combustible,datos._neumatico,datos._n_vueltas,datos._pitstop,datos._modo_carrera,datos._p_carga,datos._fecha_ult_mod,datos._vuelta_actual)
                                console.log(m2.mostrarMonoplaza())
                            }
                        }
                    }
                )
                await db.desconectarBD()
            break    
            case 3:
                let n2:number
                do {
                    n2 = await menu2()
                        switch(n2){
                            case 1:
                                await db.conectarBD()
                                let neu_nuevos:string, n_vueltas2: number, modelo2:string, vuelta_actual2:number, fecha_ult_mod2:Date
                                modelo2 = await leerTeclado('Introzduzca el modelo del monoplaza')
                                neu_nuevos = await leerTeclado('Introduzca el tipo del nuevo neumatico:')
                                n_vueltas2 = parseInt(await leerTeclado('Introzduzca las vueltas que tiene el neumatico'))
                                fecha_ult_mod2 = new Date (await leerTeclado('Introduzca la fecha y hora (AAAA-MM-DDTHH:MM:SS)'))
                                vuelta_actual2=parseInt(await leerTeclado('Introzduzca la vueltas actual de la carrera'))
                                await Monoplazas.findOneAndUpdate(
                                    {
                                        _modelo: modelo2 
                                    },{
                                        _neumatico: neu_nuevos,
                                        _n_vueltas: n_vueltas2,
                                        _vuelta_actual: vuelta_actual2,
                                        _pitstop: true,
                                        _fecha_ult_mod: fecha_ult_mod2
                                    },{
                                        runValidators: true
                                    }  
                                )        
                                .then(() => console.log('Se ha modificado correctamente') )
                                .catch( (err) => console.log('Error: '+err))
                                await db.desconectarBD()
                            break
                            case 2:
                                await db.conectarBD()
                                let dif_carga:number, modelo3:string, vuelta_actual3:number, fecha_ult_mod3
                                modelo3 = await leerTeclado('Introzduzca el modelo del monoplaza')
                                dif_carga = parseInt(await leerTeclado('Introzduzca los puntos de la carga aerodinamica'))
                                fecha_ult_mod3 = new Date (await leerTeclado('Introduzca la fecha y hora (AAAA-MM-DDTHH:MM:SS)'))
                                vuelta_actual3=parseInt(await leerTeclado('Introzduzca la vueltas actual de la carrera'))
                                await Monoplazas.findOneAndUpdate(
                                    {
                                        _modelo: modelo3 
                                    },{
                                        _p_carga: dif_carga,
                                        _vuelta_actual: vuelta_actual3,
                                        _fecha_ult_mod: fecha_ult_mod3
                                    },{
                                        runValidators: true
                                    }  
                                )        
                                .then(() => console.log('Se ha modificado los puntos de aerodinamica correctamente') )
                                .catch( (err) => console.log('Error: '+err))
                                await db.desconectarBD() 
                            break
                            case 3:
                                await db.conectarBD()
                                let modo_nuevo:number, modelo4:string, vuelta_actual4:number, fecha_ult_mod4:Date
                                modelo4 = await leerTeclado('Introzduzca el modelo del monoplaza')
                                modo_nuevo = parseInt(await leerTeclado('Introzduzca al modo que desea cambiar'))
                                fecha_ult_mod4 = new Date (await leerTeclado('Introduzca la fecha y hora (AAAA-MM-DDTHH:MM:SS)'))
                                vuelta_actual4=parseInt(await leerTeclado('Introzduzca la vueltas actual de la carrera'))
                                await Monoplazas.findOneAndUpdate(
                                    {
                                        _modelo: modelo4 
                                    },{
                                        _modo_carrera: modo_nuevo,
                                        _vuelta_actual: vuelta_actual4,
                                        _fecha_ult_mod: fecha_ult_mod4
                                    },{
                                        runValidators: true
                                    }  
                                )        
                                .then(() => console.log('Se ha cambiado de modo correctamente') )
                                .catch( (err) => console.log('Error: '+err))
                                await db.desconectarBD()
                            break
                            default:
                                console.log("Opción incorrecta")
                            break
                        }
                } while (n2!=0);
            break
            case 4:
                let n3:number
                do {
                    n3 = await menu3()
                    switch(n3){
                        case 1:
                            await db.conectarBD()
                            let modelo1 = await leerTeclado('Introduzca el modelo del monoplaza')
                            let vuelta_actual2 = await leerTeclado('Introduzca la vuelta actual')
                            await Monoplazas.findOne(
                                {
                                    _modelo: modelo1 
                                },
                                (error:any, datos:any)=>{
                                    if (error) console.log(error)
                                    else {
                                        if (datos==null) console.log('No hay existe ese modelo')
                                        else {
                                            datos._vuelta_actual=vuelta_actual2
                                            let m2 = new Monoplaza(datos._modelo,datos._combustible,datos._neumatico,datos._n_vueltas,datos._pitstop,datos._modo_carrera,datos._p_carga,datos._fecha_ult_mod,datos._vuelta_actual)
                                            console.log(m2.mostrarCombustible())
                                        }
                                    }
                                }
                            )
                            await db.desconectarBD
                        break
                        case 2:
                            await db.conectarBD()
                            let modelo2 = await leerTeclado('Introduzca el modelo del monoplaza')
                            let vuelta_actual3 = await leerTeclado('Introduzca la vuelta actual')
                            await Monoplazas.findOne(
                                {
                                    _modelo: modelo2 
                                },
                                (error:any, datos:any)=>{
                                    if (error) console.log(error)
                                    else {
                                        if (datos==null) console.log('No hay existe ese modelo')
                                        else {
                                            datos._vuelta_actual=vuelta_actual3
                                            let m2 = new Monoplaza(datos._modelo,datos._combustible,datos._neumatico,datos._n_vueltas,datos._pitstop,datos._modo_carrera,datos._p_carga,datos._fecha_ult_mod,datos._vuelta_actual)
                                            console.log(m2.mostrarNeumaticos())
                                        }
                                    }
                                }
                            )
                        break
                        case 3:
                            await db.conectarBD()
                            let modelo3 = await leerTeclado('Introduzca el modelo del monoplaza')
                            await Monoplazas.findOne(
                                {
                                    _modelo: modelo3 
                                },
                                (error:any, datos:any)=>{
                                    if (error) console.log(error)
                                    else {
                                        if (datos==null) console.log('No hay existe ese modelo')
                                        else {
                                            let m2 = new Monoplaza(datos._modelo,datos._combustible,datos._neumatico,datos._n_vueltas,datos._pitstop,datos._modo_carrera,datos._p_carga,datos._fecha_ult_mod,datos._vuelta_actual)
                                            console.log(m2.mostrarCAerodinamica())
                                        }
                                    }
                                }
                            )  
                        break
                        case 4:
                            await db.conectarBD()
                            let modelo4 = await leerTeclado('Introduzca el modelo del monoplaza')
                            await Monoplazas.findOne(
                                {
                                    _modelo: modelo4 
                                },
                                (error:any, datos:any)=>{
                                    if (error) console.log(error)
                                    else {
                                        if (datos==null) console.log('No hay existe ese modelo')
                                        else {
                                            let m2 = new Monoplaza(datos._modelo,datos._combustible,datos._neumatico,datos._n_vueltas,datos._pitstop,datos._modo_carrera,datos._p_carga,datos._fecha_ult_mod,datos._vuelta_actual)
                                            console.log(m2.mostrarFechaMod())
                                        }
                                    }
                                }
                            ) 
                        break
                    }
                } while (n3!=0);
            break
            case 5:
                let modelo2 = await leerTeclado ('Introduzca el modelo del monoplaza que desea borrar')
                await db.conectarBD()
                await Monoplazas.findOneAndDelete(
                    { _modelo: modelo2 }, 
                    (err: any, doc) => {
                        if(err) console.log(err)
                        else{
                            if (doc == null) console.log(`No encontrado`)
                            else console.log('Borrado correcto: '+ doc)
                        }
                    })
                await db.desconectarBD()
                break
            break
            case 0:
                console.log('\n--ADIÓS--')
                break
            default:
                console.log("Opción incorrecta")
                break
        }
    } while (n!=0); 
}

main()