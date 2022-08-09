import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import taskApi from "../../../api/TaskApi";
import DraggableTask from "./components/EditorManagerTaskComponents/DragableTask";
const DragDropContextContainer = styled.div`
  padding: 10px;
  border-radius: 6px;
`;

const ListGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 8px;
`;
const statusList = ["New", "Pending", "Review", "Finish", "UnFinished"];

function Tasks() {
  const [tasks, setTasks] = useState([]);
  // load tasks
  const loadTask = async () => {
    try {
      const params = {};
      const response = await taskApi.getAll(params);
      setTasks(response);
    } catch (e) {
      alert(e.message);
    }
  };

  const onDragEnd = async (result) => {
    if (!result.destination) {
      return;
    }
    tasks
      .filter((task) => task.taskId === result.draggableId)
      .map((task) => (task.status = result.destination.droppableId));
    try {
      const params = {
        taskId: result.draggableId,
        status:
          result.destination.droppableId === "New"
            ? 1
            : result.destination.droppableId === "Pending"
            ? 2
            : result.destination.droppableId === "Review"
            ? 3
            : result.destination.droppableId === "Finish"
            ? 4
            : result.destination.droppableId === "UnFinished"
            ? 5
            : null,
        postId:
          tasks.filter((task) => task.taskId === result.draggableId)[0].posts
            .length === 0
            ? tasks.filter((task) => task.taskId === result.draggableId)[0]
                .posts[0].postId
            : null,
      };
      await taskApi.updateStatus(params);
      loadTask();
    } catch (e) {
      alert(e.message);
    }
  };
  useEffect(() => {
    loadTask();
  }, []);
  return (
    <DragDropContextContainer>
      <DragDropContext onDragEnd={onDragEnd}>
        <ListGrid>
          {statusList.map((listKey) => (
            <DraggableTask tasks={tasks} key={listKey} prefix={listKey} />
          ))}
        </ListGrid>
      </DragDropContext>
    </DragDropContextContainer>
  );
}

export default Tasks;
