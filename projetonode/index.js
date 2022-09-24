const express = require('express')
const app = express()
const { Sequelize, DataTypes } = require('sequelize')
const TaskModel = require('./models/task')

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'my-database.db'
})

const tasks = TaskModel(sequelize , DataTypes)

app.set('view engine', 'ejs')
// codigo deu certo
app.get('/tarefas', async (req, res) => {
    // const allTasks = await tasks.findAll()

  const allTasks = await sequelize.query('SELECT * FROM Tasks')
    res.json({allTasks })
})


// deu certo
app.get('/tarefa/:id', async (req, res) => {
    
    const taskId = req.params.id

    const task = await tasks.findByPk(taskId)

    res.json({ id: task.id, name: task.name })
    
})

app.post('/tarefas', async (req, res) => {
    const  body = req.body
    
        await tasks.create({name: "farinha de mandioca" }) 
        res.status(201).send("Boa! tarefa adicionada com exito!!")
        
})

app.put('/tarefa/:id', async (req, res) => {
    const taskId = req.params.id

    const task = await tasks.findByPk(taskId)
    
    task.update({ name: 'carne de porco' })
    
    res.json(" Atualizada con exito!!") 
})

app.delete('/tarefa/:id', async (req, res) => {
    const taskId = req.params.id
    
    
    await tasks.destroy({where: {id: taskId}})

    res.send("tarefa deletada!" )
    
})



app.listen(8080, () => {
    console.log('Servidor express funcionando. Acesse: http://localhost:8080')
})
