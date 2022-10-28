const  fs = require('fs')
class Contenedor{
    constructor(rutaArchivo){
        this.rutaArchivo=rutaArchivo
        this.idmax= this.maxid()
    }

    //metodo que sirve para saber si en la ruta que se ingreso existe el archivo
    archivoCreado (){
        return fs.existsSync(this.rutaArchivo)
    }



    //metodo q sirve para obtener el id maximo
    maxid(){
        if(this.archivoCreado()){
            let carritos = fs.readFileSync(this.rutaArchivo,"utf-8")
            carritos= JSON.parse(carritos)
            if (carritos.length!==0){
                let ids= carritos.map(el =>el.id)
                return Math.max(...ids)
            }else{
                return 999
            }
        }else{
            return 999
        }
    }

    async createCart(){
        try {
            let arregloCarrito=[]
            this.idmax++
            let carrito=
            {
                id: this.idmax,
                productos:[
                ]
            }
            if (this.archivoCreado(this.rutaArchivo)) {
                const contenido = await fs.promises.readFile(this.rutaArchivo,"utf-8")
                arregloCarrito=JSON.parse(contenido)
                arregloCarrito.push(carrito)
                await fs.promises.writeFile(this.rutaArchivo,JSON.stringify(arregloCarrito))
                return this.idmax
            } else {
                arregloCarrito.push(carrito)
                await fs.promises.writeFile(this.rutaArchivo,JSON.stringify(arregloCarrito))
                return this.idmax
            }


            
        } catch (error) {
            console.log(error);
        }
    }


    //metodo que sirve para crear guardar datos en el archivo
    async saveProducto(idCarrito,producto){
        try {
            if (this.archivoCreado(this.rutaArchivo)) {
                let arregloCarrito=[]
                const contenido = await fs.promises.readFile(this.rutaArchivo,"utf-8")
                arregloCarrito=JSON.parse(contenido)
                let carrito = arregloCarrito.find(el => el.id===idCarrito)
                carrito.productos.push(producto)
                await fs.promises.writeFile(this.rutaArchivo,JSON.stringify(arregloCarrito))
                return 1
            } 
        } catch (error) {
            console.error(error);
        }
    }




    //metodo que sirve para obtener un producto pasandole un ID
    async getById(numeroId){
        try {
            if (this.archivoCreado(this.rutaArchivo)){
                let arregloCarrito=[]
                const contenido = await fs.promises.readFile(this.rutaArchivo,"utf-8")
                arregloCarrito=JSON.parse(contenido)
                return arregloCarrito.find(el => el.id===numeroId) || null
            }else{
                return null
            }
        } catch (error) {
            console.log(error);
        }
    }


    //metodo q me dice la cantidad de productos q tengo
    //metodo que sirve para borrar un producto desde su id
    async deleteById(numeroId){
        try {
            if(this.archivoCreado(this.rutaArchivo)){
                let arregloCarrito=[]
                const contenido = await fs.promises.readFile(this.rutaArchivo,"utf-8")
                arregloCarrito=JSON.parse(contenido)
                let posicionBorrado=arregloCarrito.findIndex(el=>el.id===numeroId)
                if (posicionBorrado!=-1) {
                    arregloCarrito.splice(posicionBorrado,1)
                    await fs.promises.writeFile(this.rutaArchivo,JSON.stringify(arregloCarrito))
                    return posicionBorrado
                } else {
                    return posicionBorrado
                }
            }
            else{
                return -1
            }
        } catch (error) {
            console.log(error);
        }
    }


    
    async deleteProdById(idCart,idProd){
        try {
            if (this.archivoCreado(this.rutaArchivo)){
                let arregloCarrito=[]
                const contenido = await fs.promises.readFile(this.rutaArchivo,"utf-8")
                arregloCarrito=JSON.parse(contenido)
                let carrito= arregloCarrito.find(el => el.id===idCart)
                let  posicionPorducto= carrito.productos.findIndex(el=>el.id===idProd)
                if (posicionPorducto!=-1) {
                    carrito.productos.splice(posicionPorducto,1)
                    await fs.promises.writeFile(this.rutaArchivo,JSON.stringify(arregloCarrito))
                    return posicionPorducto
                } else {
                    return posicionPorducto
                }

            }else{
                return null
            }
        } catch (error) {
            console.log(error);
        }
    }



}




module.exports= Contenedor