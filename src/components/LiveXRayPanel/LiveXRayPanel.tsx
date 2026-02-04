import React from 'react';
import styles from './LiveXRayPanel.module.css';

interface LiveXRayPanelProps {
  targetId: string;
  inputValue: string;
  position: { x: number; y: number };
}

const LiveXRayPanel: React.FC<LiveXRayPanelProps> = ({ targetId, inputValue, position }) => {
  if (targetId !== 'search_input') return null;

  return (
    <div 
      className={styles.panel}
      style={{
        top: `${position.y + 10}px`,
        left: `${position.x}px`,
      }}
    >
      <div className={styles.header}>
        <span className={styles.title}>Header.tsx</span>
      </div>

      <pre className={styles.code}>
        <code>
          {`const [searchQuery, setSearchQuery] = useState('');

const handleSearchChange = (e) => {
  const value = e.target.value;
  setSearchQuery(value);
};

const handleSearch = () => {
  if (searchQuery.trim()) {
    router.push('/search'`}
          {'?'}
          {`q=' + encodeURIComponent(searchQuery));
  }
};

return (
  <input 
    type="text" 
    value={`}
          <span className={styles.highlight}>{inputValue ? `"${inputValue}"` : 'searchQuery'}</span>
          {`}
    onChange={handleSearchChange}
    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
  />
);`}
        </code>
      </pre>

      {inputValue && (
        <>
          <div className={styles.divider}>↓</div>
          
          <div className={styles.header}>
            <span className={styles.title}>search.tsx (Server-Side)</span>
          </div>

          <pre className={styles.codeHighlight}>
            <code>{`export async function getServerSideProps(context) {
  const query = context.query.q || '';
  
  let results = [];
  
  if (query) {
    const searchLower = `}<span className={styles.valueHighlight}>{`"${inputValue}"`}</span>{`.toLowerCase();
    results = products.filter(product => 
      product.title.toLowerCase().includes(searchLower)
    );
  }
  
  return { props: { query, results } };
}`}</code>
          </pre>
        </>
      )}
    </div>
  );
};

export default LiveXRayPanel;
