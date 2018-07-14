const express = require('express');
const Project = require('../../models/Project.js');
const User = require('../../models/User.js');
const UserSession = require('../../models/UserSession.js');
const router = express.Router();
// const jwt = require('jsonwebtoken');
// const secretObj = require('../../utils/jwt');

router.get('/api/getAll', (req, res) => {
    Project.find({}, (err, projects) => {
        return res.send({projects});
    })
})

router.post('/api/add', (req, res) => {
    const newProject = new Project();

    newProject.title = req.body.title;
    newProject.progress = req.body.progress;
    newProject.dueDate = req.body.dueDate;
    newProject.description = req.body.description;
    newProject.milestone = req.body.milestone;
    newProject.participants = req.body.participants;

    newProject.save((err) => {
        if(err) return res.send(err);
        return res.send({success: true, message: '프로젝트가 추가되었습니다!'});
    });
});

router.put('/api/update', (req, res) => {
    const query = {_id: req.body.id};
    let newProject = {};

    newProject._id = req.body.id;
    newProject.title = req.body.title;
    newProject.dueDate = req.body.dueDate;
    newProject.progress = req.body.progress;
    newProject.milestones = req.body.milestones;
    newProject.description = req.body.description;
    newProject.participants = req.body.participants;

    Project.findOneAndUpdate(query, {$set: newProject}, {upsert: true, new: true}, (err, result) => {
        if(err) res.send(err);
        return res.send({success: true, message: '프로젝트가 저장되었습니다!'});
    });
})

router.delete('/api/delete', (req, res) => {
    const { id } = req.body;
    Project.find({_id: id}).remove().exec((err, project) => {
        if(err) return res.send(err);
        return res.send({success: true, message: '프로젝트가 삭제되었습니다!'});
    });
})

router.post('/api/signup', (req, res, next) => {
    const { name, password } = req.body;
    let { email } = req.body;

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

    email = email.toLowerCase().trim();

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
        newUser.name = name;
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
                message: '회원가입이 완료되었습니다!'
            });
        });
    });
});

router.post('/api/login', (req, res, next) => {
    const { password } = req.body;
    let { email } = req.body;

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

    email = email.toLowerCase().trim();

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

router.get('/api/logout/*', (req, res, next) => {
    //get the token
    const { token } = req.query;

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

router.get('/api/verify/*', (req, res, next) => {
    const { token } = req.query;

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