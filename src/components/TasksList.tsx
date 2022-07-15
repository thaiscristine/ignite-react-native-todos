import React from 'react';
import { FlatList, TouchableOpacityProps, StyleSheet } from 'react-native';

import { ItemWrapper } from './ItemWrapper';


import { TaskItem } from './TaskItem';
import { EditTaskArgs } from '../pages/Home';

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

interface TasksListProps extends TouchableOpacityProps {
  tasks: Task[];
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: ({ taskId, taskNewTitle }: EditTaskArgs) => void;
}

export function TasksList({ tasks, toggleTaskDone, removeTask, editTask, ...rest }: TasksListProps) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={item => String(item.id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return (
          <ItemWrapper index={index}>
            <TaskItem task={item} toggleTaskDone={toggleTaskDone} editTask={editTask} removeTask={removeTask} />
          </ItemWrapper >
        )
      }}
      style={{
        marginTop: 32
      }}
    />
  )
}

