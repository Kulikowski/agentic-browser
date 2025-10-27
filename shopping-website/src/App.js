import React, { useState } from 'react';
import './App.css';
import jacket1 from './assets/jacket1.png';
import jacket2 from './assets/jacket2.png';
import jacket3 from './assets/jacket3.png';

const jackets = [
  {
    id: 1,
    name: 'Winter Jacket 1',
    imageUrl: jacket1,
    price: (Math.random() * 100).toFixed(2),
  },
  {
    id: 2,
    name: 'Winter Jacket 2',
    imageUrl: jacket2,
    price: (Math.random() * 100).toFixed(2),
  },
  {
    id: 3,
    name: 'Winter Jacket 3',
    imageUrl: jacket3,
    price: (Math.random() * 100).toFixed(2),
  },
];

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleBuyClick = (jacketId) => {
    window.parent.postMessage({ type: 'tool', payload: { toolName: 'buy-item', params: { item: `Winter Jacket: ${jacketId}`  }} }, '*');
  };

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? jackets.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === jackets.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const getJacketUrl = (index) => {
    return jackets[index].imageUrl;
  }

  const prevIndex = currentIndex === 0 ? jackets.length - 1 : currentIndex - 1;
  const nextIndex = currentIndex === jackets.length - 1 ? 0 : currentIndex + 1;

  return (
    <div className="App">
      <div className="carousel-container">
        <div className="carousel">
          <div className="carousel-side">
            <img src={getJacketUrl(prevIndex)} alt="Previous Jacket" className="carousel-image-mini" onClick={goToPrevious} />
          </div>
          <div className="carousel-main">
            <img src={getJacketUrl(currentIndex)} alt={jackets[currentIndex].name} className="carousel-image-main" />
            <h3>{jackets[currentIndex].name}</h3>
            <p>${jackets[currentIndex].price}</p>
            <button onClick={() => handleBuyClick(jackets[currentIndex].id)}>Buy</button>
          </div>
          <div className="carousel-side">
            <img src={getJacketUrl(nextIndex)} alt="Next Jacket" className="carousel-image-mini" onClick={goToNext} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
