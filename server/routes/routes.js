const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const Project = require('../../models/Project.js');
const User = require('../../models/User.js');
const UserSession = require('../../models/UserSession.js');
const router = express.Router();


router.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './../../client/index.html'));
})

// router.get('/', (req, res) => {
//     res.render('index');
// });

// router.route('/add').post((req, res) => {
//     const project = new Project();
//     project.title = req.body.title;
//     project.year = req.body.year;
//     project.month = req.body.month;
//     project.day = req.body.day;

//     project.save((err) => {
//         if(err) res.send(err);
//         res.send('Project successfully added!');
//     });
// })

// router.route('/edit').post((req, res) => {
//     const doc = {
//         title: req.body.title,
//         year: req.body.year,
//         month: req.body.month,
//         day: req.body.day
//     }
//     console.log(doc);

//     Project.update({_id: req.body._id}, doc, (err, result) => {
//         if(err) res.send(err);
//         res.send('Project successfully edited!');
//     });
// })

// router.get('/delete', (req, res) => {
//     const id = req.query.id;
//     Project.find({_id: id}).remove().exec((err, project) => {
//         if(err) res.send(err);
//         res.send('Project successfully deleted');
//     });
// })

// router.get('/getAll', (req, res) => {
//     Project.find({}, (err, projects) => {
//         res.render('/', {projects});
//     })
// })

// signup

router.post('/api/signup', (req, res, next) => {
    console.log(1)
    const { body } = req;
    const { password } = body;
    let { email } = body;

    if(!email) {
        return res.send({
            success: false,
            message: '이메일 칸을 채워주세요.'
        });
    }
    if(!password) {
        return res.send({
            success: false,
            message: '비밀번호 칸을 채워주세요.'
        });
    }

    email = email.toLowerCase();
    email = email.trim();

    // 1. verify email doenst exist
    // 2. save
    User.find({email: email}, (err, previouseUsers) => {
        if(err) {
            return res.send({
                success: false,
                message: '서버 에러'
            });
        } else if (previouseUsers.length > 0) {
            return res.send({
                success: false,
                message: '이미 계정이 존재합니다.'
            });
        }

        // save new user
        const newUser = new User();

        newUser.email = email;
        newUser.password = newUser.generateHash(password);
        newUser.save((err, user) => {
            if(err) {
                return res.send({
                    success: false,
                    message: '서버 에러'
                });
            }
            return res.send({
                success: true,
                message: '회원가입이 완료되었습니다.'
            });
        });
    });
});

//user session
router.post('/api/login', (req, res, next) => {
    const { body } = req;
    const { password } = body;
    let { email } = body;

    if(!email) {
        return res.send({
            success: false,
            message: '이메일 칸을 채워주세요.'
        });
    }
    if(!password) {
        return res.send({
            success: false,
            message: '비밀번호 칸을 채워주세요.'
        });
    }

    email = email.toLowerCase();
    email = email.trim();

    User.find({email}, (err, users) => {
        if(err) {
            console.log(err);
            return res.send({
                success: false,
                message: '서버 에러'
            })
        }
        if(users.length != 1) {
            return res.send({
                success: false,
                message: '이메일이나 비밀번호가 유효하지 않습니다. 다시 확인해주세요.'
            });
        }

        const user = users[0];
        if(!user.validPassword(password)) {
            return res.send({
                success: false,
                message: '비밀번호가 유효하지 않습니다.'
            })
        }

        const userSession = new UserSession();
        userSession.id = user._id;
        userSession.save((err, doc) => {
            if(err) {
                console.log(err);
                return res.send({
                    success: false,
                    message: '서버 에러'
                })
            }

            return res.send({
                success: true,
                message: '유효한 로그인입니다',
                token: doc._id
            })
        })
    })
})

// logout

router.get('/api/logout', (req, res, next) => {
    //get the token
    const { query } = req;
    const { token } = query;

    // verify the token is one of a kind and its not deleted.

    UserSession.findOneAndUpdate({
        _id: token,
        isDeleted: false
    }, {
        $set: {
            isDeleted: true
        }
    }, null, (err, sessions) => {
        if(err) {
            console.log(err);
            return res.send({
                success: false,
                message: '서버 에러'
            })
        }

        return res.send({
            success: true,
            message: 'OK'
        })
    })
})

//verify

router.get('/api/verify', (req, res, next) => {
    const { query } = req;
    const { token } = query;

    UserSession.find({
        _id: token,
        isDeleted: false
    }, (err, sessions) => {
        if(err) {
            console.log(err);
            return res.send({
                success: false,
                message: '서버 에러'
            })
        }

        if(sessions.length != 1) {
            return res.send({
                success: false,
                message: '유효하지 않습니다'
            })
        } else {
            return res.send({
                success: true,
                message: 'OK'
            })
        }
    })
})

module.exports = router;