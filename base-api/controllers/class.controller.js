const { client } = require('../client')

const index = (req, res) => {
    client.classService.list({}, (error, classes) => {
        if (!error) {
            console.log('successfully fetch List method', classes)
            res.json(classes)
        } else {
            console.error(error)
            res.error(error)
        }
    })
}

const create = (req, res) => {
    const { body } = req
    client.classService.insert(body, (error, result) => {
        if (!error) {
            console.log('successfully create a class', result)
            res.json(result)
        } else {
            console.error(error)
            res.json(error)
        }
    })
}

module.exports = {
    index,
    create
}