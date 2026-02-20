function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#111',
        color: '#fff',
        padding: '40px 20px',
        marginTop: 'auto'
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          gap: '20px'
        }}
      >
        
        <div style={{ flex: '1 1 250px' }}>
          <h3 style={{ marginBottom: '10px' }}>Foodie</h3>
          <p style={{ color: '#aaa', lineHeight: '1.6' }}>
            Best food in town. Fresh, tasty aur fast delivery.
          </p>
        </div>

        
        <div style={{ flex: '1 1 150px' }}>
          <h4>Quick Links</h4>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {['Home', 'Menu', 'About', 'Contact'].map((item) => (
              <li key={item} style={{ margin: '8px 0', color: '#aaa' }}>
                {item}
              </li>
            ))}
          </ul>
        </div>

       
        <div style={{ flex: '1 1 200px' }}>
          <h4>Contact</h4>
          <p style={{ color: '#aaa' }}>📍 Delhi, India</p>
          <p style={{ color: '#aaa' }}>📞 +91 9504939711</p>
          <p style={{ color: '#aaa' }}>✉️ support@gofood.com</p>
        </div>
      </div>

      
      <div
        style={{
          textAlign: 'center',
          marginTop: '30px',
          borderTop: '1px solid #333',
          paddingTop: '15px',
          color: '#777',
          fontSize: '14px'
        }}
      >
        © {new Date().getFullYear()} Developed by Mr.Abhitesh
      </div>
    </footer>
  );
}

export default Footer;
