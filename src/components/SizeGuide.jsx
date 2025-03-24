import styled from 'styled-components';
import { motion } from 'framer-motion';

const GuideContainer = styled(motion.div)`
  margin-top: 2rem;
  padding: 1rem;
  border: 1px solid ${props => props.theme.colors.accent};
  border-radius: 8px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  
  th, td {
    padding: 0.5rem;
    border: 1px solid ${props => props.theme.colors.accent};
    text-align: center;
  }
`;

function SizeGuide({ category }) {
  const sizeChart = {
    men: [
      { size: 'S', chest: '36-38', waist: '30-32' },
      { size: 'M', chest: '38-40', waist: '32-34' },
      { size: 'L', chest: '40-42', waist: '34-36' },
      { size: 'XL', chest: '42-44', waist: '36-38' }
    ],
    women: [
      { size: 'S', bust: '32-34', waist: '26-28', hips: '35-37' },
      { size: 'M', bust: '34-36', waist: '28-30', hips: '37-39' },
      { size: 'L', bust: '36-38', waist: '30-32', hips: '39-41' },
      { size: 'XL', bust: '38-40', waist: '32-34', hips: '41-43' }
    ]
  };

  return (
    <GuideContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h3>Size Guide</h3>
      <Table>
        <thead>
          <tr>
            <th>Size</th>
            {category === 'men' ? (
              <>
                <th>Chest (inches)</th>
                <th>Waist (inches)</th>
              </>
            ) : (
              <>
                <th>Bust (inches)</th>
                <th>Waist (inches)</th>
                <th>Hips (inches)</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {sizeChart[category]?.map(row => (
            <tr key={row.size}>
              <td>{row.size}</td>
              {category === 'men' ? (
                <>
                  <td>{row.chest}</td>
                  <td>{row.waist}</td>
                </>
              ) : (
                <>
                  <td>{row.bust}</td>
                  <td>{row.waist}</td>
                  <td>{row.hips}</td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </GuideContainer>
  );
}

export default SizeGuide;