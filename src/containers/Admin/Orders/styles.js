import ReactSelect from "react-select"
import styled from "styled-components"


export const Container = styled.div `
background: #efefef;
min-height: 100vh;
`

export const ProductsImg = styled.img `
width: 60px;
border-radius: 5px;
`

export const ReactSelectStyle = styled(ReactSelect)`
width: 250px;

.css-1xc3v61-indicatorContainer {
    cursor: pointer;
}

`

export const Menu = styled.div`
display: flex;
gap: 50px;
justify-content: center;
margin: 20px 0;
`

export const LinkMenu = styled.a`
color: #323050;
cursor: pointer;
font-weight: ${props => (props.isActiveStatus ? 'bold' : '400')};
border-bottom: ${props => (props.isActiveStatus ? '3px solid #975BA6' : 'none')};
padding-bottom: 5px;
`