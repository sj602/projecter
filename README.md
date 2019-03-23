# Projecter

A Wep app for any indiviauls and teams who's struggling to make and manage plans.

[Sample](https://snokl-projecter.herokuapp.com/)

## Getting Started

### Installing

```
npm install 
```


### Modifying settings

The server and DB settings are set for my own use so you should modify these parts to make it work.

in server/server.js
```
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/admin')
```

## Built With

* [React](https://reactjs.org/)
* [Redux](https://redux.js.org/)
* [React Router](https://github.com/ReactTraining/react-router)
* [Express](https://expressjs.com/ko/)
* [Mongodb](https://www.mongodb.com/)
* [Material-UI](https://material-ui.com/)


## License

This project is licensed under the MIT License.
