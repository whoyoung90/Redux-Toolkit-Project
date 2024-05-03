import { useState, useMemo, useCallback } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { createSelector } from "@reduxjs/toolkit"; // reselect
import styled from "styled-components";

import AppBar from "./components/AppBar";
import BoardList from "./components/board/BoardList";
import BoardMenu from "./components/board/BoardMenu";
import TodoList from "./components/todo/TodoList";
import TodoMenu from "./components/todo/TodoMenu";

import { startLoading, finishLoading } from "./redux/slices/loadingSlice";
import { logIn } from "./redux/thunks/user";
import { addPost } from "./redux/thunks/post";
import { logOut } from "./redux/slices/userSlice";

/**
 * useMemo의 역할을 createSelector로 한단계 더 끌어올림
 * createSelector가 메모이제이션 역할 (prices가 바뀔때마다 연산)
 * 바깥으로 빼도 리렌더링은 된다!
 * 컴포넌트 외부에 있으므로 => 컴포넌트 리렌더링에서 격리되는 느낌
 * useMemo를 했을 때 리렌더링이 빈번해서 비교만으로 무리가 된다하면 => createSelector로 빼는 방법도 있다!
 * export로 재사용하면 안된다!!
 */
const priceSelector = (state) => state.user.prices;
const sumPriceSelector = createSelector(priceSelector, (prices) => {
  console.log("memo");
  return prices.reduce((a, c) => a + c, 0);
});

function App() {
  const dispatch = useDispatch();

  // state.user가 바뀌면(user.username, user.password 등 변경시) -> state.user를 사용하는 모든 컴포넌트를 리렌더링
  const user = useSelector((state) => state.user);
  const posts = useSelector((state) => state.posts);
  const totalPrice = useSelector(sumPriceSelector);
  const isBoardSelected = useSelector((state) => !!state.board.selectedBoardId); // double NOT 연산자(!!)

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onChangeUsername = useCallback((e) => {
    setUsername(e.target.value);
  }, []);
  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      dispatch(startLoading("user/logIn"));
      try {
        // 비동기 action
        dispatch(
          logIn({
            username,
            password,
          })
        );
      } catch (err) {
        console.log(err);
      } finally {
        dispatch(finishLoading("user/logIn"));
      }
    },
    [dispatch, username, password]
  );

  const onLogout = useCallback(() => {
    // 동기 action
    dispatch(logOut());
  }, [dispatch]);

  const onAddPost = useCallback(() => {
    dispatch(startLoading("post/add"));
    try {
      // 비동기 action
      dispatch(
        addPost({
          title: "새 게시글",
          content: "내용내용내용",
        })
      );
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(finishLoading("post/add"));
    }
  }, [dispatch]);

  /**
   * username 입력시 useState가 변경되면 "컴포넌트 전부 리렌더링"
   * prices.reduce 연산도 계속 된다.
   * => useMemo로 prices값 캐싱하자
   * prices가 바뀌지 않는 이상, 캐싱된 같은 값을 계속 쓰겠다!
   */
  // const totalPrice = useMemo(() => {
  //   console.log("memo");
  //   return prices.reduce((a, c) => a + c, 0); // 리렌더링 될때마다 이 연산은 안해도
  // }, [prices]); // 배열의 값이 실제로 바뀌었나 연산은 해야함 (dependency간의 비교 비용)

  return (
    <Wrapper>
      <AppBar />
      {!user.data ? (
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="username"
            value={username}
            onChange={onChangeUsername}
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChangePassword}
          />
          <button>로그인</button>
        </form>
      ) : (
        <button onClick={onLogout}>로그아웃</button>
      )}

      <div>
        {user.isLoggingIn ? (
          <div>로그인 중</div>
        ) : user.data ? (
          <div>아이디: {user.data.username}</div>
        ) : (
          "로그인 해주세요"
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
