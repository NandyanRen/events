const express = require('express')
const app = express()
const PORT = 3005
const cors = require('cors')
const userRouter = require('./routes/usersRoute')
const eventRouter = require('./routes/eventsRoute')
const userEventRouter = require('./routes/userEventsRoute')

app.use(express.json())
app.use(cors())


app.get('/', (req, res) => {
    res.json({message: "Error"})
})

app.use('/users', userRouter)
app.use('/events', eventRouter)
app.use('/userevents', userEventRouter)


app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))
