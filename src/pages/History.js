import React, {useEffect, useState} from 'react';

import './History.css';

import Navbar from '../component/Navbar';
import Loader from '../component/Loader'
import api from '../services/api';

import DELETE_ICON from '../assets/delete.png'

export default function History({ history} ) {
    const [tasks, setTasks] = useState([]);
    const [loader, setLoader] = useState(false)
    const [deleted, setDeleted] = useState(false)

    document.title = "History"

    useEffect(() => {
        async function getHistory() {
            setLoader(true)
            try {
                const response = await api.get('/history', {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                })
                setLoader(false)
                setTasks(response.data.tasks)
            } catch(e) {
                setLoader(false)
                console.log(e)
            }
        }
        getHistory();
    },[history, deleted]);

    const deleteAll = async () => {
        if (window.confirm("Are you sure you wanto to clean your history?")) {
           try {
                await api.delete("/deleteHistory", {
                    headers : {
                        Authorization: localStorage.getItem('token')
                    }
                })
                setDeleted(deleted => !deleted)
           } catch(e) { 
                console.log(e)
           }
        } 
    }

    return (
       <div className='historyContainer'>
            <Navbar history={history} />
            <Loader show={loader} />
            <h2 className='text-center'>Tasks that have already been completed</h2>
            <h1 className='delete text-center'><img onClick={deleteAll} className='deleteButton' src={DELETE_ICON} alt='delete icon' /> </h1>
            <div className='tasks-history'>
                {tasks.map(task => (
                    <div key={task.id_task} className='task-history'>
                        <h3>{task.title}</h3>
                        <span>{task.description}</span>
                        <h5>Pomdoros realizados: {task.pomodoros_total}</h5>
                    </div>
                ))}
                
                
            </div>
        </div>
    )
}