// set env if NODE_ENV isn't production
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const readline = require('readline')
const db = require('../../config/mongoose')

const inquirer = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

db.once('open', async () => {
  try {
    inquirer.question(`Warning: input 'yes' to delete database : `, confirm => {
      if (confirm === 'yes') {
        // await db.dropDatabase()
        console.log('Database is dropped!')
      } else console.log('cancel action')
      inquirer.close()
      process.exit()
    })
  } catch {
    error => console.log(error)
  }
})
