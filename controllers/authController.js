

const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const conexion = require('../database/db');
const { promisify } = require('util');

//procedimiento para registrarnos 

exports.register = async (req, res) => {
      try {
            const todo= req.body;
          const name = req.body.name;
          const user = req.body.user;
          const dni= req.body.dni;
          const mail = req.body.mail;
          const rol = req.body.rol;
          const pass = req.body.pass;
          let passHash = await bcryptjs.hash(pass, 8);
  
          // Verificar si el usuario ya existe
          conexion.query('SELECT * FROM users WHERE user = ?', [user], (error, results) => {
              if (error) {
                  console.log(error);
                  res.status(500).send('Error en la consulta de la base de datos');
                  return;
              }
  
              if (results.length > 0) {
                  // El usuario ya existe
                  res.render('register', {
                        alert: true,
                        alertTitle: "advertencia",
                        alertMessage: "el usuario, dni o mail ya existe",
                        alertIcon: 'info',
                        showConfirmButton: true,
                        timer: false,
                        ruta: 'register'
                  })
              } else {
                  // El usuario no existe, proceder con la inserción
                  conexion.query('INSERT INTO users SET ?', { user: user, name: name, pass: passHash, dni:dni, mail: mail, rol: rol }, (error, result) => {
                      if (error) {
                          console.log(error);
                          res.status(500).send('Error al registrar el usuario');
                      } else {
                          res.redirect('/');
                          console.log(todo)
                      }
                  });
              }
          });
      } catch (error) {
          console.log(error);
          res.status(500).send('Error en el servidor');
      }
  };
exports.login = async (req, res) => {
      try {
            const user = req.body.user
            const pass = req.body.pass
            if (!user || !pass) {
                  res.render('login', {
                        alert: true,
                        alertTitle: "advertencia",
                        alertMessage: "ingrese password o usuario",
                        alertIcon: 'info',
                        showConfirmButton: true,
                        timer: false,
                        ruta: 'login'
                  })
            } else {
                  conexion.query('SELECT * FROM users WHERE user = ?', [user], async (error, results) => {
                        if (results.length == 0 || !(await  bcryptjs.compare(pass, results[0].pass))) {
                              res.render('login', {
                                    alert: true,
                                    alertTitle: "error",
                                    alertMessage: " usuario o password  incorrectos",
                                    alertIcon: 'error',
                                    showConfirmButton: true,
                                    timer: false,
                                    ruta: 'login'
                              })
                        } else {
                              //inicio de sesion  ok
                              const id = results[0].id
                              const token = jwt.sign({ id: id }, process.env.JWT_SECRETO, {
                                    expiresIn: process.env.JWT_TIEMPO_EXPIRA
                              })

                              //para generar el token si  fecha de expiracion 
                              //const token = jwt.sign({id:id}, process.env.JWT_SECRETO)
                              console.log(" TOKEN : " + token + " para el usuario " + user)
                              const cookiesOption = {
                                    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                                    httpOnly: true
                              }
                              res.cookie('jwt', token, cookiesOption)
                              res.render('login', {
                                    alert: true,
                                    alertTitle: "conexion exitosa",
                                    alertMessage: "!LOGIN CORRECTO ¡",
                                    alertIcon: 'success',
                                    showConfirmButton: false,
                                    timer: 800,
                                    ruta: ''
                              })
                        }
                  })
            }
      } catch (error) {
            console.log(error);
      }
}

exports.isAuthenticated = async (req, res, next)=> {
      if(req.cookies.jwt){
            try {
                  const decodificada = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRETO)
                  conexion.query('SELECT * FROM users WHERE id = ?',[decodificada.id], (error, results)=> {
                        if(!results){return next()}
                        req.user = results[0]
                       return next()
                  })
            } catch (error){
                  console.log(error)
                  return next()
            }
      }
      else {
            res.redirect('/login')
            
      }
}

exports.esAdmin = (req, res, next)=>{
      const rol = req.user.rol;
      if(rol !== "Administrador"){
            res.render('index', {
                  alert: true,
                  alertTitle: "error",
                  alertMessage: "no tiene permisos de administrador",
                  alertIcon: 'error',
                  showConfirmButton: true,
                  timer: false,
                  ruta: '/'
            })
      }else{
            next();
      }
}
exports.esProf = (req, res, next)=>{
      const rol = req.user.rol;
      if(rol !== "Profesional"){
            res.render('index', {
                  alert: true,
                  alertTitle: "error",
                  alertMessage: "no tiene permisos de profesional",
                  alertIcon: 'error',
                  showConfirmButton: true,
                  timer: false,
                  ruta: '/'
            })
      }else{
            next();
      }
}



exports.logout = (req, res) => {
      res.clearCookie('jwt')
      return res.redirect('/login')
}
