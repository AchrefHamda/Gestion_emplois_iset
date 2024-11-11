const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

const app = express();
const PORT = process.env.PORT || 5000;
const path = require('path');


app.use(bodyParser.json());
app.use(express.static('assets'));


app.use(bodyParser.urlencoded({extended: false}));


app.engine('hbs',exphbs.engine({extname:'.hbs'}));
app.set('view engine','hbs');


app.set('views', path.join(__dirname, 'views'));

const routes= require('./server/routes/user');
app.use('/',routes);

const Acceuil= require('./server/routes/user');
app.use('/Acceuil',Acceuil);

const login= require('./server/routes/user');
app.use('/login',login);

const RegisterETD= require('./server/routes/user');
app.use('/RegisterETD',RegisterETD);

const RegisterENS= require('./server/routes/user');
app.use('/RegisterETD',RegisterENS);

const EspaceEtd= require('./server/routes/user');
app.use('/EspaceEtd',EspaceEtd);

const depart= require('./server/routes/user');
app.use('/depart',depart);

const StudentList= require('./server/routes/user');
app.use('/StudentList',StudentList);

const TeacherList= require('./server/routes/user');
app.use('/TeacherList',TeacherList);

const aboutus= require('./server/routes/user');
app.use('/aboutus',aboutus);


const EspaceEns= require('./server/routes/user');
app.use('/EspaceEns',EspaceEns);


const MatieresList= require('./server/routes/user');
app.use('/MatieresList',MatieresList);

const NewEmplois= require('./server/routes/user');
app.use('/NewEmplois',NewEmplois);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
