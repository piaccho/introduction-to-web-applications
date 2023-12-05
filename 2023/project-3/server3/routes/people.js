/**
 * @swagger
 * components:
 *   schemas:
 *     Person:
 *       type: object
 *       required:
 *         - name
 *         - surname
 *         - job
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the person
 *         name:
 *           type: string
 *           description: The name of the person
 *         surname:
 *           type: string
 *           description: The surname of the person
 *         job:
 *           type: string
 *           description: Person's job title
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the person was added
 *         updatedAt:
 *           type: string
 *           format: date
 *           description: The date the person was updated
 *       example:
 *         id: 1
 *         name: John
 *         surname: Doe
 *         job: IT
 *         createdAt: 2020-03-10T04:05:06.157Z
 */

/**
 * @swagger
 * tags:
 *   name: People
 *   description: The people managing API
 * /people:
 *   get:
 *     summary: Lists all people
 *     tags: [People]
 *     responses:
 *       200:
 *         description: The list of all people
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Person'
 *   post:
 *     summary: Create a new person
 *     tags: [People]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Person'
 *     responses:
 *       200:
 *         description: The created person.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Person'
 *       500:
 *         description: Some server error
 * /people/{id}:
 *   get:
 *     summary: Get person by id
 *     tags: [People]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The person id
 *     responses:
 *       200:
 *         description: The person response by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Person'
 *       404:
 *         description: The person was not found
 *   put:
 *    summary: Update the person by the id
 *    tags: [People]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The person id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Person'
 *    responses:
 *      200:
 *        description: The person was updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Person'
 *      404:
 *        description: The person was not found
 *      500:
 *        description: Some error happened
 *   delete:
 *     summary: Remove the person by id
 *     tags: [People]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The person id
 *
 *     responses:
 *       200:
 *         description: The person was deleted
 *       404:
 *         description: The person was not found
 */


var express = require('express');
var router = express.Router();
const controller = require('../controllers/personController');

/* GET home page. */
router.post('/', controller.createPerson);
router.get('/', controller.getAllPeople);
router.get('/:id', controller.getPersonByID);
router.put('/:id', controller.updatePerson);
router.delete('/id', controller.deletePerson);

module.exports = router;
