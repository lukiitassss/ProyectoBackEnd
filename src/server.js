const productosRoute =require('./Routes/Productos.js')
const carritoRoute= require ('./Routes/Carrito.js')
const express= require("express")
const app= express()




app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/api/productos',productosRoute)
app.use('/api/carrito',carritoRoute)





const PORT = process.env.PORT || 8989
//dejamos el servidor escuchando en el puerto que recibimos
const server= app.listen(PORT,()=>{
    console.log(`escuchando el puerto ${PORT}`);
 })
 
 //esto es para capturar los errores
 server.on("error",error=>console.log(`Error: ${error}`))


 app.get("*",(req,res)=>{
    res.json("Ruta no existente")
 })