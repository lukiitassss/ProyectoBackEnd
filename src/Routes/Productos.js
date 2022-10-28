const {Router} = require('express')
const Archivo= require("./ContenedorProductos.js")//clase con la cual guardo los productos
let archivo = new Archivo("./Productos.txt") //variable en la cual refiero a mi clase de productos
const router= Router()

function autenticacion (req, res, next) {
    let {user}=req.params
    if (user === "admin")
      return next();
    else
      return res.sendStatus(401);
};


//devuelve todos los productos o el indicado en el id
router.get('/:id?',autenticacion,(req,res)=>{
    let {id}=req.params
    id=Number(id)
    if (id){
        archivo.getById(id)
        .then(resp=>{
            resp!=null ? res.json(resp) : res.json('ID no encontrado')
        })
    }else{
        archivo.getAll()
        .then(resp=>{
            res.json(resp)
        })
    }
})



//deja agregar a los administradores productos
router.post("/:user",autenticacion,(req,res)=>{
    const producto= req.body
    if(!producto.price || !producto.title || !producto.url_img){
        res.json("error faltan datos")
    }else{
        producto.price=Number(producto.price)
        archivo.save(producto)
        .then(resp=>{
            res.json({resp})

        })
    }
})


//actualizamos los datos de un producto segun el id q nos llegue
router.put('/:id/:user',autenticacion,(req,res)=>{
    const {id} = req.params
    const actualizacion = req.body
    archivo.getById(Number(id)).then(producto=>{
        if (producto) {
            if (actualizacion.title==undefined && actualizacion.price==undefined && actualizacion.url_img==undefined) {
                res.json("debe ingresar al menos un dato")}
            else{
                if (actualizacion.title!=null) {
                        producto.title=actualizacion.title
                    } 
                if (actualizacion.price!=null) {    
                        producto.price=actualizacion.price
                    }
                if (actualizacion.url_img!=null) {    
                        producto.price=actualizacion.price
                    }
                archivo.update(producto)
                .then(resp =>{
                    res.json(`actualizacion exitoda del id: ${id} `)
                    console.log(resp);
                })
                    }
        } else {
            res.json("id no valido")
        }
    })
})

//dejamos q elimine  un producto por su id
router.delete('/:id/:user',autenticacion,(req,res)=>{
    const {id}=req.params
    archivo.deleteById(Number(id))
    .then(resp=>{
        if (resp!=-1) {
            console.log(resp);
            return res.json(`se elimino correctamenteo el id:${id}`)
        } else {
            return res.json(`el id ${id} no existe`)
        }
    })
    
})


module.exports= router