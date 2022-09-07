import { useState } from 'react'
import classes from './App.module.css';
import TextField from "@mui/material/TextField";
import Select from 'react-select'
import Button from '@mui/material/Button';
// import { useNavigate } from 'react-router-dom'


//function for getting current date
function getCurrentDate(separator = '') {

  let newDate = new Date()
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  return `${date}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${year}`
}

function App() {

  interface Job {
    id: string;
    status: string;
    creation_date: string;
    customer_name: string;
    customer_phone: string;
    comments: string;
  }

  //creating instance of Job interface
  let job = {} as Job;



  //options for drop-down
  const options = [
    { value: 'Scheduled', label: 'Scheduled' },
    { value: 'Active', label: 'Active' },
    { value: 'Invoicing', label: 'Invoicing' },
    { value: 'To Priced', label: 'To Priced' },
    { value: 'Completed', label: 'Completed' }
  ]

  const customStyles = {
    control: (base: any, state: any) => ({
      ...base,
      background: "#FFFFFF",
      backgroundColor: "#FFFFFF",
    }),
    menu: (base: any) => ({
      ...base,
      background: "#FFFFFF",
      backgroundColor: "#FFFFFF",
      borderRadius: 0,
      marginTop: 0,
      zIndex: 9999
    }),
    menuList: (base: any) => ({
      ...base,
      background: "#FFFFFF",
      backgroundColor: "#FFFFFF",
      padding: 0
    })
  };

  // const navigate = useNavigate();
  const [status, setStatus] = useState('');
  const [customer_name, setName] = useState('');
  const [customer_phone, setPhone] = useState('');
  const [comments, setComments] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault()

    //creating random number
    var random_number = Math.round(1 + Math.random() * (50 - 1));
    let id = random_number

    if (status && customer_name && customer_phone && comments) {
      console.log(id, status, todays_date, customer_name, customer_phone, comments)
      alert('Job Logged')
      setName('')
      setPhone('')
      setComments('')

      fetch('http://localhost:3001/jobs', {
        method: 'POST',
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({ id, status, todays_date, customer_name, customer_phone, comments})
      })

    }
  }
 
  var todays_date = getCurrentDate("-");




  return (
    <section className={classes.background}>

    
    <div className={classes.submit}>
      <h1>Please Enter Job Details</h1>


      <div>
        {/* <h3>Job ID: {random_number}</h3> */}
        <h3>Date: {todays_date}</h3>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Select 
          styles={customStyles}
          options={options} 
          onChange={(e: any) => setStatus(e.value)}
          placeholder="Please Select Job Status..."
          />
        </div>

        <div>
          <TextField
            value={customer_name}
            onChange = {(e: any) => {setName(e.target.value);}}
            id="customer-name"
            className="text"
            label="Enter Customer Name.."
            variant="outlined"
            placeholder="Customer Name..."
            size="small"
            margin="normal"
          />
        </div>

        <div>
          <TextField
            value={customer_phone}
            onChange = {(e: any) => {setPhone(e.target.value);}}
            id="customer-phone"
            className="text"
            label="Enter Customer Phone..."
            variant="outlined"
            placeholder="Customer Phone..."
            size="small"
            margin="normal"
          />
        </div>

        <div>
          <TextField
            value={comments}
            onChange = {(e: any) => {setComments(e.target.value);}}
            id="comments"
            className="text"
            label="Any Comments..."
            variant="outlined"
            placeholder="Comments..."
            size="small"
            margin="normal"
            multiline
            rows={3}
          />
        </div>

        <Button type="submit" size="large" variant="contained" onClick={(e) => {handleSubmit(e)} }>Submit Job</Button>

      </div>
    </div>
    </section>
  );
}

export default App;
