import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Room,
} from "@material-ui/icons";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  background-color: #fff;
   box-shadow: 0px -2px 2px 0px rgb(0 0 0 / 10%), 0px -2px 2px 0px rgb(0 0 0 / 6%), 0px -2px 2px 0px rgb(0 0 0 / 7%);
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1``;

const Desc = styled.p`
  margin: 20px 0px;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  cursor: pointer;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
`;
// ${mobile({ display: "none" })}
const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
  color: #555555 !important;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
`;
// ${mobile({ backgroundColor: "#fff8f8" })}
const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;


const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>Coffee Berry</Logo>
        <Desc>
          We seek out compelling coffees and roast to eccentuate their unique qualities.
          Our coffee is an expression of our values: passion, care, respected integrity.
        </Desc>
        <SocialContainer>
          <SocialIcon onClick={()=> window.open(
            "https://www.facebook.com/Coffee-Berry-%E1%83%99%E1%83%9D%E1%83%A4%E1%83%98-%E1%83%91%E1%83%94%E1%83%A0%E1%83%98-163616970984328", "_blank")} color="3B5999">
            <Facebook  />
          </SocialIcon>
          <SocialIcon color="E4405F">
            <Instagram  onClick={()=> window.open(
            "https://www.instagram.com/freshly_roasted_coffee_/", "_blank")}/>
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem><Link to='/' style={{textDecoration: 'none',color: "#000"}}>Home</Link></ListItem>
          <ListItem>          
            <Link to='/cart' style={{textDecoration: 'none',color: "#000"}}>
                Cart</Link></ListItem>
          <ListItem>          
            <Link to='/' style={{textDecoration: 'none',color: "#000"}}>
            About us</Link></ListItem>
          <ListItem><Link to='/coffee' style={{textDecoration: 'none',color: "#000"}}>Coffee Shop</Link></ListItem>
          <ListItem><Link to='/' style={{textDecoration: 'none',color: "#000"}}>Privacy Policy</Link></ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <Room style={{marginRight:"10px"}}/> Digmis Masivi, Tbilisi, Georgia
        </ContactItem>
        <ContactItem>
          <Phone style={{marginRight:"10px"}}/> +995 599 08 08 31
        </ContactItem>
        <ContactItem>
          <MailOutline style={{marginRight:"10px"}} /> infocoffeeberry@gmail.com
        </ContactItem>
      </Right>
    </Container>
  );
};

export default Footer;