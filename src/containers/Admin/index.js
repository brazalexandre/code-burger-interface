import PropTypes from 'prop-types'
import React from 'react'

import { SideMenuAdmin } from '../../components'
import paths from '../../contants/paths'
import ListProducts from './ListProducts'
import Orders from './Orders'
import { Container, ContainerItems } from './styles'

export function Admin({match: { path }}) {
    return (
        <Container>
            <SideMenuAdmin />
            <ContainerItems>
                {path === paths.Order && <Orders/>}
                {path === paths.Products && <ListProducts/>}
                
                <ListProducts/>
            </ContainerItems>

        </Container>
    )
}

Admin.propTypes = {
    match: PropTypes.shape ({
        path: PropTypes.string
    })
}