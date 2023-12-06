import { useSelector } from "react-redux";
import styled from "styled-components";
// import AppBar from "./components/AppBar";
import BoardList from "./components/board/BoardList";
import BoardMenu from "./components/board/BoardMenu";
// import TodoList from "./components/todo/TodoList";
// import TodoMenu from "./components/todo/TodoMenu";

function App() {
  // const isBoardSelected = useSelector((state) => !!state.board.selectedBoardId);

  return (
    <Wrapper>
      {/* <AppBar /> */}

      <ContentContainer>
        <BoardContainer>
          <BoardList />
          <BoardMenu />
        </BoardContainer>

        {/* <TodoContainer>
          <TodoList />
          {isBoardSelected && <TodoMenu />}
        </TodoContainer> */}
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
