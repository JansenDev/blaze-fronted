
import React from 'react';
import { Container } from "semantic-ui-react";
import Header from "../../components/Header";


export default function LayaoutBasic(props) {
    const { children } = props;
    return (
        <>
            <Header/>
            <Container>
                { children }
            </Container>
        </>
    )
}
