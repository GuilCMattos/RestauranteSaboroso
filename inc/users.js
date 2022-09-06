var conn = require('./db')

module.exports = { 

    render(req, res, error){

        res.render("admin/login", { 
            body: req.body,
            error
        })

    },

    login(email, password) { 

        return new Promise((resolve, reject)=> { 

            conn.query(`
                SELECT * FROM tb_users WHERE email = ?
            `, [
                email
            ], (err, results)=> { 

                if(err) { 
                    reject(err)
                } else { 

                    if(!results.length > 0) {
                        reject({
                            message: "usuário ou senha incorreto"
                        });

                    } else { 
                        let row = results[0]

                        if(row.password !== password) { 
                            reject({
                                message: 'senha incorreta'
                            });
                        } else { 
                            resolve(row);
                        }
                    }

                    

                   
                }

            })

        });
    },

    save(fields) { 

        return new Promise((resolve, reject)=> { 
          
            let query, params = [
                fields.name,
                fields.email,
                fields.password
            ];

            if(parseInt(fields.id) > 0) {

                query = `
                UPDATE tb_users
                SET 
                    name = ?,
                    email = ?,
                    password = ?
                WHERE id = ?
                `
               params.push(fields.id)

            } else { 

                query = `
                INSERT INTO tb_users (name, email, password)
                VALUES(?, ?, ?)
                `;
            }

            conn.query(query, params, (err, results)=> {

            if(err) { 
                reject(err)
            } else {

                resolve(results)
            }

        });

        });

    },

    getUsers() { 

        return new Promise((resolve, reject)=> { 

            conn.query(`
                SELECT * FROM tb_users ORDER BY title
                `, (err, results)=> { 

                    if(err) { 
                    reject(err)
                    } 

                  resolve(results)

                });

        });
    },

    delete(id) { 

        return new Promise((resolve, reject)=> { 

            conn.query(` 
                DELETE FROM tb_users WHERE id = ?
            `, [
                id
            ], (err, results)=> { 

                if(err) { 
                    reject(err);
                } else { 
                    resolve(results)
                }

            });
        })

    }

}