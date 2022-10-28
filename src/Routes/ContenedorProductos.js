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
            let productos = fs.readFileSync(this.rutaArchivo,"utf-8")
            productos= JSON.parse(productos)
            if (productos.length!==0){
                let ids= productos.map(el =>el.id)
                return Math.max(...ids)
            }else{
                return 999
            }
        }else{
            return 999
        }
    }



    //metodo que sirve para crear guardar datos en el archivo
    async save(producto){
        
        try {
            let arregloProductos=[]
            this.idmax++
            producto.id=this.idmax
            if (this.archivoCreado(this.rutaArchivo)) {
                const contenido = await fs.promises.readFile(this.rutaArchivo,"utf-8")
                arregloProductos=JSON.parse(contenido)
                arregloProductos.push(producto)
                await fs.promises.writeFile(this.rutaArchivo,JSON.stringify(arregloProductos))
            } else {
                arregloProductos.push(producto)
                await fs.promises.writeFile(this.rutaArchivo,JSON.stringify(arregloProductos))
            }
            return this.idmax
        } catch (error) {
            console.error(error);
        }
    }

 //metodo que sirve para actualizar datos en el archivo
    async update(producto){
        
        try {
            if (this.archivoCreado(this.rutaArchivo)) {
                let arregloProductos=[]
                const contenido = await fs.promises.readFile(this.rutaArchivo,"utf-8")
                arregloProductos=JSON.parse(contenido)
                let prod =arregloProductos.find(el => el.id===producto.id)
                prod.title=producto.title
                prod.price=producto.price
                prod.url=producto.url_img
                await fs.promises.writeFile(this.rutaArchivo,JSON.stringify(arregloProductos))
                return 1
            } else {
                return -1
            }
        } catch (error) {
            console.error(error);
        }
    }



    //metodo que sirve para obtener un producto pasandole un ID
    async getById(numeroId){
        try {
            if (this.archivoCreado(this.rutaArchivo)){
                let arregloProductos=[]
                const contenido = await fs.promises.readFile(this.rutaArchivo,"utf-8")
                arregloProductos=JSON.parse(contenido)
                return arregloProductos.find(el => el.id===numeroId) || null
            }else{
                return null
            }


        } catch (error) {
            console.log(error);
        }
    }

    //metodo que sirve para obtener todos los productos existentes en el archivo
    async getAll(){
        try {
            if (this.archivoCreado(this.rutaArchivo)){
                let arregloProductos=[]
                const contenido = await fs.promises.readFile(this.rutaArchivo,"utf-8")
                arregloProductos=JSON.parse(contenido)
                return arregloProductos
            }
            else return []
        } catch (error) {
            console.log(error)
        }
    }
    //metodo q me dice la cantidad de productos q tengo
    async longitud(){
        try {
            if (this.archivoCreado(this.rutaArchivo)){
                let arregloProductos=[]
                const contenido = await fs.promises.readFile(this.rutaArchivo,"utf-8")
                arregloProductos=JSON.parse(contenido)
                return arregloProductos.length
            }
            else return 0
        } catch (error) {
            console.log(error)
        }
    }
    //metodo que sirve para borrar un producto desde su id
    async deleteById(numeroId){
        try {
            if(this.archivoCreado(this.rutaArchivo)){
                let arregloProductos=[]
                const contenido = await fs.promises.readFile(this.rutaArchivo,"utf-8")
                arregloProductos=JSON.parse(contenido)
                let posicionBorrado=arregloProductos.findIndex(el=>el.id===numeroId)
                console.log(numeroId);
                console.log(posicionBorrado);
                if (posicionBorrado!=-1) {
                    arregloProductos.splice(posicionBorrado,1)
                    await fs.promises.writeFile(this.rutaArchivo,JSON.stringify(arregloProductos))
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

    //metodo que sirve para borrar todos los productos
    async deleteAll(){
        try {
            if (this.archivoCreado(this.rutaArchivo)) {
                await fs.promises.writeFile(this.rutaArchivo, "[]");
            }
        } catch (error) {
            console.log(error);
        }
    }



}




module.exports= Contenedor