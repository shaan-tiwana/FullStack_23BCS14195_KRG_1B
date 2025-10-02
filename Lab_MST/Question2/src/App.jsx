import { useState, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  
  const Name = useRef(null);
  const Email = useRef(null);
  const Course = useRef(null);
  const [students, setStudents] = useState([]);

        function addEntry(){
          const studentName = Name.current.value.trim();
          const studentEmail = Email.current.value.trim();
          const studentCourse = Course.current.value.trim();
          
          
          if (!studentName || !studentEmail || !studentCourse) {
            alert('Please fill out all fields before submitting.');
            return; 
          }

          const newStudent = { name: studentName, email: studentEmail, course: studentCourse };
          setStudents(prevStudents => [...prevStudents, newStudent]);
          
          Name.current.value = '';
          Email.current.value = '';
          Course.current.value = '';
          
        }
  return (
    <>
      <div>
        <h1>Student Information Form</h1>

      </div>
      <h2> Enter the following information</h2>
      
      <div className = "userInput">
        <input type="text" id="Name" placeholder="Enter Your Name" ref={Name}></input>
        <input type="text" id="Email" placeholder='Enter Your Email' ref={Email}></input>
        <input type="text" id="Course" placeholder='Enter Your Course' ref={Course}></input>
        
        <button onClick={addEntry }>
          Submit
        </button>
      </div>
      <h2>Stored information:</h2>
      <div className="card">

        
        <table id='table'>
          <thead> 
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Course</th>
            </tr>
          </thead>
          <tbody id="data">
            {students.map((student, index) => (
              <tr key={index}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.course}</td>
              </tr>
            ))}
            
          </tbody>


        </table>
        
      </div>
    </>
  )
}

export default App
