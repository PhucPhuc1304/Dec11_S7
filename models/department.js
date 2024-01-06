var Department = require('../schema/department');

module.exports = {
    getAll: function () {
        return Department.find().exec();
    },
    getByID: function (id) {
        return Department.findById(id).exec();
    },
    create: function (name) {
        return new Department({ name }).save();
    },
    update: function (departmentID, newName) {
        return Department.findByIdAndUpdate(departmentID, { name: newName }, { new: true }).exec();
    },
    delete: function (departmentID) {
        return Department.findByIdAndDelete(departmentID).exec();
    }
};
