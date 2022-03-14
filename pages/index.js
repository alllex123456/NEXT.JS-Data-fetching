import path from 'path';
import fs from 'fs/promises';

import Link from 'next/link';

function HomePage(props) {
  const { products } = props;
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={product.id}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const data = await fs.readFile(filePath);
  const parsedData = JSON.parse(data);

  return {
    props: {
      products: parsedData.products,
    },
    revalidate: 10,
  };
}

export default HomePage;
