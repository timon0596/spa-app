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
const teachers = connection.define('lecturers',{
	first_name:{type: DataTypes.STRING},
	second_name:{type: DataTypes.STRING},
	patronymic:{type: DataTypes.STRING},
	id:{
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	}
},{ timestamps: false })
const subjects = connection.define('subjects',{
	subject:{
		type: DataTypes.STRING,
		unique: true
	},
	lecturers:{
		type: DataTypes.STRING
	},
	id:{
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	}
},{ timestamps: false })

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
app.get('/teachers', async function (req, res) {
	async function foo(){
		const lecturers = await teachers.findAll()
		return JSON.stringify(lecturers, null, 2)
	}
	let resp = await foo()
	res.writeHead(200,{"Content-Type": "application/json"})
	res.end(resp)
})
app.get('/subjects', async function (req, res) {
	async function foo(){
		const subs = await subjects.findAll()
		return JSON.stringify(subs, null, 2)
	}
	let resp = await foo()
	res.writeHead(200,{"Content-Type": "application/json"})
	res.end(resp)
})







app.post('/teachers', async function (req, res) {
	const teacher = req.body.teacher.split(" ")
	async function foo(){
		const lecturers = await teachers.findAll({where: {
			first_name: teacher[0],
			second_name: teacher[1],
			patronymic: teacher[2],
		}})
		return JSON.stringify(lecturers, null, 2)
	}
	let resp = await foo()
	res.writeHead(200,{"Content-Type": "application/json"})
	res.end(resp)
})
app.post('/newTeacher', upload.none(), function (req, res, next) {
	console.log(req.body)
	teachers.create({first_name: req.body.first_name,second_name: req.body.second_name,patronymic: req.body.patronymic}).then((d)=>{
		res.writeHead(200,{"Content-Type": "text/plain"})
		res.end("данные обновлены")
	}).catch((e)=>{
		console.log(e)
	})
})

app.post('/newSubject',(req,res)=>{
	subjects.create({subject: req.body.sub, lecturers: req.body.lecturers}).then((d)=>{
		res.writeHead(200,{"Content-Type": "text/plain"})
		res.end(JSON.stringify(req.body)+"\n"+"данные обновлены")
	}).catch((e)=>{
		res.writeHead(200,{"Content-Type": "text/plain"})
		res.end(JSON.stringify({
			type: 'error',
			message: e.errors[0].message
		}))
	})
	
})
app.post('/subjectRedact',(req,res)=>{
	subjects.update({lecturers: req.body.teachers},{where: {
		id: req.body.subID
	}}).then((d)=>{
		res.writeHead(200,{"Content-Type": "text/plain"})
		res.end(JSON.stringify(req.body)+"\n"+"данные обновлены")
	}).catch((e)=>{
		res.writeHead(200,{"Content-Type": "text/plain"})
		res.end(JSON.stringify({
			type: 'error',
			message: e.errors[0].message
		}))
	})
	
})
const PORT=4000
app.listen(PORT, function () {
 
});