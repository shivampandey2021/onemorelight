const express = require("express");
const path = require("path");
const RegisterService = require("./register-service");
const ErrorService = require(path.resolve(__dirname, "error-service"));
const fs = require('fs');
const multer = require('multer');
const upload = multer({
    dest: './downloads',
    rename: function (fieldname, filename) {
        //console.log("File name=" + filename + Date.now());
        return filename + Date.now();
    }
});
type = upload.single('file');

class RegisterRoutes {

    /**
     * Setups the routes for user register related REST api calls
     */
    static setup(root) {

        const registerRouter = express.Router();

        /**
         * Created an api that register user details
         *  @RegisterService has the methods to interact with the User DB
         */

        registerRouter.post('/user-details', function (req, res, next) {
            console.log('Going to Save User details:-------- ', JSON.stringify(req.body, null, 4));
            RegisterService.saveUserDetials(req, (result) => {
                if (result && result.error) {
                    return next(ErrorService.genError(result));
                } else {
                    res.send(result);
                }
            });
        });


        /**
         * Created an api that save user's Topics
         *  @RegisterService has the methods to interact with the Topic table in DB
         */
        registerRouter.post('/user-topic', function (req, res, next) {
            RegisterService.saveUserTopics(req, (result) => {
                if (result && result.error) {
                    return next(ErrorService.genError(result));
                } else {
                    res.send(result);
                }
            });
        });


        /**
         * Created an api that see suggested users
         *  @RegisterService has the methods to interact with the user & Topic table in DB
         */
        registerRouter.post('/users', function (req, res, next) {
            RegisterService.seggestUsers(req, (result) => {
                if (result && result.error) {
                    return next(ErrorService.genError(result));
                } else {
                    res.send(result);
                }
            });
        });


        registerRouter.post('/uploadFile', type, function (req, res) {
            console.log('Inside Upload goal sheet :--------------------');
            /** When using the "single"
             data come in "req.file" regardless of the attribute "name". **/
            const tmp_path = req.file.path;

            /** The original name of the uploaded file
             stored in the variable "originalname". **/
            const fileBaseName = (req.file.originalname).slice(0, -4);
            const extension = path.extname(req.file.originalname);
            //var target_path = './docStore/' + req.file.originalname;
            const fileNewName = fileBaseName + Date.now() + extension;
            const target_path = './downloads/' + fileNewName;
            //console.log('target_path=' + target_path);

            /** A better way to copy the uploaded file. **/
            const src = fs.createReadStream(tmp_path);
            const dest = fs.createWriteStream(target_path);
            src.pipe(dest);
            src.on('end', function () {
                let insertResult = {
                    "FILE_UPLOAD_RESULT": "SUCCESS",
                    "FILE_NAME": fileNewName
                };
                res.send(insertResult);
            });
            src.on('error', function (err) {
                let insertResult = {
                    "FILE_UPLOAD_RESULT": "FAILURE"
                };
                res.send(insertResult);
            });
        });

        root.use(registerRouter);
    }

}

module.exports = RegisterRoutes;