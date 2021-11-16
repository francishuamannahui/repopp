const express = require('express')
const app = express()
const port = 8000
app.set('view engine','ejs');


//creando conexion a base de datos 
const Sequelize = require('sequelize');
const sequelize = new Sequelize({
    dialect:'sqlite',
    storage:'./database.sqlite'
})
sequelize.authenticate()
.then(()=>{
    console.log("conexion establecida");
}).catch(err=>{
  console.log("error al conectarse");
})

//creacion del modelo
const Experiencia = sequelize.define(
  'experiencia',
  {
      puesto:Sequelize.STRING,
      empresa:Sequelize.STRING,
      descripcion:Sequelize.STRING,
      periodo:Sequelize.STRING
  }
);
//migración y poblado de data
sequelize.sync({force:true})
.then
(
  ()=>
  {
      console.log("BD y tabla creada")
      Experiencia.bulkCreate(
          [
              {puesto:'FullStack Developer',empresa:'Franz Corp',descripcion:'Desarrollando aplicacion web', periodo:'Octubre 2021 - A la fecha'},
              {puesto:'FreeLance Developer',empresa:'Franz Corp',descripcion:'Desarrollando aplicacion web ', periodo:'Octubre 2021 - A la fecha'},
              {puesto:'Junior Developer',empresa:'hewel packard',descripcion:'Desarrollando aplicacion .Net', periodo:'Octubre 2019 -  Octubre 2020'},
              
          ]).then(function(){
              return Experiencia.findAll();
          }).then(function(experiencia){
             // console.log(experiencia)
          })
  }
)


app.get('/', (req, res) => {
  Experiencia.findAll()
  .then((exp)=>{
    console.log(exp)
    res.render('index',{
      experiencias : exp,
      tituloexp : 'Experiencia Laboral'
    })
  })
  
})

app.use(express.static('static'))
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
