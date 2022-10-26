/**
 * This script is used so our unit test can delete test entries whenever its
 * finished
 */
 import {Constants} from '../constants.js';
 import mongoUtil from '../utils/database.js';

 export default function deleteUser(_username) {
     var db = mongoUtil.getDb();
     var userCollections = db.collection(Constants.database.userCollections);

     userCollections.deleteOne({
        username: _username
    }).then(dbUser => {
        return;
    })
 }