import React, {useState, useEffect} from 'react'
import { useHistory } from "react-router-dom";
import Invoice from "./CreateInvoice"

function CreateJob({currentJob, user, lastJob, setCurrentJob, setLastJob, setJobs, jobs}) {
const [jobData, setJobData] = useState("")
const history = useHistory()

    function createJobNumber(e) {
        e.preventDefault()
        if (jobs.length > 1) {
        const lastJob = jobs[jobs.length - 1]
        let updatedJob = lastJob.job_number + 1
        setCurrentJob(updatedJob)
        console.log(updatedJob)
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
            history.push('/createinvoice')
        })
        }
    }

    return (
  <div>
            <form>
            <input type="submit" value="Create a Job!" onClick={createJobNumber}></input>
                </form>
    </div>
    )
}

export default CreateJob
