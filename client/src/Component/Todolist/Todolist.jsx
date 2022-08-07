import react, {useState, useEffect} from 'react';
import './style.css'


export default function Todolist() {
  const [inputValue, setInputValue] = useState('')
  const [listItem, setListItem] = useState(['demo item', 'do some good sutff', 'buy some groceries', 'dont do chores'])
  const [errorMessage, setErrorMessage] = useState()
  const [editingRowId, seteditingRowId] = useState('')

  const handleInput = (event) => {
    setInputValue(event.target.value)
  }

  const handleSubmit = (event) => {
    let newListItem = []
    if (inputValue !== ''){
      newListItem = listItem.concat(inputValue)
      setListItem(newListItem)
      setInputValue('')
    } else {
      setErrorMessage('you have not type anything!!')
    }
  }

  const handleInputClick = (event) => {
    if (errorMessage) {
      setErrorMessage()
    }
  }
// console.log(listItem)

  const handleDelete = (i) => (event) => {
    let newListItem = JSON.parse(JSON.stringify(listItem))
    
    newListItem.splice(i, 1)

    setListItem(newListItem)
  }

  const handleEdit = (i) => (event) => {
    setInputValue(listItem[i])
    seteditingRowId(i)
  }

  const handleChange = (event) => {
    let newListItem = JSON.parse(JSON.stringify(listItem))
    
    newListItem[editingRowId] = inputValue
    setListItem(newListItem)

    seteditingRowId('')
    setInputValue('')
  }

  const handleCancel = (event) => {
    seteditingRowId('')
    setInputValue('')
  }

  return (
    <>
      <div className="container">
        <p className='divider'>✿.｡.:* ☆:**:. .:**:.☆*.:｡.✿</p>
        <div className="form">
          
          <div style={{whiteSpace: 'nowrap'}}>
            {/* <label style={{ marginRight: '10px'}}>To Do:</label> */}
            <input type="text" placeholder="to do list" value={inputValue} onChange={handleInput} onClick={handleInputClick} />
            {editingRowId === ''
              ? <button onClick={handleSubmit} style={{marginLeft: '10px'}}>+</button>
              : (
                <>
                <button onClick={handleChange}>Change</button>
                <button onClick={handleCancel}>Cancel</button>
                </>
              )
            }
          </div>
          <p className="error-message" >{errorMessage}</p>
        </div>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                {/* <th style={{whiteSpace: 'nowrap'}}>✿.｡.:* ☆:**:. 𝙨𝙩𝙪𝙛𝙛 .:**:.☆*.:｡.✿</th> */}
                {/* <th className="action">action</th> */}
              </tr>
            </thead>
            <tbody>
              {listItem.map((item, i) =>
                <tr key={`stuff-row-${i}`}>
                  <td key={`stuff-${i}`} className="stuff">{item}</td>
                  <td key={`stuff-action-${i}`} className="action">
                    <button onClick={handleDelete(i)}>delete</button>
                    <button onClick={handleEdit(i)}>edit</button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <p className='divider'>✿.｡.:* ☆:**:. .:**:.☆*.:｡.✿</p>
        
      </div>
    </>
  )
}