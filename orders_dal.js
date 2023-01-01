

const sqlite3 = require('sqlite3').verbose();
const db_file_loc = './db/db1.db'

function open_db(file_name) {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(file_name, (err) => {
            if (err) {
                console.log(`Failed to connect to ${file_name}`);
                reject(err)
            }
            else {
                console.log(`Successfully connected to ${file_name}`);
                resolve(db)
            }
        })
    })
}

function close_db_async(db) {
    return new Promise((resolve, reject) => {
        db.close(err => {
            if (err) {
                console.log(err.message);
                reject(err.message)
            }
            else {
                console.log('Database connection closed!');
                resolve()
            }
        })
    })
}

                                                                                                                    

function   get_all(db, query) {
    return new Promise(function (resolve, reject) {
        db.all(query, (err, rows) => {
            if (err) {
                console.log(`ERROR: ${err}`);
                reject(err)
            }
            else {
                console.log(rows);
                resolve(rows);
            }
        })
    })
}


function find_by_lname(db, name) {
    return new Promise(function (resolve, reject) {
        const sql_find_by_lname = `SELECT * FROM ORDERS 
                        WHERE NAME = ${name}`
        db.get(sql_find_by_lname, (err,row) => {
            if (err) {
                console.log(`ERROR: ${err}`);
                reject(err)
            }
            else {
                resolve(row)
            }
        })
    })
}

function get_order_by_id_async(db, id) {
    return new Promise(function (resolve, reject) {
        const sql_update = `SELSCT * FROM ORDERS
                        WHERE id = ${id}`
        db.get(sql_update, [id], (err, rows) => {
            if (err) {
                console.log(`ERROR: ${err}`);
                reject(err)
            }
            else {
                console.log(rows);
                resolve(rows);
            }
        })
    })
}



function update(db, id, new_book) {
    return new Promise(function (resolve, reject) {
        const sql_update = `UPDATE ORDERS
        SET BOOK
        WHERE id = ?`
        db.run(sql_update, [new_book,id], err => {
            if (err) {
            console.log(`ERROR: ${err}`);
            reject(err);
        }
        else {
            console.log(`new book ${new_book}`);
            resolve(`${new_book}`)
        }

        });
    });
}

function delete_orders_by_id(db, id) {
    return new Promise(function (resolve, reject) {
        const sql_update = `DELETE * FROM ORDERS
                        WHERE id = ?`
        db.run(sql_update, [id], err => {
            if (err) {
                console.log(`ERROR: ${err}`);
                reject(err)
            }
            else {
                console.log(`Deleted record id ${id}`);
                resolve()
            }
        })
    })
}




function insert_order_async(db, data) {
    return new Promise(function (resolve, reject) {
        const sql_insert = `INSERT INTO COMPANY (ID,NAME,AGE,ADDRESS,SALARY)
                            VALUES (?, ?, ? ,?, ?);` // [7, 'DAN', 18, 'MEXICO', 32000] == data
        db.run(sql_insert, data, err => {
            if (err) {
                reject(err)
            }
            else {
                console.log(`INSERTED ${data}`);
                resolve()
            }
        })
    });
}

async function main() {
    try {
        const db = await open_db(db_file_loc)
        console.log(db);
        const book1 = await get_all(db, "SELECT * FROM ORDERS")
        console.log(book1);
        const book2 = await get_order_by_id_async(db, 10)
        console.log(book2);
        const book3 = await find_by_lname(db, 'Begin')
        console.log(book3);
        const book4 = await insert_order_async(db, data)
        console.log(book4);
        const book5 = await delete_orders_by_id(db, 5)
        console.log(book5);
        await update(db, 3, 'Begin to Code with JavaScript')
        await close_db_async(db)
    }
    catch (err) {
        console.log(`ERROR: ${err}`);
    }
}

main()

