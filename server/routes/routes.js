const express = require('express');
const bodyParser = require('body-parser');
const Project = require('./models/Project');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.route('/add').post((req, res) => {
    const project = new Project();
    project.title = req.body.title;
    project.year = req.body.year;
    project.month = req.body.month;
    project.day = req.body.day;

    project.save((err) => {
        if(err) res.send(err);
        res.send('Project successfully added!');
    });
})

router.route('/edit').post((req, res) => {
    const doc = {
        title: req.body.title,
        year = req.body.year,
        month = req.body.month,
        day = req.body.day
    }
    console.log(doc);

    Project.update({_id: req.body._id}, doc, (err, result) => {
        if(err) res.send(err);
        res.send('Project successfully edited!');
    });
})

router.get('/delete', (req, res) => {
    const id = req.query.id;
    Project.find({_id: id}).remove().exec((err, project) => {
        if(err) res.send(err);
        res.send('Project successfully deleted');
    });
})

router.get('/getAll', (req, res) => {
    Project.find({}, (err, projects) => {
        res.render('/', {projects});
    })
})

module.exports = router;