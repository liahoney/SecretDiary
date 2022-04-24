import React from 'react';
import styled from 'styled-components'

const Signup = () => {
  return (
    <div>
      <Container>
        <Box>
          <Text>
            회원가입
          </Text>
            <SignupInput 
              placeholder='이메일을 입력하세요'
            />
            <SignupInput
              placeholder='닉네임을 입력하세요'
            />
            <SignupInput
              placeholder='비밀번호를 입력하세요'
            />
            <SignupButton>
              회원가입
            </SignupButton>
        </Box>
      </Container>
    </div>
      
    
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
`

const Box = styled.div`
  margin-top: 70px;
  margin-bottom: 70px;
  align-items: flex-first;
  border: 1px solid black;
  z-index: 10;
`

const Text = styled.p`
  font-size: 16pt;
  font-weight: bold;
  margin: 5px;
  border: 1px solid black;
`

const SignupInput = styled.input`
  width: 340px;
  height: 48px;
  border: 1px solid black;
  padding: 16px;
  margin: 5px;
  box-sizing: border-box;
  font-size: 16px;
  background-color: yellow;
`

const SignupButton = styled.button`
  width: 340px;
  height: 48px;
  border: 1px solid black;
  padding: auto;
  font-size: 16px;
  font-weight: bold;
  :hover {
    cursor: pointer;
  }
`

export default Signup;
