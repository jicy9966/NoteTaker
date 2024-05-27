import React, { useState } from 'react';
import "./notes.scss"
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { editNote, getAllNotes } from './noteSlice'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer, toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const EditNoteForm = () =>
{
    let navigate = useNavigate()

    const { id } = useParams()
    const dispatch = useDispatch()
    const notes = useSelector(getAllNotes)

    let tempNote = notes.filter(note => note.noteId === id)

    const [ formData, setFormData ] = useState(tempNote[0])
    const [ titleError, setTitleError ] = useState(false)
    const [ contentError, setContentError ] = useState(false)
    const [ canSave, setCanSave ] = useState(false)

    const onFormDataChange = (event) =>
    {
        event.preventDefault()
        if (event.target.name === 'noteTitle')
        {
            if ( event.target.value.length === 0 )
            {
                setTitleError(true)
            }
            else
            {
                setTitleError(false)
                setCanSave(true);
            }
        }

        if (event.target.name === 'noteContent')
        {
            if ( event.target.value.length === 0 )
            {
                setContentError(true)
            }
            else
            {
                setContentError(false)
                setCanSave(true)
            }
        }

        setFormData(prevData => 
        {
            return {...prevData, [event.target.name]: event.target.value}
        })
    }

    const onSaveNoteClicked = () =>
    {
        if (!titleError && !contentError)   
        {   
            dispatch(editNote(formData))
            toast("Note edited successfully")   
        }
    }

    const doneBtn = () =>
    {
        navigate("/home")
    }

    return(
        <div>
            <section className='note-form-section'>
                <h2 className='my-4 fs-16'>{`Edit Note "${tempNote[0].noteTitle}"`}</h2>
                <form className='note-form'>
                    <div className='form-element'>
                        <label htmlFor='noteTitle' className='form-label'>Title:</label>
                        <input type='text' id='noteTitle' name='noteTitle' placeholder='Note title here ...'
                               onChange={onFormDataChange} className='form-control' value = {formData.noteTitle} />
                        <span className='form-error-text'>
                            {titleError ? "Title cannot be empty!" : ""}
                        </span>
                    </div>

                    <div className='form-element'>
                        <label htmlFor='noteContent' className='form-label'>Content:</label>
                        <textarea id='noteContent' name='noteContent' placeholder='Note content here ...'
                               onChange={onFormDataChange} className='form-control' rows="10" value={formData.noteContent} />
                        <span className='form-error-text'>
                            {contentError ? "Content cannot be empty!" : ""}
                        </span>
                    </div>

                    <button type="button" onClick={(onSaveNoteClicked)} className='btn btn-default' disabled={!canSave}>Save Note</button>

                    <button type="button" onClick={(doneBtn)} className='btn btn-default mx-4'>Done</button>

                    <ToastContainer />
                </form>
            </section>
        </div>
    )
}

export default EditNoteForm