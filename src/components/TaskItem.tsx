import React, { useEffect, useRef, useState } from 'react'
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

import Icon from 'react-native-vector-icons/Feather';
import trashIcon from '../assets/icons/trash/trash.png'
import editIcon from '../assets/icons/edit/edit.png'

import { EditTaskArgs } from '../pages/Home';
import { Task } from './TasksList';

interface TaskItemkProps {
  task: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: ({ taskId, taskNewTitle }: EditTaskArgs) => void;
}
export function TaskItem({ task, toggleTaskDone, removeTask, editTask }: TaskItemkProps) {

  const [taskItemEditing, setTaskItemEditing] = useState(false)
  const [taskItemReady, setTaskItemReady] = useState(task.title)

  const textInputRef = useRef<TextInput>(null)


  function handleStartEditingTask() {
    console.warn('Start editing')
    setTaskItemEditing(true)
  }

  function handleCancelEditingTask() {
    console.warn('Editing canceled')
    setTaskItemEditing(false)
    setTaskItemReady(task.title)
  }

  function handleSubmitEditingTask() {
    editTask({ taskId: task.id, taskNewTitle: taskItemReady })
    setTaskItemEditing(false)
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (taskItemEditing) {
        textInputRef.current.focus();
      } else {
        textInputRef.current.blur();
      }
    }
  }, [taskItemEditing])

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <TouchableOpacity
          // testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View
            // testID={`marker-${index}`}
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {task.done && (
              <Icon
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>

          <TextInput
            value={taskItemReady}
            onChangeText={setTaskItemReady}
            editable={taskItemEditing}
            onSubmitEditing={handleSubmitEditingTask}
            style={task.done ? styles.taskTextDone : styles.taskText}
            ref={textInputRef}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.iconsContainer}>
        {taskItemEditing ? (
          <TouchableOpacity
            onPress={handleCancelEditingTask}
          >
            <Icon name="x" size={24} color={'gray'} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleStartEditingTask}
          >
            <Image source={editIcon} />
          </TouchableOpacity>
        )}

      <View style={styles.iconsDivider} />
      
      <TouchableOpacity
        disabled={taskItemEditing}
        onPress={() => removeTask(task.id)}
      >
        <Image source={trashIcon} style={{ opacity: taskItemEditing ? 0.2 : 1 }} />
      </TouchableOpacity>
      </View>

      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-between'
  },
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#B2B2B2",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskText: {
    color: "#666",
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: "#1DB863",
    marginRight: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  taskTextDone: {
    color: "#1DB863",
    textDecorationLine: "line-through",
  },
  infoContainer: {
    flex: 1,
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 12,
    paddingRight: 24,
  },
  iconsDivider: {
    width: 1,
    height: 24,
    backgroundColor: "rgba(196, 196, 196, 0.24)",
    marginHorizontal: 12,
  },
})