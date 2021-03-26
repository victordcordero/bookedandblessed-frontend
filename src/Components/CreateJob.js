import React, {useState, useEffect} from 'react'
import { useHistory } from "react-router-dom";
import CreateInvoice from "./CreateInvoice"

function CreateJob({currentJob, user, lastJob, setCurrentJob, setLastJob, jobs}) {
const history = useHistory()
console.log(jobs)

    function createJobNumber(e) {
        e.preventDefault()
        if (jobs.length > 1) {
        const lastJob = jobs[jobs.length - 1]
        let updatedJob = lastJob.job_number + 1
        setCurrentJob(updatedJob)
        
        fetch(`http://localhost:3000/jobs`, {
            method: "POST",
            headers: {
                "Content-Type" : 'application/json'
            },
            body: JSON.stringify({job_number: updatedJob, user_id: user.id})
        })
        .then(response => response.json())
        .then(data => {
            setLastJob(data)
            console.log(data)
            history.push('/createinvoice')
        })
        }
    }
    return (
  <div>
            <input type="submit" value="Create a Job!" onClick={createJobNumber}></input>  
    </div>
    )
}

export default CreateJob
