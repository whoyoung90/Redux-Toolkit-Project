import { useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import AppBar from "./components/AppBar";
import BoardList from "./components/board/BoardList";
import BoardMenu from "./components/board/BoardMenu";
import TodoList from "./components/todo/TodoList";
import TodoMenu from "./components/todo/TodoMenu";

import { logIn } from "./redux/thunks/user";
import { addPost } from "./redux/thunks/post";
import { logOut, setLoginForm } from "./redux/slices/userSlice";

function App() {
  const dispatch = useDispatch();
  const isBoardSelected = useSelector((state) => !!state.board.selectedBoardId); // double NOT 연산자(!!)
  const user = useSelector((state) => state.user);

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
