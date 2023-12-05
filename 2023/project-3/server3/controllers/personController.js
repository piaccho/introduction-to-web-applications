const models = require("../database");

const personController = {
    createPerson: async (req, res, next) => {
        const { name, surname, job } = req.body;
        try {
            const newPerson = await models.PersonSchema.create({ name, surname, job });
            console.log(newPerson);
            res.status(201).json(newPerson);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    getAllPeople: async (req, res, next) => {
        try {
            const people = await models.PersonSchema.findAll();
            res.status(200).json(people);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    getPersonByID: async (req, res, next) => {
        const id = req.params.id;
        try {
            const person = await models.PersonSchema.findByPk(id);
            if (person) {
                res.status(200).json(person);
            } else {
                res.status(404).json({ message: 'Person not found' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

    updatePerson: async (req, res, next) => {

    },

    deletePerson: async (req, res, next) => {

    },
};

module.exports = personController

