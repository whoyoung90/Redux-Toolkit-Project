import { useState, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "@reduxjs/toolkit";
import styled from "styled-components";
import AppBar from "./components/AppBar";
import BoardList from "./components/board/BoardList";
import BoardMenu from "./components/board/BoardMenu";
import TodoList from "./components/todo/TodoList";
import TodoMenu from "./components/todo/TodoMenu";

import { logIn } from "./redux/thunks/user";
import { addPost } from "./redux/thunks/post";
import { logOut, setLoginForm } from "./redux/slices/userSlice";

/**
 * useMemo의 역할을 createSelector로 한단계 더 끌어올림
 * createSelector가 메모이제이션 역할 (prices가 바뀔때마다 연산)
 * 바깥으로 빼도 리렌더링은 된다!
 * 컴포넌트 외부에 있으므로 => 컴포넌트 리렌더링에서 격리되는 느낌
 * useMemo을 했을 때 리렌더링이 빈번해서 비교만으로 무리가 된다하면 => createSelector로 빼는 방법도 있다!
 */
const priceSelector = (state) => state.user.prices;
const sumPriceSelector = createSelector(priceSelector, (prices) =>
  prices.reduce((a, c) => a + c, 0)
);

function App() {
  const dispatch = useDispatch();
  const isBoardSelected = useSelector((state) => !!state.board.selectedBoardId); // double NOT 연산자(!!)
  const user = useSelector((state) => state.user);
  const totalPrice = useSelector(sumPriceSelector);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onClick = useCallback(() => {
    // 비동기 action
    dispatch(
      logIn({
        id: "wooyoung",
        password: "비밀번호",
      })
    );
  }, [dispatch]);

  const onLogout = useCallback(() => {
    // 동기 action
    dispatch(logOut());
  }, [dispatch]);

  const onAddPost = useCallback(() => {
    dispatch(addPost());
  }, [dispatch]);

  const onChangeEmail = useCallback((e) => {
    setEmail(e.target.value);
  }, []);
  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(
        setLoginForm({
          email,
          password,
        })
      );
    },
    [dispatch, email, password]
  );

  /**
   * email 입력시 useState가 변경되면 "컴포넌트 전부 리렌더링"
   * prices.reduce 연산도 계속 된다.
   * => useMemo로 prices값 캐싱하자
   */
  // const totalPrice = useMemo(() => {
  //   console.log("memo");
  //   return prices.reduce((a, c) => a + c, 0);
  // }, [prices]);

  return (
    <Wrapper>
      <AppBar />
      <form onSubmit={onSubmit}>
        <input type="text" value={email} onChange={onChangeEmail} />
        <input type="password" value={password} onChange={onChangePassword} />
        <button>test</button>
      </form>
      <div>
        {user.isLoggingIn ? (
          <div>로그인 중</div>
        ) : user.data ? (
          <div>{user.data.nickname}</div>
        ) : (
          "로그인 해주세요"
        )}
        {!user.data ? (
          <button onClick={onClick}>로그인</button>
        ) : (
          <button onClick={onLogout}>로그아웃</button>
        )}
        <div>
          <b>{totalPrice}원</b>
        </div>
        <button onClick={onAddPost}>게시글 작성</button>
      </div>
      <ContentContainer>
        <BoardContainer>
          <BoardList />
          <BoardMenu />
        </BoardContainer>

        <TodoContainer>
          <TodoList />
          {isBoardSelected && <TodoMenu />}
        </TodoContainer>
      </ContentContainer>
    </Wrapper>
  );
}

export default App;

const Wrapper = styled.div`
  width: 100%;
`;

const ContentContainer = styled.div`
  display: flex;
  overflow: scroll;
`;

const BoardContainer = styled.div`
  flex: 1;
  border-right: 1px solid black;
`;

const TodoContainer = styled.div`
  flex: 2;
`;
