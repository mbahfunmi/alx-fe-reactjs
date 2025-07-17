// src/components/Counter.jsx
import React, { useState } from 'react'; // 1. Import useState hook

// 2. Define a functional component named Counter
function Counter() {
  // 3. Initialize state using useState
  // 'count' is the current state value.
  // 'setCount' is the function to update the state.
  // 0 is the initial value of 'count'.
  const [count, setCount] = useState(0);

  // Function to handle incrementing the count
  const handleIncrement = () => {
    setCount(count + 1); // Update count by adding 1
  };

  // Function to handle decrementing the count
  const handleDecrement = () => {
    setCount(count - 1); // Update count by subtracting 1
  };

  // Function to handle resetting the count
  const handleReset = () => {
    setCount(0); // Set count back to 0
  };

  return (
    <div style={{
      border: '1px solid #ccc',
      padding: '20px',
      margin: '20px auto', // Center the component horizontally
      maxWidth: '400px',
      borderRadius: '10px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      textAlign: 'center',
      backgroundColor: '#fefefe'
    }}>
      {/* 4. Display the Current Count */}
      <p style={{ fontSize: '2em', fontWeight: 'bold', color: '#333' }}>Current Count: {count}</p>

      {/* 5. Create Buttons for Counter Actions */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
        <button
          onClick={handleIncrement}
          style={{
            padding: '10px 20px',
            fontSize: '1em',
            backgroundColor: '#4CAF50', // Green
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#45a049'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#4CAF50'}
        >
          Increment
        </button>
        <button
          onClick={handleDecrement}
          style={{
            padding: '10px 20px',
            fontSize: '1em',
            backgroundColor: '#f44336', // Red
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#da190b'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f44336'}
        >
          Decrement
        </button>
        <button
          onClick={handleReset}
          style={{
            padding: '10px 20px',
            fontSize: '1em',
            backgroundColor: '#008CBA', // Blue
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#007bb5'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#008CBA'}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Counter;