import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {TagsInput} from 'react-tag-input-component'
import { selectUser } from '../../features/userSlice';
import './Question.css'
import axios from 'axios';


const Question = () => {

const user = useSelector(selectUser)    
const [loading, setLoading] = useState(false);
const [title , setTitle] = React.useState("")
const [body,setBody] = React.useState("")
const [tags,setTags] = React.useState([])

const history = useHistory();

const handleQuill = (value) => {
    setBody(value);
}

const handleSubmit = async (e) => {
    e.preventDefault()

    if(title !== "" && body !== ""){
        setLoading(true);
        const bodyJSON = {
            title: title,
            body : body,
            tag: JSON.stringify(tags),
            user:user
        }

        await axios.post('/api/question', bodyJSON).then((res) => {
            alert('Question added successfully')
            setLoading(false)
            history.push('/')
        }).catch((err) => {
            console.log(err);
        })
    }
}

  return (
    <div className='add-question'>
        <div className='add-question-container'>
            <div className='head-title'>
                <h1>Ask a public question</h1>
            </div>
            <div className='question-container'>
                <div className='question-options'>
                    <div className='question-option'>
                        <div className='title'>
                            <h3>Title</h3>
                            <small>Ask specific question</small>
                        <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder='Add a question title' />
                        </div>
                    </div>
                    <div className='question-option'>
                    <div className='title'>
                            <h3>Body</h3>
                            <small>Give breif description about the problem.</small>
                       <ReactQuill value={body} onChange={handleQuill} className='react-quill' theme='snow'/>
                        </div>
                    </div>
                    <div className='question-option'>
                    <div className='title'>
                            <h3>Tags</h3>
                            <small>Add Tags</small>
                      <TagsInput value={tags} name='tags' onChange={setTags} placeHolder='press enter to add a new tag'/>
                        </div>
                    </div>
                </div>
            </div>
            <button disabled={loading} type='submit' onClick={handleSubmit}   className='button'> {loading ? 'Adding Question':'Add your question'}</button>
        </div>
    </div>
  )
}

export default Question