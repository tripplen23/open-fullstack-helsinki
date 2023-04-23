const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('Connecting to', url)

mongoose
    .connect(url)
    .then(result => {
        console.log('Connected to MongoDB')
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB:', error.message)
    })

const personSchema = new mongoose.Schema({
    name: { 
        type: String,
        minLength: 3,
        required: [true, 'User name required']
    },
    number: { 
        type: String,
        required: [true, 'User phone number required'],
        validate: {
            validator: function(v) {
                return /^\d{2,3}-\d{7,8}$/.test(v)
            },
            message: props => `${props.value} is not a valid phone number \n, a phone number format should be for example 84-917987113 or 849-17987113`
        }
    },
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)