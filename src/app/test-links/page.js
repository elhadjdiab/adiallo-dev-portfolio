export default function TestLinksPage() {
  return (
    <div style={{ padding: '50px', background: '#0B0F14', minHeight: '100vh' }}>
      <h1 style={{ color: 'white', marginBottom: '30px' }}>Test des liens</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <a 
          href="/projects" 
          style={{ 
            padding: '15px 30px', 
            background: '#6366F1', 
            color: 'white', 
            textDecoration: 'none',
            borderRadius: '8px',
            display: 'inline-block',
            width: 'fit-content'
          }}
        >
          Lien simple vers /projects
        </a>
        
        <a 
          href="/contact" 
          style={{ 
            padding: '15px 30px', 
            background: '#6366F1', 
            color: 'white', 
            textDecoration: 'none',
            borderRadius: '8px',
            display: 'inline-block',
            width: 'fit-content'
          }}
        >
          Lien simple vers /contact
        </a>

        <a 
          href="https://github.com" 
          target="_blank"
          rel="noreferrer"
          style={{ 
            padding: '15px 30px', 
            background: '#6366F1', 
            color: 'white', 
            textDecoration: 'none',
            borderRadius: '8px',
            display: 'inline-block',
            width: 'fit-content'
          }}
        >
          Lien externe vers GitHub
        </a>
      </div>

      <p style={{ color: 'white', marginTop: '30px' }}>
        Si ces liens fonctionnent, le problème vient de la page d'accueil.
        <br />
        Si ces liens ne fonctionnent pas non plus, le problème est plus profond.
      </p>
    </div>
  );
}
