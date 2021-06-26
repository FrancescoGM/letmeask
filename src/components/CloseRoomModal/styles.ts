import styled from 'styled-components'

export const Container = styled.div`
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  h1 {
    margin-top: 24px;
    color: #29292e;

    font-size: 24px;
    font-weight: bold;
    line-height: 34px;
  }

  p {
    margin-top: 12px;

    font-size: 16px;
    color: #737380;
  }

  > div {
    margin-top: 40px;

    button {
      height: 50px;
      padding: 0 34px;
      border-radius: 8px;

      font-weight: 500;
      font-size: 16px;

      cursor: pointer;
      border: none;
      background-color: transparent;
      transition: filter 0.2s;

      &.accept {
        color: #fefefe;
        background-color: #e73f5d;
      }
      &.reject {
        color: #737380;
        background-color: #dbdcdd;
      }

      &:hover {
        filter: brightness(0.9);
      }
    }

    button + button {
      margin-left: 8px;
    }
  }
`
