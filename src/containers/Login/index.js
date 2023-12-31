
import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

import LoginImg from '../../assets/login-image.svg'
import Logo from '../../assets/logo.svg'
import {Button} from '../../components'
import { useUser } from '../../hooks/UserContext'
import api from '../../services/api'
import {
  Container,
  LoginImage,
  ContainerItens,
  Label,
  Input,
  SignInLink,
  ErrorMessage
} from './styles'

export function Login() {
  const history = useHistory()
  const { putUserData, userData} = useUser()
  console.log(userData)

  const schema = Yup.object().shape({
    email: Yup.string().email("Digite um e-mail válido").required("O e-mail é obrigatório"),
    password: Yup.string().required("A senha é obrigatória").min(6),
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async clientData => {
    const {data} = await toast.promise(
      api.post('sessions', {
        email: clientData.email,
        password: clientData.password
      }),
      {
        pending: 'Verificando seus dados',
        sucess: 'Seja bem vindo!',
        error: 'Verifique seu email e senha'
      }
    )
    
    putUserData(data)
    setTimeout(() => {
      if (data.admin){
        history.push('/pedidos')
      } else {
        history.push('/')
      }
    }, 1000)
  }
  
  return (
    <Container>
      <LoginImage src={LoginImg} alt="login-image" />
      <ContainerItens>
        <img src={Logo} alt="logo-code-burger"/>
        <h1>Login</h1>

        <form noValidate onSubmit={handleSubmit(onSubmit)} >
        <Label>Email</Label>
        <Input type="email" {...register("email")} error={errors.email?.message}/>
        <ErrorMessage>{errors.email?.message} </ErrorMessage>

        <Label>Senha</Label>
        <Input type="password"{...register("password")} error={errors.password?.message}/>
        <ErrorMessage>{errors.password?.message} </ErrorMessage>      

        <Button type="submit" style={{marginTop: 20, marginBottom: 8}}>Sign In</Button>
        </form>
        <SignInLink>
          Não possui conta? <Link style={{color: 'white'}} to="/Register">Sign Up</Link>
        </SignInLink>
      </ContainerItens>
    </Container>
  )
}

