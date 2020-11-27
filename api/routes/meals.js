const express = require ('express')
const Meals = require ('../models/Meals')
const router = express.Router()

//Listado de Meals
router.get('/', (req, res) =>{
    Meals.find()
        .exec()
        .then(x => res.status(200).send(x))
})

//Busqueda de un Meal por ID
router.get('/:id', (req, res) =>{
    Meals.findById(req.params.id)
        .exec()
        .then(x => res.status(200).send(x))
})

//Crear un Meal
router.post('/', (req, res) => {
    Meals.create(req.body)
        .then(x => res.status(201).send(x))
})

//Modificar un Meal
router.put('/:id', (req, res) =>{
    Meals.findByIdAndUpdate(req.params.id, req.body)
        .then(() => res.sendStatus(204))
})

//Eliminar un Meal
router.delete('/:id', (req, res) =>{
    Meals.findOneAndDelete(req.params.id)
        .then(() => res.sendStatus(204))
})

module.exports = router