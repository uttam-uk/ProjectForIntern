var userService = require('./userService');
var userModel = require('./userModel');
var mongoose = require('mongoose');


const createUser = async (body) => {
    try {
        const { name, address, phone } = body
        const user = new userModel({ name, address, phone })
        return await user.save()

    } catch (error) {
        console.log("error");
    }
}

const findUser = async () => {
    try {
        const allUser = await userModel.find()
        return allUser
    } catch (error) {
        console.log("error")
    }
}


const updateResult = async (user, _id) => {
    try {
        const updatedUser = await userModel.findByIdAndUpdate(_id, { ...user, _id }, { new: true });
        return updatedUser
    } catch (error) {
        console.log(error)
    }
}

const deleteUser = async (id) => {
    try {
        return await userModel.findByIdAndRemove(id);
    } catch (error) {
        console.log(error)
    }
}

var getDataConntrollerfn = async (req, res) => {
    const empolyee = await findUser()
    res.send({ "status": true, "data": empolyee });
}

var createUserControllerFn = async (req, res) => {
    const status = await createUser(req.body)

    if (status) {
        res.send({ "status": true, "message": "User created successfully" });
    } else {
        res.send({ "status": false, "message": "Error creating user" });
    }
}

var updateUserController = async (req, res) => {
    console.log(req.params.id);
    console.log(req.body);
    const { id: _id } = req.params;

    const user = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send(`No User with id : ${_id}`);
    const result = await updateResult(user, _id)

    if (result) {
        res.send({ "status": true, "message": "User Updateeeedddddd" });
    } else {
        res.send({ "status": false, "message": "User Updateeeedddddd Faileddddddd" });
    }
}

var deleteUserController = async (req, res) => {
    console.log(req.params.id);

    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const deleted = await deleteUser(id)
    if (deleted) {
        res.send({ "status": true, "message": "User Deleteddd" });
    } else {
        res.send({ "status": false, "message": "User Deleteddd Faileddddddd" });
    }
}
module.exports = { getDataConntrollerfn, createUserControllerFn, updateUserController, deleteUserController };