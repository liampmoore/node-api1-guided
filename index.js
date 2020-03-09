const express = require('express');
const shortid = require('shortid');
const server = express();

let lessons = [];

server.use(express.json()); //middleware

server.get('/api/lessons', (req, res) => {
    res.status(200).json({
        lessons: lessons
    })
})

server.get('/api/lesson/:id', (req, res) => {
    let id = req.params.id*1;
    let lesson = lessons.find(item => item.lessonId === id);

    res.status(200).json(lesson)
})

server.post('/api/lessons', (req, res) => {
    const lesson = {...req.body, id: shortid.generate()};
    lessons.push(lesson);
    res.status(201).json(lesson)
})

server.delete('/api/deletelesson/:id', (req, res) => {
    let id = req.params.id*1;
    const lesson = lessons.find(item => item.lessonId === id);
    lessons = lessons.filter(item => item.lessonId !== id)
    res.status(200).json({
        message: `Successfully deleted lesson with id ${id}`,
        deletedLesson: lesson
    })
})

server.put('/api/updatelesson/:id', (req, res) => {
    let id = req.params.id*1;
    lessons = lessons.map(item => {
        if (item.lessonId === id) {
            return {
                ...item,
                ...req.body
            }
        }
        else return item
    })
    const lesson = lessons.find(item => item.lessonId === id);
    res.status(200).json({
        message: `Successfully updated lesson with id ${id}`,
        updatedLesson: lesson
    })
})

const PORT = 5000;
server.listen(PORT, () => {
console.log(`\n ** API running on http://localhost:${PORT} **\n`);

}

);
//To run the server use node index.js