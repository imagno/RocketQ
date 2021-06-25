const Database = require('../db/config')

module.exports = {
  async create(req, res) {
    const db = await Database()
    const pass = req.body.password
    let isRoom = true
    let roomId

    while(isRoom) {
      for (let i = 0; i < 6; i++) {
        roomId === undefined ? roomId = Math.floor(Math.random() * 10) : roomId += Math.floor(Math.random() * 10).toString()
      }

      const roomsCheck = await db.all(`SELECT id FROM rooms`)

      isRoom = roomsCheck.some(forbiddenRoomId => forbiddenRoomId === parseInt(roomId))

      if(!isRoom) {
        await db.run(`INSERT INTO rooms (
          id,
          pass
        ) VALUES (
          ${parseInt(roomId)},
          ${pass}
        )`)
      }
    }

    await db.close()

    res.redirect(`/room/${roomId}`)
  },

  open(req, res) {
    const roomId = req.params.room
    res.render('room', { roomId: roomId })
  }
}