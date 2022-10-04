const express=require('express');
const mysql=require('mysql2');
var bodyParser=require('body-parser');
var app=express();

var con=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Cami3105+',
    database:'prueba2'
})

app.use(express.static('public'))

con.connect();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended:true
}))

app.post('/addUser',(req,res)=>{
    let nombre=req.body.nombre

    con.query('insert into usuario(nombre) values("'+nombre+'")',(err,respuesta,fields)=>{

        if (err)return console.log("Error",err)

        return res.send(`
        <a href="index.html">Inicio</a>
        <h1>Nombre: ${nombre}</h1>`)


    })

})

app.post('/delUser',(req,res)=>{
    let nombreUser=req.body.usuario;

    con.query('DELETE FROM usuario where nombre=("'+nombreUser+'")',(err,respuesta,field)=>{
        if(err) return console.log('ERROR:',err)

        return res.send(`
        <a href="index.html">Inicio</a>
        <h1>Usuario ${nombreUser} eliminado</h1>`)
    })
})

app.get('/getUsers',(req,res)=>{
    
    con.query('SELECT *FROM usuario',(err,respuesta,field)=>{
        if(err) return console.log('ERROR:',err)

        var userHTML=``
        var i=0
        console.log(respuesta)
        userHTML+=`
        <a href="index.html">Inicio</a>
        `
        respuesta.forEach(user=>{
            i++
            userHTML+=`
            <tr><td>${i}</td><td>${user.nombre}</td></tr>
            `
        })

        return res.send(`<table>
            <tr>
                <th>id </th>
                <th>Nombre: </th>
            </tr>
            ${userHTML}
            </table>`)
    })
})

app.post('/updUser',(req,res)=>{
    let nombreUser=req.body.oriName;
    let newName=req.body.nomUpdate


    con.query('UPDATE usuario SET nombre=("'+newName+'") WHERE nombre=("'+nombreUser+'")',(err,respuesta,field)=>{
        if(err) return console.log('ERROR:',err)

        return res.send(`
        <a href="index.html">Inicio</a>
        <h1>Usuario ${nombreUser} cambiado a: <h3>${newName}</h3></h1>
        `)
    })
})


app.listen(3000,()=>{
    console.log("Servidor escuchando en el puerto 3000")
})