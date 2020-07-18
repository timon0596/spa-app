const h = require('http')
const fs = require('fs')
const express = require('express')
const path = require("path")
const bodyParser = require('body-parser')
const multer  = require('multer')
const seq = require('sequelize')
const { DataTypes } = require("sequelize")
const upload = multer()
const app = express()
const connection = new seq('spa-app','root','',
	{
		host: 'localhost', 
		dialect: 'mysql',
	})
const lecturers = connection.define('lecturers',{
	name:{type: DataTypes.STRING},
	surname:{type: DataTypes.STRING},
	lastName:{type: DataTypes.STRING},
	id:{
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	}
},{ timestamps: false })
// const subjects = connection.define('subjects',{
// 	subject:{
// 		type: DataTypes.STRING,
// 		unique: true
// 	},
// 	lecturers:{
// 		type: DataTypes.STRING
// 	},
// 	id:{
// 		type: DataTypes.INTEGER,
// 		primaryKey: true,
// 		autoIncrement: true,
// 	}
// },{ timestamps: false })

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static(path.resolve(__dirname,'dist')))


app.get('/', function (req, res) {
	res.writeHead(200,{"Content-Type": "text/html"})
	res.end(fs.readFileSync('./dist/index.html'))
})
app.get('/favicon.ico', function (req, res) {
	res.writeHead(200,{"Content-Type": "text/plain"})
	res.end('icon')
})
app.post('/lecturers',upload.none(), async (req, res, next)=>{
	console.log(req.body)
	await lecturers.create(req.body)
	res.end(JSON.stringify(req.body))
})
app.get('/lecturers',async (req,res)=>{
	const users = await lecturers.findAll()
	const responseData = [...users.map((u)=>u.dataValues)]
	console.log(responseData)
	res.end(JSON.stringify(responseData))
})
const PORT=4000
app.listen(PORT, function () {
 
});