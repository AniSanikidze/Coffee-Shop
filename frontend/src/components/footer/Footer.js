import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Room,
} from "@material-ui/icons";
import styled from "styled-components";
// import { mobile } from "../responsive";

const Container = styled.div`
  display: flex;
  background-color: #fff;
   box-shadow: 0px -2px 2px 0px rgb(0 0 0 / 10%), 0px -2px 2px 0px rgb(0 0 0 / 6%), 0px -2px 2px 0px rgb(0 0 0 / 7%);
  // // box-shadow: 0px -4px 2px 0px rgba(0,0,0,0.75)

`;
// ${mobile({ flexDirection: "column" })}
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

const Payment = styled.img`
    width: 50%;
`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>Coffee Berry</Logo>
        <Desc>
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don’t look even slightly believable.
        </Desc>
        <SocialContainer>
          <SocialIcon color="3B5999">
            <Facebook />
          </SocialIcon>
          <SocialIcon color="E4405F">
            <Instagram />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>Wholesale</ListItem>
          <ListItem>About Us</ListItem>
          <ListItem>Roasted Coffee</ListItem>
          <ListItem>Green Coffee</ListItem>
          <ListItem>Coffee Machines</ListItem>
          <ListItem>Terms</ListItem>
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
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>
    </Container>
  );
};

export default Footer;