const express = require('express');
const router = express.Router();

const Server = require('../models/serverSchema');

// To get all server list

router.get('/servers', async(req,res)=>{
    try{
        const server = await Server.find({})
        res.send(server)
    }catch(e){
        res.status(500).send(e)
    }
})

// Get a specific server list based on ID specified in the API
router.get('/servers/:id',async(req,res)=>{
        const _id = req.params.id
        try{
            const server = await Server.findById(_id)
            if(!server){
                res.status(404).send()
            }
            res.send(server)
        }catch(e){
            res.status(500).send(e)
        }
    })

// add a server

router.post('/servers',async(req,res)=>{
    const server = new Server(req.body)

    try{
        await server.save()
        res.status(201).send(server)
    }catch(e){
        res.status(400).send(e)
    }

})

// Update a server entry using the ID specified

router.patch('/servers/:id',async(req,res)=>{
    const updates = Object.keys(req.body)
    const allowedUpdate = ['RUM', 'CPU', 'OperatingSystem', 'Graphics', 'Storage']
    const isValidOperation = updates.every((update)=>allowedUpdate.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error:'Invalid updates!'})
    }
    try{
        const update_servers = await Server.findById(req.params.id)
        updates.forEach((update)=>update_servers[update]=req.body[update])
        await update_servers.save()
        //const update_servers = await servers.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        if(!update_servers){
            return res.status(404).send()
        }
        res.send(update_servers)
    }catch(e){
        res.status(400).send(e)
    }

})

// Delete a server using the ID specified

router.delete('/servers/:id',async(req,res)=>{
    try{
        const update_server = await Server.findByIdAndDelete(req.params.id)
        if(!update_server){
            return res.status(404).send()
        }
        res.send(update_server)
    }catch(e){
        res.status(400).send(e)
    }
})

module.exports = router;


// {
//     "RUM":"4GB",
//     "CPU":"HCP",
//     "OperatingSystem":"Windows",
//     "Graphics": "something",
//     "Storage": "320gb"
// }