const {Router}=require('express')
const Archivo1= require("./ContenedorCarrito.js")//clase con la cual guardo los carritos de compra
let archivoCarrito = new Archivo1("./Carrito.txt") //variable en la cual refiero a mi clase de productos
const Archivo2= require("./ContenedorProductos")//clase con la cual guardo los carritos de compra
let archivoProducto = new Archivo2("./Productos.txt") //variable en la cual refiero a mi clase de productos
const router=Router()




router.post("/",(req,res)=>{
    archivoCarrito.createCart()
    .then(resp=>{
        res.json(resp)
    })
})

router.delete("/:id",(req,res)=>{
    let {id}=req.params
    id=Number(id)
    archivoCarrito.deleteById(id)
    .then(resp=>{
        if (resp!=-1) {
            console.log(resp);
            return res.json(`se elimino correctamenteo el carrito con el id:${id}`)
        } else {
            return res.json(`el carrito con el id ${id} no existe`)
        }
    })
})

router.post("/:id/productos",(req,res)=>{
    let{id}=req.params
    let idProducto = req.body
    archivoCarrito.getById(Number(id))
    .then(carrito=>{
        if (carrito!=null) {
            archivoProducto.getById(idProducto.id)
            .then(producto=>{
                if (producto!=null) {
                    archivoCarrito.saveProducto(carrito.id,producto)
                    .then(resp=>{
                        res.json("producto agregado con exito")
                    })
                } else {
                    res.json("El producto no existe")
                }
            })
        } else {
            res.json("el carrito no existe")
        }
    })
    
})


router.get('/:id/productos',(req,res)=>{
    let{id}=req.params
    archivoCarrito.getById(Number(id))
    .then(carrito=>{
        if (carrito!=null) {
            res.json(carrito.productos)
        }
        else{
            res.json("el carrito no existe")
        } 
    })
})


router.delete('/:id/productos/:id_prod',(req,res)=>{
    let {id,id_prod}=req.params
    archivoCarrito.getById(Number(id))
    .then(carrito=>{
        if (carrito!=null) {
            archivoProducto.getById(Number(id_prod))
            .then(producto=>{
                if (producto!=null) {
                    archivoCarrito.deleteProdById(carrito.id,Number(id_prod))
                    .then(resp=>{
                        res.json("producto eliminado con exito")
                    })
                } else {
                    res.json("El producto no existe")
                }
            })
        }
        else{
            res.json("el carrito no existe")
        } 
    })

})



module.exports= router