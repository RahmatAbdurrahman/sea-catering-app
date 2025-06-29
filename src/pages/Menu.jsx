import React from 'react';

// Data sampel untuk paket makanan
const mealPlans = [
  { id: 1, name: 'Diet Plan', price: 30000, description: 'Paket rendah kalori untuk Anda yang sedang menjaga berat badan.', image: 'https://via.placeholder.com/300x200?text=Diet+Plan' },
  { id: 2, name: 'Protein Plan', price: 40000, description: 'Tinggi protein untuk mendukung program pembentukan otot Anda.', image: 'https://via.placeholder.com/300x200?text=Protein+Plan' },
  { id: 3, name: 'Royal Plan', price: 60000, description: 'Paket premium dengan bahan-bahan pilihan terbaik untuk pengalaman kuliner istimewa.', image: 'https://via.placeholder.com/300x200?text=Royal+Plan' }
];

const Menu = () => {
  // State dan fungsi untuk modal akan ditambahkan di sini
  
  return (
    <div className="container" style={{ textAlign: 'center' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '3rem' }}>Our Meal Plans</h1>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
        {mealPlans.map(plan => (
          <div key={plan.id} className="meal-card" style={{ border: '1px solid #ddd', borderRadius: '10px', padding: '1.5rem', maxWidth: '320px', background: 'rgba(255,255,255,0.2)' }}>
            <img src={plan.image} alt={plan.name} style={{ width: '100%', borderRadius: '5px' }} />
            <h3 style={{ fontSize: '1.5rem', margin: '1rem 0' }}>{plan.name}</h3>
            <p style={{ fontWeight: 'bold', color: 'var(--accent-end)' }}>Rp{plan.price.toLocaleString('id-ID')} / meal</p>
            <p style={{ margin: '1rem 0' }}>{plan.description}</p>
            <button className="btn order-now">See More Details</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;