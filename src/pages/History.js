import React, {useEffect, useState} from 'react';

import './History.css';

import Navbar from '../component/Navbar';
import Loader from '../component/Loader'
import api from '../services/api';

export default function History({ history} ) {
    const [tasks, setTasks] = useState([]);
    const [loader, setLoader] = useState(false)

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
    },[history]);

    return (
       <div className='historyContainer'>
            <Navbar history={history} />
            <Loader show={loader} />
            <h2 className='text-center'>Tasks that have already been completed</h2>
            
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