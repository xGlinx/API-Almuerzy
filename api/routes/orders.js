const express = require ('express')
const Orders = require('../models/Orders')
const { isAuthenticated, hasRoles} = require('../auth')

const router = express.Router()

//Listado de Orders
router.get('/', (req, res) =>{
    Orders.find()
        .exec()
        .then(x => res.status(200).send(x))
})

//Busqueda de Orders
router.get('/:id', (req, res) =>{
    Orders.findById(req.params.id)
        .exec()
        .then(x => res.status(200).send(x))
})

//Creacion de una Order
router.post('/', isAuthenticated, (req, res) => {
    const { _id } = req.user
    Orders.create({...req.body, user_id: _id})
        .then(x => res.status(201).send(x))
})

//Modificacion de un Order
router.put('/:id', isAuthenticated, (req, res) =>{
    Orders.findByIdAndUpdate(req.params.id, req.body)
        .then(() => res.sendStatus(204))
})

//Eliminar un Order
router.delete('/:id', isAuthenticated, (req, res) =>{
    Orders.findByOneAndDelete(req.params.id)
        .then(() => res.sendStatus(204))
})


module.exports = router