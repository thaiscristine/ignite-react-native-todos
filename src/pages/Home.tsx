import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
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
    setTasks(updatedListOfTasks)
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
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