import React, { useState, useEffect } from 'react'

import $ from 'jquery'

import PLAY_ICON from '../assets/play.png';
import PAUSE_ICON from '../assets/pause.png';
import RESET_ICON from '../assets/reset.png';
import DELETE_ICON from '../assets/delete.png';

import './TaskTimer.css'

import api from '../services/api'

const DEFAULT_TIMER = {minute: 25, second: 0}
const DEFAULT_BREAK = {minute: 5, second: 0}
const audio = new Audio('https://danilomarques1.github.io/time2study/audio/clock.mp3')

function Timer({ loadTasks, currentTask }) {
    
    const [timer, setTimer] = useState(DEFAULT_TIMER)
    const [breakTime, setBreakTime] = useState(false)
    const [buttonName, setButtonName] = useState("Start")
    const [task, setTask] = useState(currentTask)
    const [finished, setFinished] = useState(false)
    const [trigger, setTrigger] = useState(false)

    //carrega a props no estado (task)
    useEffect(() => {
        setTask(currentTask)
    }, [currentTask]);


    // verifica se a task foi finalizada e se nao esta ativa, envia uma requisição para fazer o update da task
    useEffect(() => {
        if (finished) {

            async function taskUpdate() {
                const update = await api.get(`/updateTask/${task.id_task}`, {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                });
                setTask(update.data)
                loadTasks()
                
            }
            if (task.active === true ) {
                taskUpdate()
            }
        }


    }, [finished])
    
    //só executa o setinterval caso o trigger == true
    useEffect(() => {
        //caso o botao (start) ainda nao tenha sido clicado
        if (trigger) {
            setButtonName(PAUSE_ICON)
            //caso nao chegue em 0 minutos e 0 segundos parar 
            if (!(timer.second === 0 && timer.minute === 0)) {

                const intervalId = setInterval(() => {
                    setTimer(prevState => ({ minute: prevState.second === 0 ? prevState.minute - 1 : prevState.minute, second: prevState.second > 0 ? prevState.second - 1 : 59 }))
                }, 100)
                return () => clearInterval(intervalId)
            } else {
                // audio temporario
                audio.play()
                
                //finalizei uma atividade/reseta o trigger e "inicia" o breaktime
                setFinished(finished => !finished)
                setTrigger(false)
                if (breakTime) {
                    setTimer(DEFAULT_TIMER)
                    if (task.active === false) {
                        //fecha o modal caso a atividade "atual" ja tenha sido finalizada
                        $('#taskTimer').modal('hide')
                    }
                   
                } else {
                    setTimer(DEFAULT_BREAK)
                }
                setBreakTime(breakTime => !breakTime)
            }
           
        } else {
            setButtonName(PLAY_ICON)
            
        }
        
    }, [trigger, timer, breakTime]);

    /**
    * reseta o temporizador, caso esteja no break time resetara para 5 minutos, caso contrario resetará para 25 minutos
    *
    */
    const resetTimer = () => {
        if (breakTime) {
            setTimer(DEFAULT_BREAK)
        } else {
            setTimer(DEFAULT_TIMER)
        } 
    }

    //muda o valor do trigger (pausa/play)
    const startTimer = () => {
        setTrigger(trigger => !trigger)
    }

    const deleteTask = async () => {
        if (window.confirm("Are you sure you want to delete the task? ")) {
            $("#taskTimer").modal('hide')
            try {
                await api.delete(`/deleteTask/${task.id_task}`, {
                    headers : {
                        Authorization: localStorage.getItem('token')
                    }
                })
                loadTasks()
            }
            catch(e) {
                console.log(e)
            }
        }
    }

    return (
        <div className="modal fade" id="taskTimer" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className='task-title'>
                        <button onClick={resetTimer} type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <h5 className='text-center'>{task.title}</h5>
                    </div>
                    <div className="modal-body">
                        <h1 className='text-center'>{String(timer.minute).padStart(2, '0')}:{String(timer.second).padStart(2, '0')}</h1>
                        <h3 className='text-center'>{task.current_pomodoros}/{task.pomodoros_total}</h3>
                        {task.description === undefined ? "" : (<p>{task.description}</p>) }
                        <div className='buttons'>
                            <button onClick={startTimer}><img className='buttonName' src={buttonName} alt='play/pause button' /> </button>
                            <button onClick={resetTimer}><img className='buttonName' src={RESET_ICON} alt="reset button"/></button>
                            <button onClick={deleteTask}><img className='deleteButton' src={DELETE_ICON} alt="delete button" /></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Timer