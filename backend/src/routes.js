
const express = require('express');

//importando o MULTER para trabalhar com arquivos
const multer = require('multer');
const uploadConfig = require('./config/upload');

const SessionController = require('./controllers/SessionController');
const SpotController = require('./controllers/SpotController');
const DashboardController = require('./controllers/DashboardController');
const BookingController = require('./controllers/BookingController');
const ApprovalController = require('./controllers/ApprovalController');
const RejectionController = require('./controllers/RejectionController');

const routes = express.Router();
const upload = multer(uploadConfig);

    //common methods
    //GET - retrieve info from backend
    //POST - send info to backend
    //PUT - edit info in backend
    //DELETE - delete info in backend

//req.query - access query params (used for filters)
//req.params - access route params (used for edit and del)
//req.body - access requisition body (used for create or edit)

//Example with a route with arrow function
// routes.post('/users/:id', (req, res) => {
//     return res.json(req.body);
// });

routes.post('/sessions', SessionController.store);
//using the second param as the multer upload and showing the field that is going to be an image
routes.post('/spots', upload.single('thumbnail'), SpotController.store);
routes.get('/spots', SpotController.index);

routes.get('/dashboard', DashboardController.show);

routes.post('/spots/:spot_id/bookings', BookingController.store);

routes.post('/bookings/:booking_id/approvals', ApprovalController.store);
routes.post('/bookings/:booking_id/rejections', RejectionController.store);
//exporting the routes const
module.exports = routes;