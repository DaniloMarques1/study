import React, { useState } from 'react'

import $ from 'jquery'

import './AddTaskModal.css'

import api from '../services/api'
import Loader from '../component/Loader'

function AddTaskModal({ loadTasks }) {
    
    const [title, setTitle] = useState('')
    const [pomodoros, setPomodoros] = useState('')
    const [description, setDescription] = useState('')
    const [loader, setLoader] = useState(false)

    async function handleAddTask(e) {
        e.preventDefault()
        $('#addTask').modal('hide')
        setLoader(true)
        try{
            const responseUser = await api.get('/user', {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            });
            const user = responseUser.data
            await api.post('/addTask', {
                title,
                description,
                pomodoro_total: pomodoros,
                id_user: user.id_user,
            }, {
                headers : {
                    Authorization : localStorage.getItem('token')
                }
            })
            setLoader(false)
            loadTasks()
            setDescription("")
            setPomodoros("")
            setTitle("")
        } catch(e){
            setLoader(false)
        }
    }

    return(
        <div>
            <Loader show={loader} />
            <div className="modal fade" id="addTask" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5>Add a task</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleAddTask}> 
                                <div className='form-group'>
                                    <label>Task title</label>
                                    <input autoFocus value={title} onChange={(e) => setTitle(e.target.value)} className='form-control' required type='text' placeholder='Title for your task' />
                                </div>
                                <div className='form-group'>
                                    <label>Pomodoros</label>
                                    <input value={pomodoros} onChange={(e) => setPomodoros(e.target.value)} className='form-control' required type='number' placeholder='pomodoros' />
                                </div>
                                <div className='form-group'>
                                    <label>Task description</label>
                                    <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='form-control' placeholder='a description'></textarea>
                                </div>
                                <button type='submit' className='btn btn-success'>Add Task</button>
                            </form>
                        </div>
                    
                    </div>
                </div>
            </div>
        </div>

    );
}

export default AddTaskModal