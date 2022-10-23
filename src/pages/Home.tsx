import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export type EditTaskArgs = {
  taskId: number;
  taskNewTitle: string
}
export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {

    const checkingTaskAlreadyAdded = tasks.find(task => task.title === newTaskTitle)

    if (checkingTaskAlreadyAdded) {
      return Alert.alert("Task já cadastrada", "Você não pode cadastrar uma task com o mesmo nome")
      
    }
    const data = {
      id: Math.random(),
      title: newTaskTitle,
      done: false
    }



    setTasks([...tasks, data])
  }

  function handleToggleTaskDone(id: number) {

    const updatedTasks = tasks.map(tasks => ({ ...tasks }))
    const listItemClicked = updatedTasks.find(item => item.id === id)
    if (listItemClicked) {
      listItemClicked.done = !listItemClicked.done
    }

    setTasks(updatedTasks)
  }

  function handleRemoveTask(id: number) {
    const updatedListOfTasks = tasks.filter(task => task.id !== id)
    Alert.alert('Deleting task', 'Are you sure you want to delete this task?', [
      {
        text: "Yes",
        onPress: () => {
          setTasks(updatedListOfTasks);
          Alert.alert("Task removed");
        },
        style: "destructive",
      }, {
        text: "Cancel",
        style: "cancel",
      }])
  }

  function handleEditTask({ taskId, taskNewTitle }: EditTaskArgs) {
    const fakeTasksListData = tasks.map(tasks => ({ ...tasks }))
    const taskToEdit = fakeTasksListData.find(task => task.id === taskId)

    if (!taskToEdit) {
      return
    }
    taskToEdit.title = taskNewTitle

    setTasks(fakeTasksListData)
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})