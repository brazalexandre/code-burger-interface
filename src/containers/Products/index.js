import PropTypes from 'prop-types'
import React, { useState, useEffect } from 'react'

import ProductsLogo from '../../assets/product-logo.svg'
import {CardProduct} from '../../components'
import api from '../../services/api'
import formatCurrency from '../../utils/formatCurrency'
import {
  Container,
  ProductsImg,
  CategoryButton,
  CategoriesMenu,
  ProductsContainer
} from './styles'

export function Product({location: {state}}) {
  let categoryId = 0
  if (state?.categoryId) {
    categoryId = state.categoryId
  }
  const [categories, setCategories] = useState([])
  const [activeCategory, setActiveCategory] = useState(categoryId)
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const categoriesResponse = await api.get('categories')
        const newCategories = [
          { id: 0, name: 'Todas' },
          ...categoriesResponse.data
        ]
        setCategories(newCategories)

        const productsResponse = await api.get('products')
        const newProducts = productsResponse.data.map(product => ({
          ...product,
          formatedPrice: formatCurrency(product.price)
        }))
        setProducts(newProducts)
      } catch (error) {
        console.error('Erro ao carregar categorias ou produtos:', error)
      }
    }

    fetchData()
  }, [])

  useEffect(() => {
    const newFilteredProducts =
      activeCategory === 0
        ? products
        : products.filter(product => product.category_id === activeCategory)
    setFilteredProducts(newFilteredProducts)
  }, [activeCategory, products])

  return (
    <Container>
      <ProductsImg src={ProductsLogo} alt="logo da home" />
      <CategoriesMenu>
        {categories.map(category => (
          <CategoryButton
            key={category.id}
            type="button"
            isActiveCategory={activeCategory === category.id}
            onClick={() => {
              setActiveCategory(category.id)
            }}
          >
            {category.name}
          </CategoryButton>
        ))}
      </CategoriesMenu>
      <ProductsContainer>
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <CardProduct key={product.id} product={product} />
          ))
        ) : (
          <p>Nenhum produto encontrado.</p>
        )}
      </ProductsContainer>
    </Container>
  )
}

Product.propTypes = {
  location: PropTypes.object
}

