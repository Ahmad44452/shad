const express = require('express');
const { spawn } = require('child_process');
const app = express();
const port = 3001;
const cors = require('cors');

var corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));
app.use(express.json());



app.get('/:age/:estimatedSalary', (req, res) => {

  try {
    var dataToSend;
    // spawn new child process to call the python script
    const python = spawn('python', ['server/predictor.py', req.params.age, req.params.estimatedSalary]);
    // collect data from script
    python.stdout.on('data', function (data) {
      console.log('Pipe data from python script ...');
      dataToSend = data.toString();
    });
    // in close event we are sure that stream from child process is closed
    python.on('close', (code) => {
      console.log(`child process close all stdio with code ${code}`);
      res.status(200).json(dataToSend)
    });


  } catch (err) {
    console.log(err)
  }

})

app.listen(port, () => console.log(`App listening on port ${port}!`))