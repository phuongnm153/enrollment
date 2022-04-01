const { client } = require('../client')

const index = (req, res) => {
    client.enrollService.list({}, (error, classes) => {
        if (!error) {
            console.log('successfully fetch enroll List method', classes)
            res.json(classes)
        } else {
            console.error(error)
            res.error(error)
        }
    })
}

const create = (req, res) => {
    const { body } = req
    client.enrollService.insert(body, (error, result) => {
        if (!error) {
            console.log('successfully create a enroll', result)
            res.json(result)
        } else {
            console.error(error)
            res.json(error)
        }
    })
}

const confirm = (req, res) => {
    client.enrollService.confirm(req.params, (error, result) => {
        if (!error) {
            console.log('successfully confirm a enroll', result)
            res.json(result)
        } else {
            console.error(error)
            res.json(error)
        }
    })
}

module.exports = {
    index,
    create,
    confirm
}