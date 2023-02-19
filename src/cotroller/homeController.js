import pool from '../config/connectDB';
import connection from '../config/connectDB';

let getHompage = async (req, res) => {

    // logic
    // let data = [];
    // connection.query(
    //     'SELECT * FROM `users` ',
    //     function (err, results, fields) {
    //         console.log('check my sql')
    //         console.log(results); // results contains rows returned by server
    //         let rows = results.map((row) => { return row });
    //         // console.log(fields); // fields contains extra meta data about results, if available
    //         results.map((row) => (data.push({
    //             id: row.id,
    //             firstName: row.firstName,
    //             lastName: row.lastName,
    //             email: row.email,
    //             address: row.address
    //         })));
    //         return res.render('Heder.ejs', { dataUser: data })

    //     });
    const [rows, fields] = await pool.execute('SELECT * FROM `users` ')
    let check = await pool.execute('SELECT * FROM `users` ')
    return res.render('index.ejs', { dataUser: rows })

}
let getDetailPage = async (req, res) => {

    let userId = req.params.id
    let [user] = await pool.execute(`SELECT * FROM users Where id = ? `, [userId])
    return res.send(JSON.stringify(user[0]))
}
let creatNewUser = async (req, res) => {
    let { firstName, lastName, email, address } = req.body;

    await pool.execute('insert into users(firstName,lastName,email,address) values(?,?,?,?)',
        [firstName, lastName, email, address])
    return res.redirect('/')
}
let deleteUsers = async (req, res) => {
    let userId = req.body.userId
    await pool.execute('delete from users where id=? ', [userId])
    return res.redirect('/')

}
let editUsers = async (req, res) => {
    let id = req.params.id
    let [user] = await pool.execute('select * from users where id = ?', [id])
    return res.render('update', { dataUser: user[0] })
}
let updateUsers = async (req, res) => {
    let { firstName, lastName, email, address, id } = req.body
    await pool.execute('update users set firstName=? , lastName=? , email=? , address=? where id = ?', [firstName, lastName, email, address, id])
    return res.redirect('/')
}
module.exports = {
    getHompage, getDetailPage, creatNewUser, deleteUsers, editUsers, updateUsers
}