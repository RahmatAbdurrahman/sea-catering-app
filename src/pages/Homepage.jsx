import React from 'react';

const Homepage = () => {
  return (
    <div className="container">
      {/* Hero Section */}
      <header style={{ textAlign: 'center', padding: '4rem 0' }}>
        <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>SEA Catering</h1>
        <p style={{ fontSize: '1.5rem', color: 'var(--accent-end)' }}>
          "Healthy Meals, Anytime, Anywhere"
        </p>
        <p style={{ maxWidth: '600px', margin: '1rem auto' }}>
          [cite_start]Selamat datang di SEA Catering! Kami menyediakan layanan makanan sehat yang dapat disesuaikan dan diantar ke seluruh penjuru Indonesia. [cite: 18]
        </p>
        <div>
          <button className="btn order-now" style={{ marginRight: '1rem' }}>Pesan Sekarang</button>
          <button className="btn outline-menu">Lihat Menu</button>
        </div>
      </header>

      {/* Features Section */}
      <section style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Layanan Unggulan Kami</h2>
        <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '2rem' }}>
          <div className="feature-card" style={{ maxWidth: '300px' }}>
            <h3 style={{ fontSize: '1.5rem' }}>Kustomisasi Makanan</h3>
            [cite_start]<p>Pilih dan sesuaikan menu sesuai selera dan kebutuhan nutrisi Anda. [cite: 19]</p>
          </div>
          <div className="feature-card" style={{ maxWidth: '300px' }}>
            <h3 style={{ fontSize: '1.5rem' }}>Pengiriman ke Kota Besar</h3>
            [cite_start]<p>Kami menjangkau kota-kota besar di seluruh Indonesia untuk kemudahan Anda. [cite: 19]</p>
          </div>
          <div className="feature-card" style={{ maxWidth: '300px' }}>
            <h3 style={{ fontSize: '1.5rem' }}>Informasi Nutrisi Detail</h3>
            [cite_start]<p>Dapatkan rincian kalori dan nutrisi dari setiap makanan yang Anda pesan. [cite: 19]</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <footer style={{ textAlign: 'center', padding: '4rem 0', marginTop: '2rem', borderTop: '1px solid #ddd' }}>
        <h3 style={{ fontSize: '2rem' }}>Hubungi Kami</h3>
        [cite_start]<p>Manajer: Brian [cite: 20]</p>
        [cite_start]<p>Telepon: 08123456789 [cite: 20]</p>
      </footer>
    </div>
  );
};

export default Homepage;