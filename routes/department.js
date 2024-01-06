var express = require('express');
const { model } = require('mongoose');
const { use } = require('.');
var router = express.Router();
var responseData = require('../helper/responseData');
var modelDepartment = require('../models/department')
const bcrypt = require('bcrypt');
const configs = require('../helper/configs');
const { checkLogin } = require('../middlewares/protect');


router.get('/', async (req, res) => {
  try {
    const departments = await modelDepartment.getAll();
    res.status(200).json(departments);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:id', async (req, res) => {
  const departmentID = req.params.id;
  try {
    const department = await modelDepartment.getByID(departmentID);
    if (!department) {
      return res.status(404).json({ error: 'Department not found' });
    }
    res.status(200).json(department);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/', async (req, res) => {
  const { name } = req.body;
  try {
    const newDepartment = await modelDepartment.create(name);
    res.status(201).json(newDepartment);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/:id', async (req, res) => {
  const departmentID = req.params.id;
  const { name } = req.body;
  try {
    const updatedDepartment = await modelDepartment.update(departmentID, name);
    if (!updatedDepartment) {
      return res.status(404).json({ error: 'Department not found' });
    }
    res.status(200).json(updatedDepartment);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.delete('/:id', async (req, res) => {
  const departmentID = req.params.id;
  try {
    const deletedDepartment = await modelDepartment.delete(departmentID);
    if (!deletedDepartment) {
      return res.status(404).json({ error: 'Department not found' });
    }
    res.status(200).json("Delete OK");
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
