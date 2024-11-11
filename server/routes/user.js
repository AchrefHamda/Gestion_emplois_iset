const express =require('express');
const routes =express.Router();
const usercontrol =require('../controller/userController');

routes.get('/',usercontrol.Acceuil);

routes.get('/EspaceA',usercontrol.EspaceA);
routes.get('/login',usercontrol.login);
routes.get('/RegisterETD',usercontrol.RegisterETD);
routes.get('/RegisterENS',usercontrol.RegisterENS);
routes.get('/EspaceEtd',usercontrol.EspaceEtd);
routes.get('/EspaceEns',usercontrol.EspaceEns);
routes.get('/aboutus',usercontrol.aboutus);
routes.get('/TeacherList',usercontrol.TeacherList);
routes.get('/StudentList',usercontrol.StudentList);
routes.get('/depart',usercontrol.depart);
routes.get('/MatieresList',usercontrol.MatieresList);
routes.get('/NewEmplois',usercontrol.NewEmplois);

// routes.get('/classes', usercontrol.getClassesByDepartement);



routes.post('/StudentList',usercontrol.searchStd);
routes.post('/TeacherList',usercontrol.searchTeach);
routes.post('/MatieresList',usercontrol.searchMat);


routes.post('/login',usercontrol.loginP);

module.exports=routes;