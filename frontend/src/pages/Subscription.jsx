import React, { useState, useEffect } from 'react';

const planOptions = {
  'Diet Plan': 30000,
  'Protein Plan': 40000,
  'Royal Plan': 60000,
};

const mealTypeOptions = ['Breakfast', 'Lunch', 'Dinner'];
const deliveryDayOptions = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const Subscription = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    plan: 'Diet Plan',
    mealTypes: [],
    deliveryDays: [],
    allergies: '',
  });

  const [totalPrice, setTotalPrice] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e, field) => {
    const { value, checked } = e.target;
    setFormData(prev => {
      const currentValues = prev[field];
      if (checked) {
        return { ...prev, [field]: [...currentValues, value] };
      } else {
        return { ...prev, [field]: currentValues.filter(item => item !== value) };
      }
    });
  };

  useEffect(() => {
    const { plan, mealTypes, deliveryDays } = formData;
    const planPrice = planOptions[plan] || 0;
    const numMealTypes = mealTypes.length;
    const numDeliveryDays = deliveryDays.length;

    if (numMealTypes > 0 && numDeliveryDays > 0) {
      const price = planPrice * numMealTypes * numDeliveryDays * 4.3;
      setTotalPrice(price);
    } else {
      setTotalPrice(0);
    }
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logika untuk mengirim data ke backend akan ditambahkan di sini
    console.log('Submitting Data:', formData);
    alert(`Subscription Submitted! Total Price: Rp ${totalPrice.toLocaleString('id-ID')}`);
  };

  return (
    <div className="container">
      <h1 style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '2rem' }}>Subscribe to a Meal Plan</h1>
      <form onSubmit={handleSubmit} style={{ maxWidth: '700px', margin: '0 auto', background: 'rgba(255,255,255,0.1)', padding: '2rem', borderRadius: '10px' }}>
        
        {/* Name and Phone */}
        <label>Full Name*</label>
        <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} required />
        
        <label>Active Phone Number*</label>
        <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} required />

        {/* Plan Selection */}
        <label>Plan Selection*</label>
        <select name="plan" value={formData.plan} onChange={handleInputChange}>
          {Object.keys(planOptions).map(p => <option key={p} value={p}>{p} - Rp {planOptions[p].toLocaleString('id-ID')}</option>)}
        </select>
        
        {/* Meal Type */}
        <label>Meal Type* (select at least one)</label>
        <div>{mealTypeOptions.map(type => (
          <div key={type}><input type="checkbox" value={type} onChange={(e) => handleCheckboxChange(e, 'mealTypes')} /> {type}</div>
        ))}</div>

        {/* Delivery Days */}
        <label>Delivery Days* (select at least one)</label>
        <div>{deliveryDayOptions.map(day => (
          <div key={day}><input type="checkbox" value={day} onChange={(e) => handleCheckboxChange(e, 'deliveryDays')} /> {day}</div>
        ))}</div>

        {/* Allergies */}
        <label>Allergies (optional)</label>
        <textarea name="allergies" value={formData.allergies} onChange={handleInputChange}></textarea>

        {/* Total Price */}
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '2rem 0', textAlign: 'center' }}>
          Total Monthly Price: <span style={{ color: 'var(--accent-end)' }}>Rp {totalPrice.toLocaleString('id-ID')}</span>
        </div>

        <button type="submit" className="btn order-now" style={{ width: '100%' }}>Subscribe Now</button>
      </form>
    </div>
  );
};

export default Subscription;