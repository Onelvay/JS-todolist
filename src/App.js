import {useEffect, useState} from "react";
import "./App.css";
import axios from "axios";


/*
* Plan:
*   1. Define backend url
*   2. Get items and show them +
*   3. Toggle item done +
*   4. Handle item add +
*   5. Delete +
*   6. Filter
*
* */

function App() {
  const [itemToAdd, setItemToAdd] = useState("");
  const [items, setItems] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const HEADERS = {
    Authorization: `Bearer 00fb18df99e1c96389fa56694a21d96ea917df90`,
    'Content-Type': 'application/json'
  }
  const handleChangeItem = (event) => {
    setItemToAdd(event.target.value);
  };
  const example={
    Authorization: `Bearer 00fb18df99e1c96389fa56694a21d96ea917df90`

  }
  const death=`https://api.todoist.com/rest/v1/tasks`

  const handleAddItem = (title) => {
    axios.post(`https://api.todoist.com/rest/v1/tasks`,{
      content: title
    },{
      headers: HEADERS
    }).then((response) => {
        setItems([ ...items, response.data])
    })
    setItemToAdd("");
  };


  const toggleItemDone = ({ id, comleted}) => {
      axios.put(`${death}/${id}`,
      {
        comleted: !comleted
    },{
        headers:
        {Authorization: `Bearer 00fb18df99e1c96389fa56694a21d96ea917df90`
    }
      }).then((response) => {
          setItems(items.map((item) => {
              if (item.id === id) {
                  return {
                      ...item,
                      comleted: !comleted
                  }
              }
              return item
          }))

      })
  };

  // N => map => N
    // N => filter => 0...N
  const handleItemDelete = (id) => {
      axios.delete(`${death}/${id}`,{
      headers:{
        Authorization: `Bearer 00fb18df99e1c96389fa56694a21d96ea917df90`
      }
    }
      ).then((response) => {
          const newItems = items.filter((item) => {
              return id !== item.id
          })
          setItems(newItems)
      })
  };

  useEffect(() => {
      console.log(searchValue)
      axios.get(`https://api.todoist.com/rest/v1/tasks`,{
        headers:{
          Authorization: `Bearer 00fb18df99e1c96389fa56694a21d96ea917df90`
        }
      }).then((response) => {
          setItems(response.data);
          console.log(response.data);
      })
  }, [searchValue])



  return (
    <div className="todo-app">
    {/* App-header */}
    <div className="app-header d-flex">
      <h1>Todo List</h1>
    </div>

    <div className="top-panel d-flex">
      {/* Search-panel */}
      <input
        type="text"
        className="form-control search-input"
        placeholder="type to search"
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
      />
    </div>

    {/* List-group */}
    <ul className="list-group todo-list">
      {items.length > 0 ? (
        items.map((item) => (
          <li key={item.id} className="list-group-item">
            <span className={`todo-list-item${item.done ? " done" : ""}`}>
              <span
                className="todo-list-item-label"
                onClick={() => toggleItemDone(item)}
              >
                {item.content}
              </span>

              <button
                type="button"
                className="btn btn-outline-success btn-sm float-right"
              >
                <i className="fa fa-exclamation" />
              </button>

              <button
                type="button"
                className="btn btn-outline-danger btn-sm float-right"
                onClick={() => handleItemDelete(item.id)}
              >
                <i className="fa fa-trash-o" />
              </button>
            </span>
          </li>
        ))
      ) : (
        <div>No todos🤤</div>
      )}
    </ul>

    {/* Add form */}
    <div className="item-add-form d-flex">
      <input
        value={itemToAdd}
        type="text"
        className="form-control"
        placeholder="What needs to be done"
        onChange={handleChangeItem}
      />
      <button className="btn btn-outline-secondary" onClick={() => handleAddItem(itemToAdd)}>
        Add item
      </button>
    </div>
  </div>
);
}
{/* <button className="btn btn-outline-secondary" onClick={() => handleAddItem(itemToAdd)}>
Add item
</button> */}
export default App;
