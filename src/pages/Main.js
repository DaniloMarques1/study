import React, { useState, useEffect } from 'react'

import './Main.css'

import Navbar from '../component/Navbar';
import AddTaskModal from '../component/AddTaskModal';
import Timer from '../component/TaskTimer';
import Loader from '../component/Loader'

import api from '../services/api'


function Main({history}) {

    const [tasks, setTasks] = useState([])
    // task espeficica que deseja iniciar o cronometro (timer)
    const [task, setTask] = useState({})
    const [loader, setLoader] = useState(false)
    document.title = "Time2Study"

    //carregar as tarefas sempre que o usuario e quando o usuario adicionar uma nova tarefa
    async function loadTasks() {
        try {
            setLoader(true)
            const tasks = await api.get('/tasks', {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            });
            setLoader(false)
            setTasks(tasks.data)
        } catch (e) {
            setLoader(false)
            console.log(e)
        }
    }

    useEffect(() => {
        //verificando se o token existe e se é um token válido
        async function controlAccess() {
            try {
                if (localStorage.getItem('token')) {
                    await api.get('/user', {
                        headers: {
                            Authorization: localStorage.getItem('token')
                        }
                    });
                } else {
                    throw new Error("user does not have a token")
                }
            } catch (e) {
                history.push(`/login`)
            }
        }
        controlAccess()
        loadTasks()
        
    }, [history]);


    return (
        <div>
            <Navbar history={history} />
            <Loader show={loader} />
            <div className='containerTasks'>
                <div className='tasks'>
                    <ul>
                        {tasks.map(task => (
                            <li key={task.id_task}>
                                {task.title} 
                                <button className='btn-start' data-toggle='modal' onClick={() => setTask(task)} data-target='#taskTimer' data-backdrop="static" data-keyboard="false" >start</button>
                            </li>)
                        )}
                    </ul>
                </div>
                <div className='add-task'>
                    <span data-toggle='modal' data-target='#addTask' className='btn-add-task'>+</span>
                </div>
            </div>
            <AddTaskModal loadTasks={loadTasks} />
            <Timer loadTasks={loadTasks} currentTask={task} />
                
        </div>
       
    );
}

export default Main