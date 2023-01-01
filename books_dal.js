

const sqlite3 = require('sqlite3').verbose();
const db_file_loc = './customer.db'

function open_db(customer) {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(customer, (err) => {
            if (err) {
                console.log(`Failed to connect to ${customer}`);
                reject(err)
            }
            else {
                console.log(`Successfully connected to ${customer}`);
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
                resolve(sql_update)
            }
        })
    })
}

function find_by_title(db, title) {
    return new Promise(function (resolve, reject) {
        const sql_update = `SELECT * FROM BOOKS  
                        WHERE TITLE = ${title}`
        db.get(sql_update,  (err,row) => {
            if (err) {
                console.log(`ERROR: ${err}`);
                reject(err)
            }
            else {
                console.log(`title updated to ${title}`);
                resolve(row)
            }
        })
    })
}

                                                                                                                

function get_all(db,query) {
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


function delete_book_by_id_async(db, id) {
    return new Promise(function (resolve, reject) {
        const sql_update = `DELETE FROM BOOKS
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

function get_by_id(db, id) {
    return new Promise(function (resolve, reject) {
        const sql_update = `SELSCT * FROM BOOKS
                        WHERE id = ${id}`
        db.get(sql_update, (err, rows) => {
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



function update (db, id, new_price) {
    return new Promise(function (resolve, reject) {
        const sql_update = `UPDATE BOOKS
        SET PRICE = ?
        WHERE id = ?;`
        db.run(sql_update, [new_price,id]), (err => {
            if (err) {
            console.log(`ERROR: ${err}`);
            reject(err)

             }
             else {
                console.log(`price to ${new_price}`);
                resolve(`${new_price}`)
          }
        })
    })
}




function insert_book_async(db, data) {
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
        const order1 = await get_all(db, "SELECT * from BOOKS");
        console.log(order1);
        const order2 = await get_by_id(db, 10);
        console.log(order2);
        const order3 = await find_by_title(db, 'ost');
        console.log(order3);
        const order4 = await insert_book_async(db);
        console.log(order4);
        const order5 = await delete_book_by_id_async(db,10);
        console.log(order5);
        await update(db,1,40)
        await close_db_async(db)
    }
    catch (err) {
        console.log(`ERROR: ${err}`);
    }
}

main()

