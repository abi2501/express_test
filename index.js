import e from 'express';
import express from 'express'


const app = express()
const port = 3000

app.listen(port, () => {
    console.log("Server starts running...")
});

app.use(express.json())

let dlist = []
let nextId = 1

app.post('/addData', (req, res) => {

    const { data, price } = req.body
    const newData = {
        "id": nextId++,
        "data": data,
        "price": price
    }

    dlist.push(newData)

    res.status(200).send(newData)
})

app.get('/getData', (req, res) => {
    res.status(200).send(dlist)
})


app.get("/getById/:id", (req, res) => {
    const id = parseInt(req.params.id)
    const item = dlist.find(d => d.id === id)
    if (!item) {
        res.status(404).send("Items not found")
    }
    res.status(200).send(item)
})


app.put("/updateById/:id", (req, res) => {
    const item = dlist.find(d => d.id === parseInt(req.params.id))

    if (!item) {
        res.status(400).send("Data not found")
    }

    item.data = req.body.data
    item.price = req.body.price

    res.status(200).send(item)

});


app.delete("/deleteById/:id", (req, res) => {
    const idx = dlist.findIndex(d => d.id === parseInt(req.params.id))

    if (idx === -1) {
        res.status(400).send("Unable to delete")
    }

    dlist.splice(idx, 1)

    res.status(204).send("deletes..")

});