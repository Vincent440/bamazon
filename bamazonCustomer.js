require('dotenv').config()

const mysql = require('mysql')
const inquirer = require('inquirer')
const Table = require('cli-table3')
const colors = require('colors')
const div = '='.repeat(70)
colors.setTheme({
  ok: ['green'],
  headerMsg: ['white', 'bold', 'underline'],
  errorMsg: ['black','underline','bgRed']
})
const connection = mysql.createConnection({
  host: process.env.HOST,
  port: process.env.PORT,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE_NAME
})
connection.connect(err => {
  if (err) throw err
  readProducts()
})
function buyAgain () {
  inquirer
    .prompt([
      {
        type: 'confirm',
        message: 'Make another Purchase? Type:'.bgBlue + ' Yes to continue'.green + ' or ' + 'Exit'.red,
        name: 'repeat',
        default: false
      }
    ])
    .then(user => {
      if (user.repeat) {
        readProducts()
      } else {
        console.log('\nThank you come again!\nGoodbye.\n'.green.underline)
        connection.end()
      }
    })
}
function readProducts () {
  console.log(
    '\n' +
      div.rainbow.bold +
      '\n=== Welcome to the BAMAZON Store page | Displaying current inventory ===\n'
        .bold.cyan +
      div.rainbow.bold
  )
  connection.query(
    'SELECT item_id,product_name,price,stock_quantity FROM products WHERE stock_quantity > 0',
    (err, stock) => {
      if (err) throw err
      let stockIds = []
      let table = new Table({
        head: ['ITEM ID'.headerMsg, 'PRODUCT NAME'.headerMsg, '$ UNIT PRICE'.ok]
      })
      stock.forEach(inv => {
        stockIds.push(inv.item_id)
        table.push([
          'ID: '.gray + inv.item_id,
          inv.product_name.toUpperCase().cyan.underline.bold,
          '$ '.ok + inv.price.toFixed(2).ok
        ])
      })
      console.log(table.toString())
      customerPrompt(stockIds)
    }
  )
}
function customerPrompt (invIds) {
  inquirer
    .prompt([
      {
        type: 'number',
        message: 'ITEM ID '.headerMsg + 'of the Product you would like to purchase? '.bgBlue + '\n',
        name: 'id',
        filter: userInput => {
          if (userInput === 'NaN' || isNaN(userInput)) {
            return ''
          }
          if (invIds.includes(userInput)) {
            return userInput
          }
          return ''
        },
        validate: (id, answersHash) => {
          if (invIds.includes(id)) {
            return true
          }
          return 'Must be a valid ITEM ID'.errorMsg
        }
      },
      {
        type: 'number',
        message: ' AMOUNT '.headerMsg + 'of the Product you would like to purchase? '.bgBlue + '\n',
        name: 'units',
        default: 1,
        filter: userInput => {
          if (userInput === 'NaN' || isNaN(userInput)) {
            return ''
          }
          return userInput
        },
        validate: amt => {
          var valid = !isNaN(parseFloat(amt))
          if (valid && Number.isInteger(amt) && amt > 0) {
            return true
          }
          amt = 0
          return 'Must enter a positive whole number for order amount!'.errorMsg
        }
      }
    ])
    .then(order => {
      checkInventory(order.id, order.units)
    })
}
function checkInventory (itemID, amount) {
  let query =
    'SELECT item_id,stock_quantity,price,product_name FROM products GROUP BY item_id = ? HAVING item_id = ?'
  connection.query(query, [itemID, itemID], (err, itemData) => {
    if (err) throw err
    let item = itemData[0],
      stockAmt = item.stock_quantity,
      stockId = item.item_id
    if (stockAmt >= amount && stockId === itemID && amount > 0) {
      console.log(
        div.green +
          '\nSuccesfully placing order.\nORDER DATA:\n'.green.underline +
          div.green
      )
      purchaseItem(item, amount)
    } else {
      console.log(
        div.red +
          '\nInsufficient quantity in Stock to place this order, Try a different amount or Item.\nUNSUCCESSFUL ORDER DATA:\n'
            .red.underline +
          div.red
      )
      let failed = new Table({
        head: [
          'ITEM ID',
          'ITEM NAME',
          '$ UNIT PRICE',
          '$ TOTAL COST',
          'AMOUNT ORDERED',
          'CURRENT STOCK'
        ]
      })
      failed.push([
        'ID: '.gray + item.item_id,
        item.product_name.toUpperCase().red,
        '$ '.red + item.price.toFixed(2).red,
        '$ '.red + (amount * item.price).toFixed(2).red,
        amount,
        item.stock_quantity
      ])
      console.log(failed.toString())
      return readProducts()
    }
  })
}
function purchaseItem (item, amount) {
  let purchase = new Table({
    head: [
      'ITEM ID'.ok,
      'ITEM NAME'.ok,
      'AMOUNT ORDERED'.ok,
      '$ UNIT PRICE'.ok,
      '$ TOTAL COST'.ok
    ]
  })
  purchase.push([
    'ID: '.ok + item.item_id,
    item.product_name.toUpperCase().ok,
    'x '.ok + amount,
    '$ '.ok + item.price.toFixed(2).ok,
    '$ '.ok + (amount * item.price).toFixed(2).ok
  ])
  console.log(purchase.toString())
  let query =
    'UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?'
  connection.query(query, [amount, item.item_id], err => {
    if (err) throw err
    buyAgain()
  })
}
