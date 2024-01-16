import { useState, useEffect } from 'react';
import './App.css';
import item from "./Listitem";

function App() {
  const [showList, setShowList] = useState(false);
  const [selectedItem, setSelectedItem] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const remainingItems = item.filter((item) => !selectedItem.includes(item));
  var count = 0;

  const filteredItems = remainingItems.filter(      
    (item) =>
      item.name.toLowerCase().includes(inputValue.toLowerCase())
  );
  const handleInputClick = () => {
    setShowList(!showList);
  }
  const handleItemClick = (item) => {
    setSelectedItem([...selectedItem, item]);
    setInputValue('');
  }
  const removeItem = (index) => {
    const updatedSelectedItems = [...selectedItem];
    updatedSelectedItems.splice(index, 1);
    setSelectedItem(updatedSelectedItems);
  };
  const searchInList = (e) => {
    setInputValue(e.target.value);
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Backspace' && inputValue == '') {
      count++;
    }
    if (count == 1) {
      const lastSelectedItem = document.querySelector('.chips .chip:last-child');
      if (lastSelectedItem) {
        lastSelectedItem.classList.add('highlight');
      }
    }
    if (count == 2) {
      removeItem(selectedItem.length - 1);
    }
  };
  useEffect(() => {
    return () => {
      const highlightedItem = document.querySelector('.chips .highlight');
      if (highlightedItem) {
        highlightedItem.classList.remove('highlight');
      }
    };
  }, []);
  return (
    <div className="App">
      <h1>Pick User</h1>
      <div className='chip-input'>
        <ul className='chips'>
          {selectedItem.map((item, index) => (
            <li key={index} className='chip' onClick={() => removeItem(index)}>
              <img src={item.image} />
              <span className='chip-title'>{item.name}</span>
              <i className='close'>x</i>
            </li>
          ))}
        </ul>
        <input
          value={inputValue}
          type="text"
          placeholder="Add new user.."
          onClick={handleInputClick}
          onChange={searchInList}
          onKeyDown={handleKeyDown}
          onBlur={e => e.target.focus()}>
        </input>
        {showList && (
          <ul className='listArea'>
            {filteredItems.length > 0 ? (
              filteredItems.map((item, index) => (
                <li key={index} className="listofItems" onClick={() => handleItemClick(item)}>
                  <img src={item.image} />
                  <h3>{item.name}</h3>
                  <h5>{item.mail}</h5>
                </li>
              ))) : (<li>Nothing Left</li>)}
          </ul>
        )
        }
      </div>
    </div>
  );
}

export default App;
