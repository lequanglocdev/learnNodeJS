import pool from '../config/connectDB';
import connection from '../config/connectDB';
import multer from 'multer'
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
let getUpdateFile = async (req, res) => {
    return res.render('updatefile.ejs')
}

let handleUploadFile = async (req, res) => {
    // console.log(req.file)


    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.file) {
        return res.send('Please select an image to upload');
    }


    // Display uploaded image for user validation
    res.send(`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="./">Upload another image</a>`);

}
let upLoadMultipleFiles = async (req, res) => {
    if (req.fileValidationError) {
        return res.send(req.fileValidationError);
    }
    else if (!req.files) {
        return res.send('Please select an image to upload');
    }

    let result = "You have uploaded these images: <hr />";
    const files = req.files;
    let index, len;

    // Loop through all the uploaded images and display them on frontend
    for (index = 0, len = files.length; index < len; ++index) {
        result += `<img src="/image/${files[index].filename}" width="300" style="margin-right: 20px;">`;
    }
    result += '<hr/><a href="./">Upload more images</a>';
    res.send(result);
}
module.exports = {
    getHompage, getDetailPage, creatNewUser, deleteUsers, editUsers, updateUsers, getUpdateFile, handleUploadFile, upLoadMultipleFiles
}