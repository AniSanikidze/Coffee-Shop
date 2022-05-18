import styled from "styled-components";
import { categoriesData } from "./categoriesData";
// import { mobile } from "../responsive";
import CategoryItem from "./categoryItem";
import './categories.css';

const Container = styled.div`
  display: flex;
  padding: 2rem 4rem 2rem 4rem;
  justify-content: space-between;
`;

//   ${mobile({ padding: "0px", flexDirection:"column" })}
const ProductCategories = () => {
  return (
    <Container>
      {categoriesData.map((item) => (
        <CategoryItem item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default ProductCategories;