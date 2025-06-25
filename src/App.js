import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [formdata,setformdata]=useState({username:'',Email:'',feedbacktext:'',rating:0})
  const [feedbackdata,setfeedbackdata]=useState([])
  const [search,setsearch]=useState("")
  const [sortOrder, setSortOrder] = useState('desc');

  const filterdata=feedbackdata.filter((item)=>{
     const searchedtext=search.toLowerCase()
    return(
    item.username.toLowerCase().includes(searchedtext) ||
    item.Email.toLowerCase().includes(searchedtext) ||
    (item.feedbacktext || '').toLowerCase().includes(searchedtext)
  );
  }).sort((a, b) => {
    return sortOrder === 'desc'
      ? new Date(b.timestamp) - new Date(a.timestamp) 
      : new Date(a.timestamp) - new Date(b.timestamp); 
  });

   const fetchfeedbacks=async ()=>{
    try{
    const res=await fetch('http://localhost:5000/add-data/feedback')
    const data=await res.json()
    setfeedbackdata(data.reverse())
    }catch(err){
      console.log(err)
    }
   
   }

   useEffect(()=>{
        fetchfeedbacks()
   },[])

  const submitForm=async (e)=>{
     e.preventDefault();
    console.log(formdata)
     const res=await fetch('http://localhost:5000/add-data/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formdata),
    });
    if(res.ok){
      alert("success")
      setformdata({username:'',Email:'',feedbacktext:''})
      fetchfeedbacks()
      
    }else{
      alert("Failed")
    }
  }

  return (
  <div className="container">
    <h1>User Feedback System</h1>
    <div className="main-content">
      <form onSubmit={submitForm}>
        <input
          type="text"
          placeholder="Name"
          value={formdata.username}
          onChange={(e) => setformdata({ ...formdata, username: e.target.value })}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={formdata.Email}
          onChange={(e) => setformdata({ ...formdata, Email: e.target.value })}
          required
        />

        <textarea
          placeholder="Write Your feedback Here ..."
          value={formdata.feedbacktext}
          onChange={(e) => setformdata({ ...formdata, feedbacktext: e.target.value })}
          required
        ></textarea>

        <label style={{ marginBottom: '3px', fontWeight: 'bold' }}>Your Rating:</label>
        <div style={{
          display: 'flex',
          gap: '5px',
          backgroundColor: '#f8f8f8',
          padding: '10px',
          borderRadius: '6px',
          marginBottom: '10px',
          alignItems: 'center',
          }}
>      {[1, 2, 3, 4, 5].map((star) => (<span key={star} style={{
        cursor: 'pointer',
        fontSize: '30px',
        color: star <= formdata.rating ? '#ffc107' : '#ccc',
        transition: 'transform 0.2s',
      }}
      onClick={() => setformdata({ ...formdata, rating: star })}
      onMouseEnter={(e) => (e.target.style.transform = 'scale(1.2)')}
      onMouseLeave={(e) => (e.target.style.transform = 'scale(1)')}
    >
      ★
      </span>
    ))}
    </div>
    <button type="submit">Submit Feedback</button>
      </form>

      <div className="feedback-list">
        <h2>Feedbacks Given By users</h2>

        <button onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')} style={{marginBottom:"10px"}}>
            Sort by Date: {sortOrder === 'desc' ? 'new feedback to oldfeedback' : 'Old feedback to new feedback'}
            </button>

         <input type="text" placeholder="Search by name, email, or feedback" 
         value={search} onChange={(e) => setsearch(e.target.value)} 
         style={{ padding: '8px', width: '90%', marginBottom: '10px' }}
         />
        <ul>
          {filterdata.map((item, index) => (
            <li key={index}>
              <strong>{item.feedbacktext}</strong><br />
              <small>username:{item.username}</small><br/>
              <small>{new Date(item.timestamp).toLocaleString()}</small>
              <div style={{ color: '#ffc107', fontSize: '25px' }}>
                {'★'.repeat(item.rating || 0)} 
                {'☆'.repeat(5 - (item.rating || 0))}
                </div>
                </li>
              ))}
          </ul>
      </div>
              </div>
              </div>
              );
            }

export default App;
