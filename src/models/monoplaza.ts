import {Schema, model} from 'mongoose'

export class Monoplaza {
    private _modelo : string
    private _combustible : number 
    private _neumatico : string
    private _n_vueltas : number
    private _pitstop : boolean
    private _modo_carrera : number
    private _p_carga : number
    private _fecha_ult_mod : Date
    private _vuelta_actual:number

    constructor (modelo:string, combustible:number, neumatico:string, n_vueltas:number, pitstop : boolean, modo_carrera:number, p_carga:number, fecha_ult_mod:Date, vuelta_actual:number ){
        this._modelo = modelo
        this._combustible = combustible
        this._neumatico = neumatico
        this._pitstop = pitstop
        this._n_vueltas = n_vueltas
        this._modo_carrera = modo_carrera
        this._p_carga = p_carga
        this._fecha_ult_mod = fecha_ult_mod
        this._vuelta_actual = vuelta_actual

    }

    get modelo(){
        return this._modelo
    }

    get matricula(){
        return this._modelo
    }

    get combustible(){
        return this._combustible
    }

    get neumatico(){
        return this._neumatico
    }

    get n_vueltas(){
        return this._n_vueltas
    }

    get pitstop(){
        return this._pitstop
    }

    get modo_carrera(){
        return this._modo_carrera 
    }
    
    get p_carga(){
        return this._p_carga
    }

    get fecha_ult_mod(){
        return this._fecha_ult_mod
    }

    get vuelta_actual(){
        return this._vuelta_actual
    }

    mostrarMonoplaza(){
        if (this._pitstop == false){
            return `El monoplaza (modelo ${this._modelo} ) tiene a ${this._combustible} litros, usa unos neumaticos ${this._neumatico} con ${this._n_vueltas} vueltas, no ha cambiado de neumático, esta usando el modo ${this._modo_carrera}, tiene ${this._p_carga} puntos de carga aerodinamica, la ultima modificacion fue ${this._fecha_ult_mod} y se encuentra en la vuelta ${this._vuelta_actual}`
        } else {
            return `El monoplaza (modelo ${this._modelo} ) tiene a ${this._combustible} litros, usa unos neumaticos ${this._neumatico} con ${this._n_vueltas} vueltas, ha cambiado de neumático, esta usando el modo ${this._modo_carrera}, tiene ${this._p_carga} puntos de carga aerodinamica, la ultima modificacion fue ${this._fecha_ult_mod} y se encuentra en la vuelta ${this._vuelta_actual}`
        }
        
    }

    mostrarCombustible(){
        let consumo_v, consumido, combustible_res, combustible_por, vueltas_res, consumo_fut: number
        if (this._modo_carrera == 1) {
            consumo_v = 8
        } else {
            if (this._modo_carrera == 2) {
                consumo_v = 6
            } else {
                    consumo_v = 2
            }
        }
        consumido = consumo_v * this.vuelta_actual
        combustible_res = this._combustible - consumido
        combustible_por = (combustible_res * 100) / this._combustible
        vueltas_res = 50 - this._vuelta_actual
        consumo_fut = consumo_v * vueltas_res
        return 'Le quedan '+ combustible_res +' L ('+ combustible_por +'%) en las proximas '+ vueltas_res +' vueltas si sigue en este modo va a conumir '+ consumo_fut +' L'
    }

    mostrarNeumaticos(){
        let degradacion_v, degradado, degradado_res, vueltas_res_n, vuelta_res:number
        if (this._modo_carrera == 1 && (this._neumatico == "medio" || this._neumatico == "intermedio" || this._neumatico == "lluvia" )){
            degradacion_v = 0.25
        } else {
            if (this._modo_carrera == 2 && (this._neumatico == "medio" || this._neumatico == "intermedio" || this._neumatico == "lluvia" )) {
                degradacion_v = 0.15
            } else {
                if (this._modo_carrera == 3 && (this._neumatico == "medio" || this._neumatico == "intermedio" || this._neumatico == "lluvia" )) {
                    degradacion_v = 0.1
                } else {
                    if (this._modo_carrera == 1 && this._neumatico == "blando") {
                        degradacion_v = 0.5
                    } else {
                        if (this._modo_carrera == 2 && this._neumatico == "blando") {
                            degradacion_v = 0.4
                        } else {
                            if (this._modo_carrera == 3 && this._neumatico == "blando") {
                                degradacion_v = 0.3
                            } else {
                                if (this._modo_carrera == 1 && this._neumatico == "duro") {
                                    degradacion_v = 0.12
                                } else {
                                    if (this._modo_carrera == 2 && this._neumatico == "duro") {
                                        degradacion_v = 0.09
                                    } else {
                                        degradacion_v = 0.05
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        degradado = degradacion_v * (this.vuelta_actual + this.n_vueltas)
        degradado_res = 100 - degradado
        vueltas_res_n = (degradado_res * this._vuelta_actual) / degradado 
        vuelta_res = 50 - this._vuelta_actual
        return 'El neumatico actual se ha degradado un '+ degradado +'% le quedan '+ vueltas_res_n +' vueltas de vida y quedan '+ vuelta_res +' vueltas'
    }

    mostrarCAerodinamica(){
        let velocidad_m: number
        velocidad_m = 210
        if (this.p_carga != 200){
            velocidad_m = (this._p_carga * 210) / 200
            return 'El monoplaza con '+ this._p_carga +' puntos de carga aerodinamica tiene una velocidad media de '+ velocidad_m +' km/h'
        } else {
            return 'El monoplaza con 200 puntos de carga aerodinamica tiene una velocidad media de 200 km/h'
        }
    }

    mostrarFechaMod(){
        return 'La ultima modificacion fue realizada en esta fecha'+this.fecha_ult_mod
    }
    
}

export type tMonoplaza = {
    _modelo : string
    _combustible : number
    _neumatico : string
    _n_vueltas : number
    _pitstop : boolean
    _modo_carrera : number
    _p_carga : number
    _fecha_ult_mod : Date
    _vuelta_actual : number
}

export const monoplazaSchema = new Schema({
    _modelo: {type: String, unique: true},
    _combustible: {type: Number},
    _neumatico: {type: String},
    _n_vueltas : {type : Number},
    _pitstop : {type : Boolean},
    _modo_carrera : {type: Number},
    _p_carga : {type : Number},
    _fecha_ult_mod : {type: Date},
    _vuelta_actual : {type:Number}
})

export const Monoplazas = model('Monoplazas', monoplazaSchema)