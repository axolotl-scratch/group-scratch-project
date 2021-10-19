import { useState } from 'react'

const AddArtist = ({ onAdd }) => {
  const [artist, setArtist] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()

    if (!text) {
      alert('Please add a task')
      return
    }

    onAdd({ artist });

    setArtist('');
  }

  return (
    <form className='add-form' onSubmit={onSubmit}>
      <div className='form-control'>
        <label>Artist</label>
        <input
          type='text'
          placeholder='Add Artist'
          value={text}
          onChange={(e) => setArtist(e.target.value)}
        />
      </div>
      <input type='submit' value='Save Task' className='btn btn-block' />
    </form>
  )
}

export default AddArtist;