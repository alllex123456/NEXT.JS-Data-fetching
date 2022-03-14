import { Fragment } from 'react/cjs/react.production.min';
import path from 'path';
import fs from 'fs/promises';

const ProductDetails = (props) => {
  const { product } = props;

  if (!product) {
    return <h1>Loading...</h1>;
  }

  return (
    <Fragment>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
    </Fragment>
  );
};

async function getData() {
  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
  const data = await fs.readFile(filePath);
  const parsedData = JSON.parse(data);
  console.log(parsedData);

  return parsedData;
}

export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.pid;

  const data = await getData();

  const product = data.products.find((product) => product.id === productId);

  if (!product) {
    return { notFound: true };
  }

  return {
    props: {
      product: product,
    },
  };
}

export async function getStaticPaths() {
  const data = await getData();

  const productIds = data.products.map((product) => ({
    params: { pid: product.id },
  }));

  return {
    paths: productIds,
    fallback: true,
  };
}

export default ProductDetails;
