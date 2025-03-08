export default {
  dbURL: process.env.MONGO_URL || 'mongodb+srv://alonw1010:simba1010@pokedex.ong1o.mongodb.net/?retryWrites=true&w=majority&appName=Pokedex',
  dbName: process.env.DB_NAME || 'pokedex_db'
}

// export default {
//   dbURL: process.env.MONGO_URL || 'mongodb+srv://theUser:thePass@cluster0-klgzh.mongodb.net/test?retryWrites=true&w=majority',
//   dbName : process.env.DB_NAME || 'tester_db'
// }
