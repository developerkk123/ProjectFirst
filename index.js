const express = require("express")
const users = require("./MOCK_DATA.json");
const fs = require('fs')
const app = express();
const PORT = 8000;
//middleware to accept post data
app.use(express.urlencoded());
//route 
app.get('/api/users', (req, res)=>{
    return res.json(users);
})

// app.route('/users/:id')
// .get('/users', (req, res)=>{
//     const html =`
//     <ul>
//     ${users.map((user) => `<li>${user}</li>`).join("")}
//     </ul>
//     `;
//     return res.send(html);
// })
// .put((req, res)=>{
//     return req.json({status: 'pending task' })
// })
// .patch((req, res)=>{
//     req.json({status: 'pending task' })
// })
// .delete((req, res)=>{
//     req.json({status: 'pending task' })
// })
// :id -> variable
app.get('/users/:id', (req, res)=>{
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id)
    return res.json(user);
})
// post to create use
app.post('/api/users', (req, res)=>{
    const body = req.body;
    users.push({id: users.length+1, ...body});
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data)=>{
       // console.log("body :", body)
        return res.json({status: 'user added' })
    })
})
app.listen(PORT, ()=> console.log(`Server started at Port : ${PORT}`))